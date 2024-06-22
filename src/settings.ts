import { App, Setting, PluginSettingTab } from "obsidian";
import { HighlightingOptions } from "./highlighting";
import FileTreeHighlight from "./main";

export interface FileTreeHighlightSettings {
	mySetting: string;
	backgroundColors: string[];
	fontColors: string[];
	highlightingOptions: HighlightingOptions;
}

export const DEFAULT_SETTINGS: FileTreeHighlightSettings = {
	mySetting: "useHex",
	backgroundColors: [
		"#AEE2FF",
		"#93C6E7",
		"#FEDEFF",
		"#FFFFFF",
		"#FFFFFF",
		"#FFFFFF",
		"#FFFFFF",
	],
	fontColors: [
		"#0e1316",
		"#0e1317",
		"#0e1318",
		"#FFFFFF",
		"#FFFFFF",
		"#FFFFFF",
		"#FFFFFF",
	],
	highlightingOptions: {},
};

export class FileTreeHighlightSettingTab extends PluginSettingTab {
	plugin: FileTreeHighlight;
	numberOfColors = 7;

	constructor(app: App, plugin: FileTreeHighlight) {
		super(app, plugin);
		this.plugin = plugin;
	}

	display(): void {
		const { containerEl } = this;

		containerEl.empty();

		containerEl.createEl("h2", {
			text: "Settings of the file tree highlight plugin",
		});

		containerEl.createEl("h3", {
			text: "Select your favourite background colors",
		});
		const backgroundSettings = new Setting(containerEl).setName(
			"background colors",
		);
		for (let i = 0; i < this.numberOfColors; i++) {
			backgroundSettings.addColorPicker((colorComponent) => {
				colorComponent.setValue(
					this.plugin.settings.backgroundColors[i],
				);
				colorComponent.onChange((color) => {
					console.log(color);
					this.plugin.settings.backgroundColors[i] = color;
				});
			});
		}

		containerEl.createEl("h3", {
			text: "Select your favourite font colors",
		});
		const fontSettings = new Setting(containerEl).setName("font colors");
		for (let i = 0; i < this.numberOfColors; i++) {
			fontSettings.addColorPicker((colorComponent) => {
				colorComponent.setValue(this.plugin.settings.fontColors[i]);
				colorComponent.onChange((color) => {
					this.plugin.settings.fontColors[i] = color;
				});
			});
		}
	}
}
