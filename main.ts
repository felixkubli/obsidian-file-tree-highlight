import { App, Modal, Plugin, PluginSettingTab, Setting, TFile } from 'obsidian';

// Remember to rename these classes and interfaces!

interface FileTreeHighlightSettings {
	mySetting: string;
}

const DEFAULT_SETTINGS: FileTreeHighlightSettings = {
	mySetting: 'useHex'
}

export default class FileTreeHighlight extends Plugin {
	settings: FileTreeHighlightSettings;

	async onload() {
		await this.loadSettings();

		this.addCommand({
			id: 'open-sample-modal-color-setter',
			name: 'edit background color',
			callback: () => {
				new ColorEditorModal(this.app, opts => console.log(opts)).open();
			}
		});
		this.registerEvent(
			this.app.workspace.on("file-menu", (menu, file) => {
				console.log(file);
				menu.addItem((item) => {
					item
						.setTitle("edit highlighting options")
						.setIcon("palette")
						.onClick(async () => {
							new ColorEditorModal(this.app, opts => console.log(opts)).open();
					});
				});
			})
		);

		// This adds a complex command that can check whether the current state of the app allows execution of the command
		// this.addCommand({
		// 	id: 'open-sample-modal-complex',
		// 	name: 'Open sample modal (complex)',
		// 	checkCallback: (checking: boolean) => {
		// 		// Conditions to check
		// 		const markdownView = this.app.workspace.getActiveViewOfType(MarkdownView);
		// 		if (markdownView) {
		// 			// If checking is true, we're simply "checking" if the command can be run.
		// 			// If checking is false, then we want to actually perform the operation.
		// 			if (!checking) {
		// 				new SampleModal(this.app).open();
		// 			}

		// 			// This command will only show up in Command Palette when the check function returns true
		// 			return true;
		// 		}
		// 	}
		// });

		// This adds a settings tab so the user can configure various aspects of the plugin
		this.addSettingTab(new FileTreeHighlightSettingTab(this.app, this));
	}

	onunload() {

	}

	async loadSettings() {
		this.settings = Object.assign({}, DEFAULT_SETTINGS, await this.loadData());
	}

	async saveSettings() {
		await this.saveData(this.settings);
	}
}

interface HighlightingOption {
	backgroundColor: string
}

class ColorEditorModal extends Modal {
	result: HighlightingOption
	onSubmit: (result?: HighlightingOption) => void

	constructor(app: App, onSubmit: (result?: HighlightingOption) => void) {
		super(app);
		this.result = { backgroundColor: '' };
		this.onSubmit = onSubmit;
	}
	onOpen() {
		const {contentEl} = this;
		contentEl.setText('Edit the background color');
		contentEl.createEl("h1", { text: "What's your name?" });

		new Setting(contentEl)
			.setName("Background Color")
			.addText((text) =>
				text.onChange((value: string) => {
					this.result.backgroundColor = value;
				})
			);

		new Setting(contentEl)
			.addButton(btn =>
				btn
				  .setButtonText("Remove Element Settings")
				  .setCta()
				  .onClick(() => {
					this.close();
					this.onSubmit(undefined);
				  })
			)
			.addButton(btn =>
				btn
				  .setButtonText("Submit")
				  .setCta()
				  .onClick(() => {
					this.close();
					this.onSubmit(this.result);
				  })
			);

	}

	onClose() {
		const {contentEl} = this;
		contentEl.empty();
	}
}

class FileTreeHighlightSettingTab extends PluginSettingTab {
	plugin: FileTreeHighlight;

	constructor(app: App, plugin: FileTreeHighlight) {
		super(app, plugin);
		this.plugin = plugin;
	}

	display(): void {
		const {containerEl} = this;

		containerEl.empty();

		containerEl.createEl('h2', {text: 'Settings for my awesome plugin.'});

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
