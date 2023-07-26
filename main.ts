import { App, Modal, Plugin, PluginSettingTab, Setting } from 'obsidian';

interface HighlightingOption {
	dataPath: string,
	backgroundColor: string,
	color: string
}
interface HighlightingOptions {
	[dataPath: string]: HighlightingOption
}
interface FileTreeHighlightSettings {
	mySetting: string;
	highlightingOptions: HighlightingOptions;
}

const DEFAULT_SETTINGS: FileTreeHighlightSettings = {
	mySetting: 'useHex',
	highlightingOptions: {}
};


function highlightElement(opt: HighlightingOption) {
	let element: HTMLElement | null = document.querySelector(`div[data-path="${opt.dataPath}"]`);
	if (element) {
		element.style.backgroundColor = opt.backgroundColor;
		element.style.color = opt.color;
	}
}


export default class FileTreeHighlight extends Plugin {
	settings: FileTreeHighlightSettings;

	async onload() {
		await this.loadSettings();

		this.registerEvent(
			this.app.workspace.on("file-menu", (menu, file) => {
				menu.addItem((item) => {
					item.setTitle("edit highlighting options")
						.setIcon("palette")
						.onClick(async () => {
							let oldOpt: HighlightingOption = this.settings.highlightingOptions[file.path];
							if (oldOpt === undefined) {
								oldOpt = {} as HighlightingOption;
								oldOpt.dataPath = file.path;
							}
							new ColorEditorModal(this.app, oldOpt, opts => {
								this.settings.highlightingOptions[opts.dataPath] = opts;
								highlightElement(opts);
								this.saveSettings();
							}).open();
						});
				});
			})
		);

		this.addSettingTab(new FileTreeHighlightSettingTab(this.app, this));
	}

	onunload() { 
		for (const value of Object.values(this.settings.highlightingOptions)) {
			let opt = {} as HighlightingOption;
			opt.backgroundColor = '';
			opt.color = '';
			opt.dataPath = value.dataPath;
			highlightElement(opt);
		}
	}


	async loadSettings() {
		this.settings = Object.assign({}, DEFAULT_SETTINGS, await this.loadData());
		for (const value of Object.values(this.settings.highlightingOptions)) {
			highlightElement(value);
		}
	}

	async saveSettings() {
		await this.saveData(this.settings);
	}
}

class ColorEditorModal extends Modal {
	result: HighlightingOption
	onSubmit: (result?: HighlightingOption) => void

	constructor(app: App, opt: HighlightingOption, onSubmit: (result: HighlightingOption) => void) {
		super(app);
		this.result = opt;
		this.onSubmit = onSubmit;
	}
	onOpen() {
		const {contentEl} = this;
		contentEl.setText('Edit the background color');
		contentEl.createEl("h1", { text: "Choose your desired colors" });

		new Setting(contentEl)
			.setName("Background Color")
			.addText(text => {
				text.setValue(this.result.backgroundColor);
				text.onChange((value: string) => {
					this.result.backgroundColor = value; 
				});
			})
			.addColorPicker(colorComponent => {
				colorComponent.setValue(this.result.backgroundColor);
				colorComponent.onChange(color => {
					this.result.backgroundColor = color;
				});
			});
		new Setting(contentEl)
			.setName("Text Color")
			.addText(text => {
				text.setValue(this.result.color);
				text.onChange((value: string) => {
					this.result.color = value;
				});
			})
			.addColorPicker(colorComponent => {
				colorComponent.setValue(this.result.color);
				colorComponent.onChange(color => {
					this.result.color = color;
				});
			});

		new Setting(contentEl)
			.addButton(btn =>
				btn
				  .setButtonText("Remove Element Settings")
				  .setCta()
				  .onClick(() => {
					this.close();
					this.result.color = '';
					this.result.backgroundColor = '';
					this.onSubmit(this.result);
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

