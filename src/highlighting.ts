
// TODO: create list of all nav tree items, track active through on click, and set colors accordingly

export interface HighlightingOption {
	dataPath: string,
	backgroundColor: string,
	color: string,
  hoverColor: string,
  activeColor: string
}

export function getEmptyHighlightingOption() {
  return {
    dataPath: '',
    backgroundColor: '',
    color: '',
    hoverColor: '',
    activeColor: ''
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
    const shadedColor = shadeColor(opt.backgroundColor, 20);

    if (opt.backgroundColor) {
      element.onmouseover = () => {
        element!.style.backgroundColor = shadedColor;
      }
      element.onmouseout = () => {
        element!.style.backgroundColor = opt.backgroundColor;
      }
    } else {
      element.onmouseover = null;
      element.onmouseout = null;
    }
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

