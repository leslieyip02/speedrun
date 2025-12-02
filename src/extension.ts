import * as vscode from 'vscode';
import SidebarProvider from './views/sidebar';

export function activate(context: vscode.ExtensionContext) {
	const htmlUri = vscode.Uri.joinPath(context.extensionUri, "src", "views", "sidebar.html");
	const cssUri = vscode.Uri.joinPath(context.extensionUri, "src", "views", "sidebar.css");
	const provider = new SidebarProvider(htmlUri, cssUri);

	const view = vscode.window.registerWebviewViewProvider(SidebarProvider.viewType, provider);
	context.subscriptions.push(view);
}

export function deactivate() {}
