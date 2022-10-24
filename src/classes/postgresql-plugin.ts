import { Notice, Plugin } from "obsidian";
import { DataviewApi, getAPI } from "obsidian-dataview";
import { SettingsTab } from ".";
import { DEFAULT_SETTINGS } from "../constants";
import { constructAdapter } from "../functions/construct-adapter";
import { IDatabaseAdapter } from "../interfaces/database-adapter";
import { IPostgresPluginSettings } from "../types/plugin-settings";

export class PostgreSQLPlugin extends Plugin {
	// the settings are defined in `onload`. We can assert that they are defined
	public settings!: IPostgresPluginSettings;
	protected _adapter: IDatabaseAdapter | undefined;

	public async onload(): Promise<void> {
		await this.loadSettings();

		this.addSettingTab(new SettingsTab(this.app, this));

		this.addCommand({
			id: "postgresql-upload-current-file",
			name: "PostgreSQL: upload current file information",
			callback: async () => {
				// ensure that an adapter is connected
				const adapter: IDatabaseAdapter = await constructAdapter(
					this.settings.adapterName
				);

				const dv: DataviewApi | undefined = getAPI();
				if (!dv) {
					// eslint-disable-next-line no-new
					new Notice("The Dataview API is not available");
					return;
				}

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
					await adapter.migrate(this.settings.connectionUrl);
					await adapter.insertPage(
						this.settings.connectionUrl,
						filepath,
						dataviewData
					);
					// eslint-disable-next-line no-new
					new Notice(`${this.settings.adapterName}: Inserted page`);
				} catch (err) {
					// eslint-disable-next-line no-new
					new Notice(`${this.settings.adapterName} error: ${err}`);
				}
			},
		});
	}

	public async loadSettings(): Promise<void> {
		this.settings = Object.assign(
			{},
			DEFAULT_SETTINGS,
			await this.loadData()
		);
	}

	public async saveSettings(): Promise<void> {
		// FIXME: debounce this function
		await this.saveData(this.settings);
	}
}
