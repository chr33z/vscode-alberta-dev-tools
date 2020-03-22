import * as vscode from "vscode";
import { languages } from "vscode";
import IconAutoCompletionProvider from "./auto-completion/icon-auto-completion-provider";
import { IconProvider } from "./icon-provider";

export async function activate(context: vscode.ExtensionContext) {
  console.log("Alberta Dev Tools Active");

  const extensionEnabled = await isAlbertaProject();
  setExtensionEnabled(extensionEnabled);
  if (!extensionEnabled) {
    return;
  }
  console.log("[alberta-dev] is enabled...");

  IconProvider.initialize().then(provider => {
    let completionProvider = languages.registerCompletionItemProvider(
      "html",
      new IconAutoCompletionProvider(provider)
    );
    context.subscriptions.push(completionProvider);
  });

  let activeEditor = vscode.window.activeTextEditor;

  vscode.window.onDidChangeActiveTextEditor(
    async editor => {
      activeEditor = editor;
      // update decorators
    },
    null,
    context.subscriptions
  );

  vscode.workspace.onDidChangeTextDocument(
    async event => {
      // update decorators
    },
    null,
    context.subscriptions
  );

  vscode.workspace.onDidSaveTextDocument(
    async event => {
      // TODO: nedd this?
      // if (posix.extname(event.fileName) === '.lingua') {
      // 	settings = await readSettings();
      // }
    },
    null,
    context.subscriptions
  );
}

function setExtensionEnabled(enabled: boolean) {
  // https://github.com/Microsoft/vscode/issues/10401#issuecomment-280090759
  vscode.commands.executeCommand("setContext", "alberta-dev-tools:enabled", enabled);
}

async function isAlbertaProject() {
  // TODO:
  return true;
}

export function deactivate() {}
