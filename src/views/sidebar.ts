import * as vscode from 'vscode';
import RunManager from '../models/manager';
import { Message } from '../models/message';
import fs from 'fs';
import path from 'path';

class SidebarProvider implements vscode.WebviewViewProvider {

    public static readonly viewType = 'speedrun.sidebarView';

    private htmlUri: vscode.Uri;
    private cssUri: vscode.Uri;

    private view?: vscode.WebviewView;
    private runManager: RunManager;

    constructor(htmlUri: vscode.Uri, cssUri: vscode.Uri) {
        this.htmlUri = htmlUri;
        this.cssUri = cssUri;
        this.runManager = new RunManager(this.sendMessage);
    }
    
    resolveWebviewView = (webviewView: vscode.WebviewView) => {
        this.view = webviewView;
        webviewView.webview.options = { enableScripts: true };

        let html = fs.readFileSync(this.htmlUri.fsPath, "utf-8");
        const cssUri = webviewView.webview.asWebviewUri(this.cssUri);
        webviewView.webview.html = html.replace("{{styles}}", cssUri.toString());

        this.runManager.init();
        webviewView.webview.onDidReceiveMessage(this.runManager.didReceiveMessage);
    };

    private sendMessage = (message: Message) => {
        this.view?.webview.postMessage(message);
    };
}

export default SidebarProvider;