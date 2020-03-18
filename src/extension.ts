// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';
import HolyQuranPanel from './Panel';
import {TanzilEngine} from './TanzilEngine';

console.log('your extension "quran" js is loaded.');

// this method is called when your extension is activated
// your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {

	// Use the console to output diagnostic information (console.log) and errors (console.error)
	// This line of code will only be executed once when your extension is activated
	console.log('Congratulations, your extension "quran" is now active!');
	const engine:TanzilEngine = TanzilEngine.init(context.extensionPath);

	// The command has been defined in the package.json file
	// Now provide the implementation of the command with registerCommand
	// The commandId parameter must match the command field in package.json
	context.subscriptions.push(
		vscode.commands.registerCommand('holyQuran.start', () => {						
			// Create and show a new webview
			engine.showPage();
			// HolyQuranPanel.createOrShow(context.extensionPath);
			// const hq = new HolyQuranPanel(context.extensionPath);
			// context.subscriptions.push(hq);
			// const panel = vscode.window.createWebviewPanel(
			// 	'holyQuran', // Identifies the type of the webview. Used internally
			// 	'Cat Coding2', // Title of the panel displayed to the user
			// 	vscode.ViewColumn.One, // Editor column to show the new webview panel in.
			// 	{ // Webview options. More on these later.
			// 		// Enable javascript in the webview
			// 		enableScripts: true,

			// 		// And restrict the webview to only loading content from our extension's `media` directory.
			// 		localResourceRoots: [vscode.Uri.file(path.join(extensionPath, 'media'))]
			// 	}
			// );

			// // And set its HTML content
			// panel.webview.html = getWebviewContent();
		})
	);
	context.subscriptions.push(
		vscode.commands.registerCommand('holyQuran.doRefactor', () => {
			// if (HolyQuranPanel.currentPanel) {
			// 	HolyQuranPanel.currentPanel.doRefactor();
			// }
		})
	);
	let disposable = vscode.commands.registerCommand('extension.helloWorld', () => {
		// The code you place here will be executed every time your command is executed

		// Display a message box to the user
		vscode.window.showInformationMessage('Hello World!');
	});

	context.subscriptions.push(disposable);
}

// function getWebviewContent() {
// 	console.log('geWebContent.called');
// 	return `<!DOCTYPE html>
//   <html lang="en">
//   <head>
// 	  <meta charset="UTF-8">
// 	  <meta name="viewport" content="width=device-width, initial-scale=1.0">
// 	  <title>Cat Coding</title>
//   </head>
//   <body>
// 	  <img src="https://media.giphy.com/media/JIX9t2j0ZTN9S/giphy.gif" width="300" />
//   </body>
//   </html>`;
// }
// this method is called when your extension is deactivated
export function deactivate() {}
