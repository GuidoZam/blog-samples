import * as React from 'react';
import * as ReactDom from 'react-dom';
import { Version } from '@microsoft/sp-core-library';
import { BaseClientSideWebPart } from '@microsoft/sp-webpart-base';

import MgtSearchResult from './components/MgtSearchResult';
import { IMgtSearchResultProps } from './components/IMgtSearchResultProps';
import { Providers, SharePointProvider } from "@microsoft/mgt-spfx";

export interface IMgtSearchResultWebPartProps {
}

export default class MgtSearchResultWebPart extends BaseClientSideWebPart<IMgtSearchResultWebPartProps> {

	public render(): void {
		const element: React.ReactElement<IMgtSearchResultProps> =
			React.createElement(MgtSearchResult, {
			});

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
