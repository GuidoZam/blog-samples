import * as React from 'react';
import * as ReactDom from 'react-dom';
import { Version } from '@microsoft/sp-core-library';
import { BaseClientSideWebPart } from '@microsoft/sp-webpart-base';

import MgtPicker from './components/MgtPicker';
import { IMgtPickerProps } from './components/IMgtPickerProps';
import { Providers, SharePointProvider } from "@microsoft/mgt-spfx";

export interface IMgtPickerWebPartProps {
}

export default class MgtPickerWebPart extends BaseClientSideWebPart<IMgtPickerWebPartProps> {

	public render(): void {
		const element: React.ReactElement<IMgtPickerProps> = React.createElement(
			MgtPicker,
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
