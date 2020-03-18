import * as vscode from 'vscode';
import HolyQuranPanel from './Panel';


export class TanzilEngine {
    private static icon: string = '$(book)';
    private readonly extensionPath: string;
    private panels: HolyQuranPanel[] = [];
    private statusbar: vscode.StatusBarItem;
    
    public static instance : TanzilEngine | undefined;

    public static init(extensionPath: string){
        if(this.instance) {
            return this.instance;
        }

        this.instance = new TanzilEngine(extensionPath);
        return this.instance;
    }

    private counter: number = 0;
    private constructor(extensionPath: string) {
        this.extensionPath = extensionPath;
        this.statusbar = vscode.window.createStatusBarItem(vscode.StatusBarAlignment.Right, 200);
        this.statusbar.text = `${TanzilEngine.icon}`;
        this.statusbar.command = 'holyQuran.start';
        this.statusbar.tooltip = 'Holy Quran #9:13\nSurah Maryam';
        this.statusbar.show();    
        setInterval(() => {
            this.counter++;
    
            // Update state
            // vscode.setState({ count: currentCount });
    
            // Alert the extension when the cat introduces a bug
            // if (Math.random() < Math.min(0.001 * this.counter, 0.05)) {
                // Send a message back to the extension
                this.broadcast({command: 'counter', value: this.counter});
            // }
        }, 1000);
    }

    public dispose() {
		// Clean up our resources
		this.statusbar.dispose();

		while (this.panels.length) {
			const x = this.panels.pop();
			if (x) {
				x.dispose();
			}
		}
    }
    
    private broadcast(message: any){
        this.panels.forEach((panel)=>{            
            panel.postMessage(message);
        });
    }

    showPage() {
        const panel = new HolyQuranPanel(this.extensionPath);
        this.panels.push(panel);
        // panel.
    }
}