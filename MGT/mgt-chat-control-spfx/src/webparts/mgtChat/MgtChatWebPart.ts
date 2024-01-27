import * as React from 'react';
import * as ReactDom from 'react-dom';
import { Version } from '@microsoft/sp-core-library';
// import {
//   type IPropertyPaneConfiguration,
//   PropertyPaneTextField
// } from '@microsoft/sp-property-pane';
import { BaseClientSideWebPart } from '@microsoft/sp-webpart-base';

//import * as strings from 'MgtChatWebPartStrings';
import MgtChat from './components/MgtChat';
import { IMgtChatProps } from './components/IMgtChatProps';
import { Providers, SharePointProvider } from "@microsoft/mgt-spfx";

export interface IMgtChatWebPartProps {
  chatId: string;
}

export default class MgtChatWebPart extends BaseClientSideWebPart<IMgtChatWebPartProps> {
	public render(): void {
		const element: React.ReactElement<IMgtChatProps> = React.createElement(
			MgtChat,
			{}
		);

		ReactDom.render(element, this.domElement);
	}

	protected async onInit(): Promise<void> {
		// Initialize the MGT Provider

		if (!Providers.globalProvider) {
			Providers.globalProvider = new SharePointProvider(this.context as any);
		}
	}

	protected onDispose(): void {
		ReactDom.unmountComponentAtNode(this.domElement);
	}

	protected get dataVersion(): Version {
		return Version.parse("1.0");
	}

	// protected getPropertyPaneConfiguration(): IPropertyPaneConfiguration {
	// 	return {
	// 		pages: [
	// 			{
	// 				header: {
	// 					description: strings.PropertyPaneDescription,
	// 				},
	// 				groups: [
	// 					{
	// 						groupName: strings.BasicGroupName,
	// 						groupFields: [
	// 							PropertyPaneTextField("chatId", {
	// 								label: strings.ChatIdFieldLabel,
	// 							}),
	// 						],
	// 					},
	// 				],
	// 			},
	// 		],
	// 	};
	// }
}
