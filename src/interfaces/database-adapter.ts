export interface IDatabaseAdapter {
	/**
	 * Ensure that the adapter is connected to the database pointed to by the given URL.
	 * @throws {Error} If the connection fails.
	 */
	ensureConnection: (url: string) => Promise<void>;
	/**
	 * Create the initial schema of the database, if required
	 */
	createInitialSchema: () => Promise<void>;
	/**
	 * Insert a page into the database
	 */
	insertPage: (path: string, data: Record<string, unknown>) => Promise<void>;
	/**
	 * Disconnect from the database.
	 */
	end: () => Promise<void>;
}
