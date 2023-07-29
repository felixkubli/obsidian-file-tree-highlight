import { App, Modal, Setting } from 'obsidian';
import { getEmptyHighlightingOption, HighlightingOption } from './highlighting';

export class ColorEditorModal extends Modal {
	result: HighlightingOption
	onSubmit: (result: HighlightingOption) => void

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
            let emptyOption = getEmptyHighlightingOption();
            emptyOption.dataPath = this.result.dataPath;
            this.onSubmit(emptyOption);
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

