
export interface HighlightingOption {
	dataPath: string,
	backgroundColor: string,
	color: string,
}

export function getEmptyHighlightingOption() {
	return {
		dataPath: '',
		backgroundColor: '',
		color: '',
		} as HighlightingOption;
}

export interface HighlightingOptions {
	[dataPath: string]: HighlightingOption
}


export function highlightElement(opt: HighlightingOption) {
	let element: HTMLElement | null = document.querySelector(`div[data-path="${opt.dataPath}"]`);
	if (element) {
		element.style.backgroundColor = opt.backgroundColor;
		element.style.color = opt.color;
		applyHoverAndActiveEffects(element, opt);
	}
}


function applyHoverAndActiveEffects(element: HTMLElement, option: HighlightingOption) {
	const shadedColor = shadeColor(option.backgroundColor, 20);
	if (option.backgroundColor) {
		element.onmouseover = () => {
			element!.style.backgroundColor = shadedColor;
		}
		element.onmouseout = () => {
			element!.style.backgroundColor = option.backgroundColor;
		}
	} else {
		element.onmouseover = null;
		element.onmouseout = null;
	}
}


function shadeColor(hexColor: string, magnitude: number) {
	hexColor = hexColor.replace(`#`, ``);
	if (hexColor.length === 6) {
		const decimalColor = parseInt(hexColor, 16);
		let r = (decimalColor >> 16) + magnitude;
		r > 255 && (r = 255);
		r < 0 && (r = 0);
		let g = (decimalColor & 0x0000ff) + magnitude;
		g > 255 && (g = 255);
		g < 0 && (g = 0);
		let b = ((decimalColor >> 8) & 0x00ff) + magnitude;
		b > 255 && (b = 255);
		b < 0 && (b = 0);
		return `#${(g | (b << 8) | (r << 16)).toString(16)}`;
	} else {
		return hexColor;
	}
};

