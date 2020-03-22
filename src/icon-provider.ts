import { Task, workspace, Uri } from "vscode";

export class IconProvider {
  public icons: Uri[] = [];

  private constructor() {}

  public static async initialize(): Promise<IconProvider> {
    const provider = new IconProvider();
    provider.icons = await workspace.findFiles(
      "**src/assets/icon/**/md*.svg",
      `**/node_modules/**`
    );
    return provider;
  }
}
