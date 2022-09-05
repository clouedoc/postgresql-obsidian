import { AdapterName } from "./adapter-name";

export interface IPostgresPluginSettings {
	adapterName: AdapterName;
	/**
	 * The PostgreSQL connection URL.
	 */
	connectionUrl: string;
}
