import { workspace, Uri } from "vscode";

export type ColorVariable = { name: string; color: string };

export class ColorProvider {
  public colors: ColorVariable[] = [];

  private regexPattern = new RegExp(/^\s*(--alberta-.+):\s*(#[\w]{6})/gm);

  private constructor() {}

  public static async initialize(): Promise<ColorProvider> {
    const provider = new ColorProvider();
    await provider.update();
    return provider;
  }

  public async update() {
    this.colors = await this.readColorNames();
  }

  private async readColorNames(): Promise<ColorVariable[]> {
    const globalColors =
      (await workspace.findFiles("**src/global.scss", `**/node_modules/**`))[0] || undefined;
    const albertaColors =
      (await workspace.findFiles("**src/theme/alberta-colors.scss", `**/node_modules/**`))[0] ||
      undefined;

    return [
      ...new Set(await this.readColorsInDocument(globalColors)),
      ...new Set(await this.readColorsInDocument(albertaColors))
    ];
  }

  private async readColorsInDocument(uri: Uri): Promise<ColorVariable[]> {
    const colorVariables: ColorVariable[] = [];
    if (uri) {
      const document = await workspace.openTextDocument(uri);
      let lines = document.getText().split("\n");

      lines.forEach(line => {
        const match = this.regexPattern.exec(line);
        if (match && match.length > 2) {
          colorVariables.push({ name: match[1], color: match[2] });
        }
      });
    }
    return colorVariables;
  }
}
