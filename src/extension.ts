import * as vscode from "vscode";
import { extractAsKeyValue, GeneralObject } from "./util";
import { defaultSettings } from "./defaultSettings";
const installfont = require("installfont");
const showDialog = vscode.window.showInformationMessage;

const updateUserSettings = async (settings: GeneralObject[]) => {
  settings.forEach(async (setting) => {
    const { key, value } = extractAsKeyValue(setting);
    await vscode.workspace
      .getConfiguration()
      .update(key, value, vscode.ConfigurationTarget.Global);
  });
};
const installFiraCodeFont = async (address: string) => {
  installfont(address, function (err: any) {
    if (err) {
      showDialog(err.toString());
      showDialog("Reload VSCODE after manually installing fonts!");
      require("child_process").exec(`start "" ${address}`);
    }
    showDialog("The FiraFont has been successfully installed");
  });
};
export async function activate(context: vscode.ExtensionContext) {
  console.log('Congratulations, your extension "Theme Pack" is now active!');
  let disposable = vscode.commands.registerCommand(
    "tpack.updateConfig",
    async () => {
      await updateUserSettings(defaultSettings);
      showDialog("Theme Pack Config has been updated.");
      installFiraCodeFont(context.extensionPath + "/firaCodeFont");
    }
  );
  context.subscriptions.push(disposable);
}

export function deactivate() {}
