import { PostgreSQLAdapter } from "../adapters/postgresql-adapter";
import { IDatabaseAdapter } from "../interfaces/database-adapter";
import { AdapterName } from "../types/adapter-name";

const adapters: Record<AdapterName, IDatabaseAdapter> = {
	[AdapterName.PostgreSQL]: new PostgreSQLAdapter(),
};

/**
 * Construct the right database adapter.
 * @returns
 */
export async function constructAdapter(
	name: AdapterName,
	url: string
): Promise<IDatabaseAdapter> {
	const adapter: IDatabaseAdapter = adapters[name];
	try {
		await adapter.ensureConnection(url);
	} catch (err) {
		throw new Error("Error while ensuring connection: " + err);
	}
	try {
		await adapter.createInitialSchema();
	} catch (err) {
		throw new Error("Error while creating initial schema: " + err);
	}
	return adapter;
}
