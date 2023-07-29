import { App, Setting, PluginSettingTab } from 'obsidian';
import { HighlightingOptions } from './highlighting';
import FileTreeHighlight from './main';

export interface FileTreeHighlightSettings {
	mySetting: string;
	highlightingOptions: HighlightingOptions;
}

export const DEFAULT_SETTINGS: FileTreeHighlightSettings = {
	mySetting: 'useHex',
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

		containerEl.createEl('h2', {text: 'Settings of the file tree highlight plugin.'});

		new Setting(containerEl)
			.setName('Setting #1')
			.setDesc('It\'s a secret')
			.addText(text => text
				.setPlaceholder('Enter your secret')
				.setValue(this.plugin.settings.mySetting)
				.onChange(async (value) => {
					console.log('Secret: ' + value);
					this.plugin.settings.mySetting = value;
					await this.plugin.saveSettings();
				}));
	}
}

