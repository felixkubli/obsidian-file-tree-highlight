import { App, Modal, Setting } from 'obsidian';
import ColorOption from './ColorOption';
import { getEmptyHighlightingOption, HighlightingOption } from './highlighting';
import { FileTreeHighlightSettings } from './settings';

export class ColorEditorModal extends Modal {
  settings: FileTreeHighlightSettings;
	result: HighlightingOption;
	onSubmit: (result: HighlightingOption) => void;

	constructor(app: App, settings: FileTreeHighlightSettings, opt: HighlightingOption, onSubmit: (result: HighlightingOption) => void) {
		super(app);
		this.result = opt;
		this.onSubmit = onSubmit;
    this.settings = settings;
	}
	onOpen() {
		const {contentEl} = this;
		contentEl.setText('edit the element colors');
		contentEl.createEl('h1', { text: 'Choose your desired colors' });

		new ColorOption(contentEl, this.settings.backgroundColors)
			.setName('Background Color')
			.setValue(this.result.backgroundColor)
			.onChange(color => this.result.backgroundColor = color);
		new ColorOption(contentEl, this.settings.fontColors)
			.setName('Text Color')
			.setValue(this.result.color)
			.onChange(color => this.result.color = color);

		new Setting(contentEl)
			.addButton(btn =>
				btn
				  .setButtonText('Remove Element Settings')
				  .setCta()
				  .onClick(() => {
            this.close();
            let emptyOption = getEmptyHighlightingOption();
            emptyOption.dataPath = this.result.dataPath;
            this.onSubmit(emptyOption);
				  })
			)
			.addButton(btn =>
				btn
				  .setButtonText('Submit')
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

