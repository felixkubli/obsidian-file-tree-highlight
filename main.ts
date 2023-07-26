import { App, Modal, Plugin, PluginSettingTab, Setting, TAbstractFile } from 'obsidian';

// Remember to rename these classes and interfaces!

interface FileTreeHighlightSettings {
	mySetting: string;
	highlightingOptions: HighlightingOptions;
}

const DEFAULT_SETTINGS: FileTreeHighlightSettings = {
	mySetting: 'useHex',
	highlightingOptions: {}
};


interface HighlightingOption {
	dataPath: string,
	backgroundColor: string,
	color: string
}
interface HighlightingOptions {
	[dataPath: string]: HighlightingOption
}

function highlightElement(opt: HighlightingOption) {
	let element: HTMLElement | null = document.querySelector(`div[data-path="${opt.dataPath}"]`);
	if (element) {
		element.style.backgroundColor = opt.backgroundColor;
		element.style.color = opt.color;
	}
}

function applyHighlightingOptions(highlightingOptions: HighlightingOptions) {
	for (const [_, value] of Object.entries(highlightingOptions)) {
		highlightElement(value);
	}
}


export default class FileTreeHighlight extends Plugin {
	settings: FileTreeHighlightSettings;

	async onload() {
		await this.loadSettings();

		applyHighlightingOptions(this.settings.highlightingOptions);

		this.registerEvent(
			this.app.workspace.on("file-menu", (menu, file) => {
				console.log(file);
				menu.addItem((item) => {
					item.setTitle("edit highlighting options")
						.setIcon("palette")
						.onClick(async () => {
							new ColorEditorModal(this.app, file, opts => {
								this.settings.highlightingOptions[opts.dataPath] = opts;
								highlightElement(opts);
							}).open();
						});
				});
			})
		);

		// This adds a settings tab so the user can configure various aspects of the plugin
		this.addSettingTab(new FileTreeHighlightSettingTab(this.app, this));
	}

	onunload() { }

	async loadSettings() {
		this.settings = Object.assign({}, DEFAULT_SETTINGS, await this.loadData());
	}

	async saveSettings() {
		await this.saveData(this.settings);
	}
}

class ColorEditorModal extends Modal {
	result: HighlightingOption
	onSubmit: (result?: HighlightingOption) => void

	constructor(app: App, file: TAbstractFile, onSubmit: (result: HighlightingOption) => void) {
		super(app);
		this.result = {} as HighlightingOption;
		this.result.dataPath = file.path;
		this.onSubmit = onSubmit;
	}
	onOpen() {
		const {contentEl} = this;
		contentEl.setText('Edit the background color');
		contentEl.createEl("h1", { text: "Choose your desired colors" });

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
