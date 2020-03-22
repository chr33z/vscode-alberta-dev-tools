"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const vscode_1 = require("vscode");
const path_1 = require("path");
class IconAutoCompletionProvider {
    constructor(_iconProvider) {
        this._iconProvider = _iconProvider;
        this._completionItems = [];
        this.buildCompletionItems(_iconProvider.icons);
    }
    provideCompletionItems(document, position, token, context) {
        return Promise.resolve(this._completionItems);
    }
    buildCompletionItems(icons) {
        icons.forEach(uri => {
            const fileName = path_1.posix.basename(uri.path);
            const iconName = fileName.slice(0, -4).substring(3, fileName.length);
            // remove extension and "md-" prefix
            const item = new vscode_1.CompletionItem(iconName);
            item.documentation = new vscode_1.MarkdownString(fileName);
            this._completionItems.push(item);
        });
    }
}
exports.default = IconAutoCompletionProvider;
//# sourceMappingURL=icon-auto-completion-provider.js.map