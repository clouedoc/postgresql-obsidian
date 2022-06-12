import { DEFAULT_SETTINGS } from "../constants";
import { Plugin, View, TFile } from "obsidian";
import { SettingsTab } from ".";
import { IPluginSettings } from "../types/plugin-settings";
import { DataviewApi, getAPI } from "obsidian-dataview";

interface IViewWithFile extends View {
	file: TFile;
}

export class PostgreSQLPlugin extends Plugin {
	public settings: IPluginSettings;

	public async onload(): Promise<void> {
		await this.loadSettings();

		this.addSettingTab(new SettingsTab(this.app, this));

		const dv: DataviewApi = getAPI();
		this.addCommand({
			id: "postgresql-upload-current-file",
			name: "PostgreSQL: upload current file information",
			callback: () => {
				const filepath: string = (
					this.app.workspace.activeLeaf.view as IViewWithFile
				).file.path;
				const page: Record<string, unknown> = dv.page(filepath);

				delete page.file;
				delete page.position;

				console.log(page);
			},
		});
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
