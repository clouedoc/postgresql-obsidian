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
	name: AdapterName
): Promise<IDatabaseAdapter> {
	const adapter: IDatabaseAdapter = adapters[name];
	return adapter;
}
