import * as vscode from "vscode";
import { extractAsKeyValue, GeneralObject } from "./util";
import { defaultSettings } from "./defaultSettings";
import { download } from "./download";

const updateUserSettings = async (settings: GeneralObject[]) => {
  settings.forEach(async (setting) => {
    const { key, value } = extractAsKeyValue(setting);
    await vscode.workspace
      .getConfiguration()
      .update(key, value, vscode.ConfigurationTarget.Global);
  });
};
export async function activate(context: vscode.ExtensionContext) {
  console.log('Congratulations, your extension "Theme Pack" is now active!');
  const showDialog = vscode.window.showInformationMessage;
  let disposable = vscode.commands.registerCommand(
    "tpack.updateConfig",
    async () => {
      console.log(JSON.stringify(defaultSettings, null, 1));
      await updateUserSettings(defaultSettings);
      showDialog("Theme Pack Config has been updated");
      // download(
      //   context.extensionPath,
      //   () => showDialog("Downloading firaCode.zip"),
      //   (addr: string) => showDialog(`${addr} has been Downloaded.`)
      // ).catch(() => {
      //   showDialog(
      //     "Please Try download FiraCode Manually from extension page."
      //   );
      // });
    }
  );
  context.subscriptions.push(disposable);
}

export function deactivate() {}
