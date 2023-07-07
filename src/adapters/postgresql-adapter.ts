import postgres, { JSONValue } from "postgres";
import { IDatabaseAdapter } from "../interfaces/database-adapter";

export class PostgreSQLAdapter implements IDatabaseAdapter {
	private async _connect(url: string): Promise<postgres.Sql<{}>> {
		// note(clouedoc): there is a bug where postgres:// URLs are not working in Obsidian env, for some reason.
		// (I think the issue is that the protocol is not recognized)
		url = url.replace("postgres://", "http://");
		url = url.replace("postgresql://", "http://");

		console.log("Connecting to URL: " + url);
		const connUrl: URL = new URL(url);

		console.log(connUrl);
		return postgres(url, {
			prepare: false,
			types: {
				bigint: postgres.BigInt,
			},
		});
	}

	/**
	 * Create the initial schema if not existing already.
	 */
	public async migrate(url: string): Promise<void> {
		console.log("Creating initial schema");
		// eslint-disable-next-line @typescript-eslint/typedef
		const sql = await this._connect(url);
		try {
			await sql`CREATE SCHEMA IF NOT EXISTS obsidian`;
			await sql`CREATE TABLE IF NOT EXISTS obsidian.file (
					path text PRIMARY KEY,
					dataview_data jsonb
			);`;
			console.log("Created initial schema");
		} finally {
			await sql.end();
		}
	}

	public async insertPage(
		url: string,
		path: string,
		data: Record<string, unknown>
	): Promise<void> {
		// eslint-disable-next-line @typescript-eslint/typedef
		const sql = await this._connect(url);

		try {
			await sql`INSERT INTO obsidian.file
			${sql({
				path,
				dataview_data: sql.json(data as JSONValue),
			})}
			ON CONFLICT (path)
			DO
				UPDATE SET dataview_data = EXCLUDED.dataview_data
			;
			`;
			console.log("Inserted page " + path);
		} finally {
			await sql.end();
		}
	}
}
