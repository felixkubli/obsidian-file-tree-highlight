# File Tree Highlight

This is a plugin for coloring elements in the file tree of Obsidian (https://obsidian.md).

## Manually installing the plugin

Copy over `main.js`, `styles.css`, `manifest.json` to your vault `VaultFolder/.obsidian/plugins/obsidian-file-tree-highlight/`.

Alternatively, clone this repository in the vault directory mentioned above.

## Usage

### Adding coloring to a file tree element

1. Right-click a folder of file in the file tree on the left.
2. Click on the option "edit highlighting options".
3. Select a color for the background of the tree element.
4. Select a color for the font color of the element.
5. Click submit

### Removing the styling of a tree element.

1. Right-click the colored file tree element.
2. Click on the option "edit highlighting options".
3. Click on "Remove Element Settings".

### Change Selectable Colors

1. Go to the settings of this plugin. Click on the Color you want to change, then a color picker will be opened.

## Known bugs / missing features

-   In obsidian, the active file will have a lighter color in the file tree. This behaviour is not supported at the moment.

## Development

-   Clone this repo.
-   `npm i` or `yarn` to install dependencies
-   `npm run dev` to start compilation in watch mode.

This project uses Typescript to provide type checking and documentation.
The repo depends on the latest plugin API (obsidian.d.ts) in Typescript Definition format.

### API Documentation

See https://github.com/obsidianmd/obsidian-api
