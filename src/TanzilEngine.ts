import * as vscode from 'vscode';
import HolyQuranPanel from './Panel';


export class TanzilEngine {
    private readonly _extensionPath: string;
    private panels: HolyQuranPanel[] = [];
    public static instance : TanzilEngine | undefined;

    public static init(extensionPath: string){
        if(this.instance) {
            return this.instance;
        }

        this.instance = new TanzilEngine(extensionPath);
        return this.instance;
    }

    private constructor(extensionPath: string) {
        this._extensionPath = extensionPath;
    }

    showPage() {
        const panel = new HolyQuranPanel(this._extensionPath);
        this.panels.push(panel);
        // panel.
    }
}