import {
  CompletionItemProvider,
  TextDocument,
  Position,
  CancellationToken,
  CompletionContext,
  ProviderResult,
  CompletionItem,
  CompletionList,
  MarkdownString
} from "vscode";
import { ColorProvider, ColorVariable } from "../color-provider";

export default class ColorAutoCompletionProvider implements CompletionItemProvider {
  private _completionItems: CompletionItem[] = [];

  constructor(private _colorProvider: ColorProvider) {
    this.buildCompletionItems(_colorProvider.colors);
  }

  provideCompletionItems(
    document: TextDocument,
    position: Position,
    token: CancellationToken,
    context: CompletionContext
  ): ProviderResult<CompletionItem[] | CompletionList> {
    return Promise.resolve(this._completionItems);
  }

  private buildCompletionItems(colors: ColorVariable[]) {
    colors.forEach(color => {
      const item = new CompletionItem(color.name);
      item.documentation = new MarkdownString(`${color.name}: ${color.color}`);
      this._completionItems.push(item);
    });
  }
}
