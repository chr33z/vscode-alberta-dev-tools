import {
  CompletionItemProvider,
  TextDocument,
  Position,
  CancellationToken,
  CompletionContext,
  ProviderResult,
  CompletionItem,
  CompletionList,
  Range,
  Uri,
  MarkdownString
} from "vscode";
import { IconProvider } from "../icon-provider";
import { posix } from "path";

export default class IconAutoCompletionProvider implements CompletionItemProvider {
  private _completionItems: CompletionItem[] = [];

  constructor(private _iconProvider: IconProvider) {
    this.buildCompletionItems(_iconProvider.icons);
  }

  provideCompletionItems(
    document: TextDocument,
    position: Position,
    token: CancellationToken,
    context: CompletionContext
  ): ProviderResult<CompletionItem[] | CompletionList> {
    return Promise.resolve(this._completionItems);
  }

  private buildCompletionItems(icons: Uri[]) {
    icons.forEach(uri => {
      const fileName = posix.basename(uri.path);
      const iconName = fileName.slice(0, -4).substring(3, fileName.length);
      // remove extension and "md-" prefix
      const item = new CompletionItem(iconName);
      item.documentation = new MarkdownString(fileName);
      this._completionItems.push(item);
    });
  }
}
