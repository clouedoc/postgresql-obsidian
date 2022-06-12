import { App, PluginSettingTab, Setting } from "obsidian";
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
			.setName("PostgreSQL connection URL")
			.setDesc("This connection URL will be used to send your data.")
			.addText((text) =>
				text
					.setPlaceholder("")
					.setValue(this.plugin.settings.connectionUrl)
					.onChange(async (url) => {
						// TODO: try the connection URL
						this.plugin.settings.connectionUrl = url;
						await this.plugin.saveSettings();
					})
			);
	}
}
