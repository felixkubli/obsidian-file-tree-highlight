import { App, Setting, PluginSettingTab } from 'obsidian';
import { HighlightingOptions } from './highlighting';
import FileTreeHighlight from './main';

export interface FileTreeHighlightSettings {
	mySetting: string;
	backgroundColors: string[];
	fontColors: string[];
	highlightingOptions: HighlightingOptions;
}

export const DEFAULT_SETTINGS: FileTreeHighlightSettings = {
	mySetting: 'useHex',
	backgroundColors: [
		"#AEE2FF",
		"#93C6E7",
		"#FEDEFF"
	],
	fontColors: [
		"#0e1316",
		"#0e1316",
		"#0e1316",
	],
	highlightingOptions: {}
};

export class FileTreeHighlightSettingTab extends PluginSettingTab {
	plugin: FileTreeHighlight;

	constructor(app: App, plugin: FileTreeHighlight) {
		super(app, plugin);
		this.plugin = plugin;
	}

	display(): void {
		const {containerEl} = this;

		containerEl.empty();

		containerEl.createEl('h2', {text: 'Settings of the file tree highlight plugin'});

		containerEl.createEl('h3', {text: 'Select your favourite background colors'})
		new Setting(containerEl)
			.setName("1. background color")
			.addColorPicker(colorComponent => {
				colorComponent.setValue(this.plugin.settings.backgroundColors[0]);
				colorComponent.onChange(color => {
					console.log(color)
					this.plugin.settings.backgroundColors[0] = color;
				});
			});
		new Setting(containerEl)
			.setName("2. background color")
			.addColorPicker(colorComponent => {
				colorComponent.setValue(this.plugin.settings.backgroundColors[1]);
				colorComponent.onChange(color => {
					this.plugin.settings.backgroundColors[1] = color;
				});
			});
		new Setting(containerEl)
			.setName("3. background color")
			.addColorPicker(colorComponent => {
				colorComponent.setValue(this.plugin.settings.backgroundColors[2]);
				colorComponent.onChange(color => {
					this.plugin.settings.backgroundColors[2] = color;
				});
			});

		containerEl.createEl('h3', {text: 'Select your favourite background colors'})
		new Setting(containerEl)
			.setName("1. font color")
			.addColorPicker(colorComponent => {
				colorComponent.setValue(this.plugin.settings.fontColors[0]);
				colorComponent.onChange(color => {
					this.plugin.settings.fontColors[0] = color;
				});
			});
		new Setting(containerEl)
			.setName("2. font color")
			.addColorPicker(colorComponent => {
				colorComponent.setValue(this.plugin.settings.fontColors[1]);
				colorComponent.onChange(color => {
					this.plugin.settings.fontColors[1] = color;
				});
			});
		new Setting(containerEl)
			.setName("3. font color")
			.addColorPicker(colorComponent => {
				colorComponent.setValue(this.plugin.settings.fontColors[2]);
				colorComponent.onChange(color => {
					this.plugin.settings.fontColors[2] = color;
				});
			});
	}
}

