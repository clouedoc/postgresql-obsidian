import { App, PluginSettingTab, Setting } from "obsidian";
import { AdapterName } from "../types/adapter-name";
import { PostgreSQLPlugin } from "./postgresql-plugin";

export class SettingsTab extends PluginSettingTab {
	public plugin: PostgreSQLPlugin;

	public constructor(app: App, plugin: PostgreSQLPlugin) {
		super(app, plugin);
		this.plugin = plugin;
	}

	public display(): void {
		const { containerEl } = this;

		containerEl.empty();

		containerEl.createEl("h2", { text: "PostgreSQL settings" });

		new Setting(containerEl)
			.setName("Adapter name")
			.setDesc(
				"Select your database adapter here. If yours doesn't appear, please open an issue on GitHub."
			)
			.addDropdown((dropdown) => {
				// get AdapterName enum as dict
				const options: Record<string, string> = Object.keys(
					AdapterName
				).reduce(
					(acc, key) => ({
						...acc,
						[key]: key,
					}),
					{}
				);

				// add the values of AdapterName as dropdown options
				dropdown.addOptions(options);
				dropdown.onChange(async (value) => {
					this.plugin.settings.adapterName = value as AdapterName;
					await this.plugin.saveSettings();
				});
			});

		new Setting(containerEl)
			.setName("PostgreSQL connection URL")
			.setDesc("This connection URL will be used to send your data.")
			.addText((text) =>
				text
					.setPlaceholder("")
					.setValue(this.plugin.settings.connectionUrl)
					.onChange(async (url) => {
						this.plugin.settings.connectionUrl = url;
						await this.plugin.saveSettings();
					})
			);
	}
}
