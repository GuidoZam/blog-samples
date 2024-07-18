import * as React from 'react';
import * as ReactDom from 'react-dom';
import { Version } from '@microsoft/sp-core-library';
import { BaseClientSideWebPart } from '@microsoft/sp-webpart-base';

import MgtToDo from './components/MgtToDo';
import { IMgtToDoProps } from './components/IMgtToDoProps';
import { Providers, SharePointProvider } from "@microsoft/mgt-spfx";

export interface IMgtToDoWebPartProps {
}

export default class MgtToDoWebPart extends BaseClientSideWebPart<IMgtToDoWebPartProps> {
	public render(): void {
		const element: React.ReactElement<IMgtToDoProps> = React.createElement(
			MgtToDo,
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
}
