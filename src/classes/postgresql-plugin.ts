import { DEFAULT_SETTINGS } from "../constants";
import { Plugin } from "obsidian";
import { SettingsTab } from ".";
import { IPluginSettings } from "../types/plugin-settings";

export class PostgreSQLPlugin extends Plugin {
	public settings: IPluginSettings;

	public async onload(): Promise<void> {
		await this.loadSettings();

		this.addSettingTab(new SettingsTab(this.app, this));
	}

	public onunload(): void {}

	public async loadSettings(): Promise<void> {
		this.settings = Object.assign(
			{},
			DEFAULT_SETTINGS,
			await this.loadData()
		);
	}

	public async saveSettings(): Promise<void> {
		await this.saveData(this.settings);
	}
}
