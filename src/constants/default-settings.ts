import { IPostgresPluginSettings } from "../types";
import { AdapterName } from "../types/adapter-name";

export const DEFAULT_SETTINGS: IPostgresPluginSettings = {
	connectionUrl: "",
	adapterName: AdapterName.PostgreSQL,
};
