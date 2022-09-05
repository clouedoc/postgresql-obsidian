import postgres, { JSONValue } from "postgres";
import { IDatabaseAdapter } from "../interfaces/database-adapter";

export class PostgreSQLAdapter implements IDatabaseAdapter {
	private _url: string | undefined;
	private _sql: postgres.Sql<{}> | undefined;

	public async ensureConnection(url: string): Promise<void> {
		console.log("Connecting to PostgreSQL database at " + url);
		if (this._url === url && this._sql) {
			return;
		}

		this._url = url;
		if (this._sql) {
			await this._sql.end();
			this._sql = undefined;
		}

		this._sql = postgres(url, {
			prepare: false,
			types: {
				bigint: postgres.BigInt,
			},
		});
		console.log("Connected to PostgreSQL database at " + url);
	}

	/**
	 * Create the initial schema if not existing already.
	 */
	public async createInitialSchema(): Promise<void> {
		console.log("Creating initial schema");
		if (!this._sql) {
			throw new Error("Not connected");
		}
		await this._sql`CREATE SCHEMA IF NOT EXISTS obsidian;
			CREATE TABLE IF NOT EXISTS obsidian.file (
					path text PRIMARY KEY,
					dataview_data json
			);`;
		console.log("Created initial schema");
	}

	public async insertPage(
		path: string,
		data: Record<string, unknown>
	): Promise<void> {
		console.log("Inserting page " + path);
		if (!this._sql) {
			throw new Error("Not connected");
		}

		await this._sql`INSERT INTO obsidian.file (path, dataview_data)
			VALUES (${path}, ${this._sql.json(data as JSONValue)}
			ON CONFLICT (path)
			DO
				UPDATE SET dataview_data = EXCLUDED.dataview_data
			;
			`;
		console.log("Inserted page " + path);
	}

	public async end(): Promise<void> {
		if (this._sql) {
			await this._sql.end();
			this._sql = undefined;
		}
	}
}
