import { DEFAULT_SETTINGS } from "../constants";
import { Plugin, Notice } from "obsidian";
import { SettingsTab } from ".";
import { IPostgresPluginSettings } from "../types/plugin-settings";
import { DataviewApi, getAPI } from "obsidian-dataview";
import { Client } from "pg";

export class PostgreSQLPlugin extends Plugin {
	// the settings are defined in `onload`. We can assert that they are defined
	public settings!: IPostgresPluginSettings;
	protected db: Client | undefined;

	public async onload(): Promise<void> {
		await this.loadSettings();

		this.addSettingTab(new SettingsTab(this.app, this));

		this.addCommand({
			id: "postgresql-upload-current-file",
			name: "PostgreSQL: upload current file information",
			callback: async () => {
				const dv: DataviewApi | undefined = getAPI();
				if (!dv) {
					// eslint-disable-next-line no-new
					new Notice("The Dataview API is not available");
					return;
				}
				const db: Client = await this.getDatabaseClient();

				const filepath: string | undefined =
					this.app.workspace.getActiveFile()?.path;

				if (!filepath) {
					// eslint-disable-next-line no-new
					new Notice("No active file found");
					return;
				}

				const dataviewData: Record<string, unknown> | undefined =
					dv.page(filepath);

				if (!dataviewData) {
					// eslint-disable-next-line no-new
					new Notice("Failed to fetch the dataview data");
					return;
				}

				delete dataviewData.file;
				delete dataviewData.position;

				try {
					await db.query(
						`INSERT INTO obsidian.file (path, dataview_data)
						VALUES ($1::text, $2::json)
						ON CONFLICT (path)
						DO
							UPDATE SET dataview_data = EXCLUDED.dataview_data
						;
						`,
						[filepath, dataviewData]
					);
				} catch (err) {
					// eslint-disable-next-line no-new
					new Notice("PostgreSQL error: " + (err as Error).message);
					throw err;
				}

				// eslint-disable-next-line no-new
				new Notice("Inserted page");
			},
		});
	}

	/**
	 * Connect to the PostgreSQL database and return the database client
	 * @returns
	 */
	public async getDatabaseClient(): Promise<Client> {
		if (!this.settings.connectionUrl) {
			// eslint-disable-next-line no-new
			new Notice("PostgreSQL: there is no connection string defined");
			throw new Error("No connection string");
		}

		if (this.db) {
			return this.db;
		}

		const client: Client = new Client({
			connectionString: this.settings.connectionUrl,
			connectionTimeoutMillis: 10000,
		});
		try {
			await client.connect();
			// eslint-disable-next-line no-new
			new Notice("Connected to PostgreSQL");
		} catch (err) {
			// eslint-disable-next-line no-new
			new Notice(
				"PostgreSQL connection error: " + (err as Error).message
			);
			throw err;
		}

		this.db = client;

		await this.db.query(
			`CREATE SCHEMA IF NOT EXISTS obsidian;
			CREATE TABLE IF NOT EXISTS obsidian.file (
					path text PRIMARY KEY,
					dataview_data json
			);`
		);

		return this.db;
	}

	public async onunload(): Promise<void> {
		await this.db?.end();
	}

	public async loadSettings(): Promise<void> {
		this.settings = Object.assign(
			{},
			DEFAULT_SETTINGS,
			await this.loadData()
		);
	}

	public async saveSettings(): Promise<void> {
		await this.saveData(this.settings);
	}
}
