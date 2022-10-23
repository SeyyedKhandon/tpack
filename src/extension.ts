import * as vscode from "vscode";
import { defaultSettings, GeneralObject } from "./defaultSettings";
const showDialog = vscode.window.showInformationMessage;

const updateUserSettings = async (settings: GeneralObject) => {
  Object.entries(settings).forEach(async ([key, value]) => {
    await vscode.workspace
      .getConfiguration()
      .update(key, value, vscode.ConfigurationTarget.Global);
  });
};

const activateFiraCodeExtension = async () => {
  const firacode = vscode.extensions.getExtension("SeyyedKhandon.firacode");
  if (firacode) {
    firacode.activate().then(async () => {
      vscode.commands.executeCommand("firacode.install");
    });
  }
};
export async function activate(context: vscode.ExtensionContext) {
  console.log('Congratulations, your extension "Theme Pack" is now active!');
  let disposable = vscode.commands.registerCommand(
    "tpack.updateConfig",
    async () => {
      updateUserSettings(defaultSettings);
      showDialog("Theme Pack Config has been updated.");
      activateFiraCodeExtension();
    }
  );
  context.subscriptions.push(disposable);
}

export function deactivate() {}
