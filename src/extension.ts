import * as vscode from "vscode";
import { defaultSettings, GeneralObject } from "./defaultSettings";
import path = require("path");
const showDialog = vscode.window.showInformationMessage;

const updateUserSettings = async (settings: GeneralObject) => {
  Object.entries(settings).forEach(async ([key, value]) => {
    await vscode.workspace
      .getConfiguration()
      .update(key, value, vscode.ConfigurationTarget.Global);
  });
};
function dirOpen(dirPath: string) {
  let command = "";
  switch (process.platform) {
    case "darwin":
      command = "open";
      break;
    case "win32":
      command = "explorer";
      break;
    default:
      command = "xdg-open";
      break;
  }
  return require("child_process").exec(`${command} ${dirPath}`);
}

export async function activate(context: vscode.ExtensionContext) {
  console.log('Congratulations, your extension "Theme Pack" is now active!');
  let disposable = vscode.commands.registerCommand(
    "tpack.updateConfig",
    async () => {
      await updateUserSettings(defaultSettings);
      showDialog("Theme Pack Config has been updated.");
      const fontAddress = path.resolve(context.extensionPath, "firaCodeFont");
      showDialog(
        `The FiraCode Font directory will open. Please install them if you do not already have them. ${fontAddress}`
      );
      dirOpen(fontAddress);
      showDialog("Reload VSCODE after manually installing fonts!");
    }
  );
  context.subscriptions.push(disposable);
}

export function deactivate() {}
