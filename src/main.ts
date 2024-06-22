import { Plugin } from "obsidian";
import {
	FileTreeHighlightSettingTab,
	FileTreeHighlightSettings,
	DEFAULT_SETTINGS,
} from "./settings";
import { HighlightingOption, highlightElement } from "./highlighting";
import { ColorEditorModal } from "./ColorEditorModal";

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
							let oldOpt: HighlightingOption =
								this.settings.highlightingOptions[file.path];
							if (oldOpt === undefined) {
								oldOpt = {} as HighlightingOption;
								oldOpt.dataPath = file.path;
							}
							new ColorEditorModal(
								this.app,
								this.settings,
								oldOpt,
								(opts) => {
									this.settings.highlightingOptions[
										opts.dataPath
									] = opts;
									highlightElement(opts);
									this.saveSettings();
								},
							).open();
						});
				});
			}),
		);

		this.addSettingTab(new FileTreeHighlightSettingTab(this.app, this));

		this.app.workspace.onLayoutReady(() => {
			setTimeout(() => {
				for (const value of Object.values<HighlightingOption>(
					this.settings.highlightingOptions,
				)) {
					highlightElement(value);
				}
			}, 1000);
		});
	}

	onunload() {
		for (const value of Object.values<HighlightingOption>(
			this.settings.highlightingOptions,
		)) {
			const opt = {} as HighlightingOption;
			opt.backgroundColor = "";
			opt.color = "";
			opt.dataPath = value.dataPath;
			highlightElement(opt);
		}
	}

	async loadSettings() {
		this.settings = Object.assign(
			{},
			DEFAULT_SETTINGS,
			await this.loadData(),
		);
	}

	async saveSettings() {
		await this.saveData(this.settings);
	}
}
