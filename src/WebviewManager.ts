// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';
// import throttle = require('lodash.throttle'); 
import HolyQuranPanel from './Panel';
import { DisposableComponent, dispose } from './DisposableComponent';



// function setShowRunningTasks_theLast(context:vscode.ExtensionContext) {
// 	setTimeout(() => {
// 		vscode.commands.getCommands().then((cmds)=>{
// 			console.log( cmds );
// 		});
// 	}, 2000);
// }

let myCounter : number = 0;

export class WebviewManager extends DisposableComponent {
	private myPanels : DisposableComponent;
	// private myPanels : StatusbarTask[] = [];
	constructor() {
		super();
		this.myPanels = new DisposableComponent();
		this.addDisposable(this.myPanels);
		// this.addDisposable(vscode.workspace.onDidChangeConfiguration(() => {
		// 	this.reload();
		// }));
		// this.addConfigureTaskButton();
		
		// this.reload();
	}
}