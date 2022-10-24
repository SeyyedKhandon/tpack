import * as vscode from "vscode";
import { defaultSettings, GeneralObject } from "./defaultSettings";
const showDialog = vscode.window.showInformationMessage;

const updateUserSettings = (settings: GeneralObject, remove = false) =>
  Object.entries(settings).forEach(([key, value]) =>
    vscode.workspace
      .getConfiguration()
      .update(
        key,
        remove ? undefined : value,
        vscode.ConfigurationTarget.Global
      )
  );
export function firacodeActivation(
  state: "activate" | "deactivate" = "activate"
) {
  const firaCode = vscode.extensions.getExtension("SeyyedKhandon.firacode");
  if (!firaCode) return showDialog('Please install "FiraCode font" extension.');
  firaCode.activate().then(() => {
    vscode.commands.executeCommand(`firacode.${state}`);
  });
}

export function extensionActivation(context: vscode.ExtensionContext) {
  updateUserSettings(defaultSettings);
  showDialog(`${context.extension.packageJSON.displayName} is activated!`);
}

export function firstTimeActivation(context: vscode.ExtensionContext) {
  const id = context.extension.id;
  const version = context.extension.packageJSON.version ?? "1.0.0";
  const previousVersion = context.globalState.get(id);
  if (previousVersion === version) return;

  extensionActivation(context);
  context.globalState.update(id, version);
}

export function extensionDeactivation(context: vscode.ExtensionContext) {
  context.globalState.update(context.extension.id, undefined);
  updateUserSettings(defaultSettings, true);
  firacodeActivation("deactivate");
  showDialog(`${context.extension.id} is deactivated!`);
}
