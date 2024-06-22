const BUTTON_SELECTED_CLASS = "color-button-selected";

interface ColorButton {
	color: string;
	element: HTMLElement;
}

export default class ColorOption {
	nameEl: HTMLElement;
	containerEl: HTMLElement;
	changeFn?: (color: string) => void;
	options: string[];
	selectedOption: string;
	optionButtons: ColorButton[] = [];

	constructor(containerEl: HTMLElement, options: string[]) {
		this.containerEl = containerEl;
		this.options = options;

		this.nameEl = this.containerEl.createEl("h3", { text: "Color Option" });
		this.createOptionEls();
	}

	private createOptionEls() {
		for (const option of this.options) {
			let optionEl = this.createOptionButton(option);
			this.optionButtons.push({ color: option, element: optionEl });

			optionEl.onclick = () => {
				if (option === this.selectedOption) return;

				this.changeSelection(option);

				if (this.changeFn) {
					this.changeFn(this.selectedOption);
				}
			};
		}

		let firstEl = this.optionButtons[0];
		if (firstEl) {
			this.selectedOption = firstEl.color;
			firstEl.element.addClass(BUTTON_SELECTED_CLASS);
		}
	}

	private createOptionButton(option: string): HTMLButtonElement {
		return this.containerEl.createEl("button", {
			cls: "color-button",
			attr: { style: `background-color: ${option};` },
		});
	}

	private changeSelection(color: string) {
		const oldColor = this.selectedOption;
		this.selectedOption = color;

		const oldIdx = this.optionButtons.findIndex(
			(x) => x.color === oldColor,
		);
		const newIdx = this.optionButtons.findIndex((x) => x.color === color);
		this.optionButtons[oldIdx].element.removeClass(BUTTON_SELECTED_CLASS);
		this.optionButtons[newIdx].element.addClass(BUTTON_SELECTED_CLASS);
	}

	setName(name: string) {
		this.nameEl.setText(name);
		return this;
	}

	setValue(color: string) {
		if (this.options.contains(color)) {
			this.changeSelection(color);
		}
		return this;
	}

	onChange(func: (color: string) => void) {
		this.changeFn = func;
		return this;
	}
}
