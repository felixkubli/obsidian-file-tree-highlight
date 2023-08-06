
interface Dict<T> {
  [key: string]: T
}

const BUTTON_SELECTED_CLASS = 'color-button-selected';

export default class ColorOption {
  nameEl: HTMLElement;
	containerEl: HTMLElement;
	changeFn?: (color: string) => void;
	options: string[];
	selectedOption: string;
  optionButtons: Dict<HTMLElement> = {} as Dict<HTMLElement>;

	constructor(containerEl: HTMLElement, options: string[]) {
		this.containerEl = containerEl;
		this.options = options;

    this.nameEl = this.containerEl.createEl('p', { 'text': 'Color Option' });
		this.createOptionEls();
	}

	private createOptionEls() {
		for (const option of this.options) {
			let optionEl = this.createOptionButton(option);
      this.optionButtons[option] = optionEl;

			optionEl.onclick = () => {
        if (option === this.selectedOption) return;

        this.changeSelection(option);

        if (this.changeFn) {
          this.changeFn(this.selectedOption);
        }
			}
		}

    let firstEl = Object.entries<HTMLElement>(this.optionButtons).first();
    if (firstEl) {
      this.selectedOption = firstEl[0];
      firstEl[1].addClass(BUTTON_SELECTED_CLASS);
    }
	}

  private createOptionButton(option: string): HTMLButtonElement {
    return this.containerEl.createEl(
      'button',
      { 
        'cls': 'color-button',
        'attr': { 'style': `background-color: ${option};` } 
      }
    );
  }

  private changeSelection(color: string) {
    const oldColor = this.selectedOption;
    this.selectedOption = color;

    this.optionButtons[oldColor].removeClass(BUTTON_SELECTED_CLASS)
    this.optionButtons[this.selectedOption].addClass(BUTTON_SELECTED_CLASS)
  }

	setName(name: string) {
    this.nameEl.setText(name);
    return this;
	}

	setValue(color: string) {
		if(this.options.contains(color)) {
      this.changeSelection(color);
		}
		return this;
	}

	onChange(func: (color: string) => void) {
		this.changeFn = func;
		return this;
	}
}

