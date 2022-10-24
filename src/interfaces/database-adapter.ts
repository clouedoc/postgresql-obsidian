export interface IDatabaseAdapter {
	/**
	 * Create the initial schema of the database, if required
	 */
	migrate: (url: string) => Promise<void>;
	/**
	 * Insert a page into the database
	 */
	insertPage: (
		url: string,
		path: string,
		data: Record<string, unknown>
	) => Promise<void>;
}
