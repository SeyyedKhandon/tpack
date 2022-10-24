import * as vscode from "vscode";
import {
  extensionActivation,
  extensionDeactivation,
  firstTimeActivation,
} from "./util";

export async function activate(context: vscode.ExtensionContext) {
  console.log(
    `Congratulations, your extension "${context.extension.packageJSON.displayName}" installed!`
  );
  firstTimeActivation(context);

  let activateCommand = vscode.commands.registerCommand("tpack.activate", () =>
    extensionActivation(context)
  );
  let deactivateCommand = vscode.commands.registerCommand(
    "tpack.deactivate",
    () => extensionDeactivation(context)
  );
  context.subscriptions.push(activateCommand, deactivateCommand);
}

export function deactivate(context: vscode.ExtensionContext) {
  extensionDeactivation(context);
}
