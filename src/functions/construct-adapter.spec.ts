import { AdapterName } from "../types/adapter-name";
import { constructAdapter } from "./construct-adapter";

it.skip("can construct a PostgreSQL adapter", async () => {
	await expect(
		constructAdapter(AdapterName.PostgreSQL)
	).resolves.not.toThrow();
});
