
export default class ColorOption {
	name = "ColorOption";
	containerEl: HTMLElement;
	changeFn?: (color: string) => void;
	options: string[];
	selectedOption: string;

	constructor(containerEl: HTMLElement, options: string[]) {
		this.containerEl = containerEl;
		this.options = options;

		this.createOptionEls();
	}

	private createOptionEls() {
		for (const option in this.options) {
			let optionEl = this.containerEl.createEl('button', { 'text': option })
			optionEl.onclick = () => {
				this.selectedOption = option;
				this.changeFn?.call(this.selectedOption);
			}
		}
	}

	setName(name: string) {
		this.name = name;
		return this;
	}

	setValue(color: string) {
		if(this.options.contains(color)) {
			this.selectedOption = color;
		}
		return this;
	}

	onChange(func: (color: string) => void) {
		this.changeFn = func;
		return this;
	}
}

