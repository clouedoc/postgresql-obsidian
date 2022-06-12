import { App, Modal } from "obsidian";

export class SampleModal extends Modal {
	public constructor(app: App) {
		super(app);
	}

	public onOpen(): void {
		const { contentEl } = this;
		contentEl.setText("Woah!");
	}

	public onClose(): void {
		const { contentEl } = this;
		contentEl.empty();
	}
}
