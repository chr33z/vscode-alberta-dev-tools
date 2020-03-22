"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const vscode = require("vscode");
const vscode_1 = require("vscode");
const icon_auto_completion_provider_1 = require("./auto-completion/icon-auto-completion-provider");
const icon_provider_1 = require("./icon-provider");
function activate(context) {
    return __awaiter(this, void 0, void 0, function* () {
        console.log("Alberta Dev Tools Active");
        const extensionEnabled = yield isAlbertaProject();
        setExtensionEnabled(extensionEnabled);
        if (!extensionEnabled) {
            return;
        }
        console.log("[alberta-dev] is enabled...");
        icon_provider_1.IconProvider.initialize().then(provider => {
            let completionProvider = vscode_1.languages.registerCompletionItemProvider("html", new icon_auto_completion_provider_1.default(provider));
            context.subscriptions.push(completionProvider);
        });
        let activeEditor = vscode.window.activeTextEditor;
        vscode.window.onDidChangeActiveTextEditor((editor) => __awaiter(this, void 0, void 0, function* () {
            activeEditor = editor;
            // update decorators
        }), null, context.subscriptions);
        vscode.workspace.onDidChangeTextDocument((event) => __awaiter(this, void 0, void 0, function* () {
            // update decorators
        }), null, context.subscriptions);
        vscode.workspace.onDidSaveTextDocument((event) => __awaiter(this, void 0, void 0, function* () {
            // TODO: nedd this?
            // if (posix.extname(event.fileName) === '.lingua') {
            // 	settings = await readSettings();
            // }
        }), null, context.subscriptions);
    });
}
exports.activate = activate;
function setExtensionEnabled(enabled) {
    // https://github.com/Microsoft/vscode/issues/10401#issuecomment-280090759
    vscode.commands.executeCommand("setContext", "alberta-dev-tools:enabled", enabled);
}
function isAlbertaProject() {
    return __awaiter(this, void 0, void 0, function* () {
        // TODO:
        return true;
    });
}
function deactivate() { }
exports.deactivate = deactivate;
//# sourceMappingURL=extension.js.map