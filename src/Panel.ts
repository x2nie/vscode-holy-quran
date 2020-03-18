import * as path from 'path';
import * as vscode from 'vscode';

const cats = {
	'Coding Cat': 'https://media.giphy.com/media/JIX9t2j0ZTN9S/giphy.gif',
	'Compiling Cat': 'https://media.giphy.com/media/mlvseq9yvZhba/giphy.gif',
	'Testing Cat': 'https://media.giphy.com/media/3oriO0OEd9QIDdllqo/giphy.gif'
};

/**
 * Manages cat coding webview panels
 */
export default class HolyQuranPanel {
	/**
	 * Track the currently panel. Only allow a single panel to exist at a time.
	 */
	// public static currentPanel: HolyQuranPanel | undefined;

	public static readonly viewType = 'holyQuran';

	private readonly _webview: vscode.WebviewPanel;
	private readonly _extensionPath: string;
	private _disposables: vscode.Disposable[] = [];

	get ready() {return this._webview.visible;}

	public static createOrShow(extensionPath: string) {
		const column = vscode.window.activeTextEditor
			? vscode.window.activeTextEditor.viewColumn
			: undefined;

		// If we already have a panel, show it.
		// if (HolyQuranPanel.currentPanel) {
		// 	HolyQuranPanel.currentPanel._panel.reveal(column);
		// 	return;
		// }

		// Otherwise, create a new panel.
		const panel = vscode.window.createWebviewPanel(
			HolyQuranPanel.viewType,
			'Cat CodingT',
			column || vscode.ViewColumn.One,
			{
				// Enable javascript in the webview
                enableScripts: true,
                enableFindWidget: true,
                retainContextWhenHidden: true,

				// And restrict the webview to only loading content from our extension's `media` directory.
				localResourceRoots: [
                    vscode.Uri.file(path.join(extensionPath, 'static')),
                    vscode.Uri.file(path.join(extensionPath, 'out', 'public'))
                ]
			}
		);

		// HolyQuranPanel.currentPanel = new HolyQuranPanel(panel, extensionPath);
	}

	// public static revive(panel: vscode.WebviewPanel, extensionPath: string) {
	// 	HolyQuranPanel.currentPanel = new HolyQuranPanel(panel, extensionPath);
	// }

	public constructor(extensionPath: string) {
		const column = vscode.window.activeTextEditor
			? vscode.window.activeTextEditor.viewColumn
			: undefined;

		this._webview = vscode.window.createWebviewPanel(
			HolyQuranPanel.viewType,
			'Cat CodingT',
			column || vscode.ViewColumn.One,
			{
				// Enable javascript in the webview
                enableScripts: true,
                enableFindWidget: true,
                retainContextWhenHidden: true,

				// And restrict the webview to only loading content from our extension's `media` directory.
				localResourceRoots: [
                    vscode.Uri.file(path.join(extensionPath, 'static')),
                    vscode.Uri.file(path.join(extensionPath, 'out', 'public'))
                ]
			}
		);
		this._extensionPath = extensionPath;

		// Set the webview's initial html content
		this._update();

		// Listen for when the panel is disposed
		// This happens when the user closes the panel or when the panel is closed programatically
		this._webview.onDidDispose(() => this.dispose(), null, this._disposables);

		// Update the content based on view changes
		this._webview.onDidChangeViewState(
			e => {
				if (this._webview.visible) {
					this._update();
				}
			},
			null,
			this._disposables
		);

		// Handle messages from the webview
		this._webview.webview.onDidReceiveMessage(
			message => {
				switch (message.command) {
					case 'alert':
						vscode.window.showErrorMessage(message.text);
						return;
				}
			},
			null,
			this._disposables
		);
	}

	public postMessage(message: any) {
		// Send a message to the webview webview.
		// You can send any JSON serializable data.
		if(this.ready) {
			this._webview.webview.postMessage(message /* { command: 'refactor' } */);
		}
	}

	public dispose() {
		// HolyQuranPanel.currentPanel = undefined;

		// Clean up our resources
		this._webview.dispose();

		while (this._disposables.length) {
			const x = this._disposables.pop();
			if (x) {
				x.dispose();
			}
		}
	}

	private _update() {
		const webview = this._webview.webview;

		// Vary the webview's content based on where it is located in the editor.
		switch (this._webview.viewColumn) {
			case vscode.ViewColumn.Two:
				this._updateForCat(webview, 'Compiling Cat');
				return;

			case vscode.ViewColumn.Three:
				this._updateForCat(webview, 'Testing Cat');
				return;

			case vscode.ViewColumn.One:
			default:
				this._updateForCat(webview, 'Coding Cat');
				return;
		}
	}

	private _updateForCat(webview: vscode.Webview, catName: keyof typeof cats) {
		this._webview.title = catName;
		this._webview.webview.html = this._getHtmlForWebview(webview, cats[catName]);
	}

	private _getHtmlForWebview(webview: vscode.Webview, catGifPath: string) {
		// Local path to main script run in the webview
		const scriptPathOnDisk = vscode.Uri.file(
			path.join(this._extensionPath, 'static', 'main.js')
		);

		// And the uri we use to load this script in the webview
		const scriptUri = webview.asWebviewUri(scriptPathOnDisk);

		// Use a nonce to whitelist which scripts can be run
		const nonce = getNonce();

		return `<!DOCTYPE html>
            <html lang="en">
            <head>
                <meta charset="UTF-8">

                <!--
                Use a content security policy to only allow loading images from https or from our extension directory,
                and only allow scripts that have a specific nonce.
                -->
                <meta http-equiv="Content-Security-Policy" content="default-src 'none'; img-src ${webview.cspSource} https:; script-src 'nonce-${nonce}';">

                <meta name="viewport" content="width=device-width, initial-scale=1.0">
                <title>Cat Coding2</title>
            </head>
            <body>
                <!-- img src="${catGifPath}" width="300" / -->
                <h1 id="lines-of-code-counter">0</h1>

                <script nonce="${nonce}" src="${scriptUri}"></script>
            </body>
            </html>`;
	}
}

function getNonce() {
	let text = '';
	const possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
	for (let i = 0; i < 32; i++) {
		text += possible.charAt(Math.floor(Math.random() * possible.length));
	}
	return text;
}
