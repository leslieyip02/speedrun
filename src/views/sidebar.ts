import * as vscode from 'vscode';
import RunManager from '../models/manager';
import { Message } from '../models/message';
import fs from 'fs';

class SidebarProvider implements vscode.WebviewViewProvider {

    public static readonly viewType = "speedrun.sidebarView";

    private htmlUri: vscode.Uri;
    private cssUri: vscode.Uri;
    private codiconsUri: vscode.Uri;

    private view?: vscode.WebviewView;
    private runManager: RunManager;

    constructor(htmlUri: vscode.Uri, cssUri: vscode.Uri, codiconsUri: vscode.Uri) {
        this.htmlUri = htmlUri;
        this.cssUri = cssUri;
        this.codiconsUri = codiconsUri;
        this.runManager = new RunManager(this.sendMessage);
    }

    resolveWebviewView = (webviewView: vscode.WebviewView) => {
        this.view = webviewView;
        webviewView.webview.options = { enableScripts: true };

        let html = fs.readFileSync(this.htmlUri.fsPath, "utf-8");
        const cssUri = webviewView.webview.asWebviewUri(this.cssUri);
        const codiconsUri = webviewView.webview.asWebviewUri(this.codiconsUri);
        webviewView.webview.html = html
            .replace("{{styles}}", cssUri.toString())
            .replace("{{codicons}}", codiconsUri.toString());

        webviewView.webview.onDidReceiveMessage(this.runManager.didReceiveMessage);
        this.runManager.sync();

        const disposables: vscode.Disposable[] = this.runManager.registerCommands();
        disposables.push(webviewView.onDidChangeVisibility(() => {
            if (webviewView.visible) {
                this.runManager.sync();
            }
        }));
        disposables.push(webviewView.onDidDispose(() => {
            disposables.forEach(d => d.dispose());
        }));
    };

    private sendMessage = (message: Message) => {
        this.view?.webview.postMessage(message);
    };
}

export default SidebarProvider;