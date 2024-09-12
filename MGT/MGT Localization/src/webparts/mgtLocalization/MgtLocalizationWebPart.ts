import * as React from 'react';
import * as ReactDom from 'react-dom';
import { Version } from '@microsoft/sp-core-library';
import { BaseClientSideWebPart } from '@microsoft/sp-webpart-base';

import { Providers, customElementHelper } from "@microsoft/mgt-element";
import { SharePointProvider } from "@microsoft/mgt-sharepoint-provider";
import { lazyLoadComponent } from "@microsoft/mgt-spfx-utils";

customElementHelper.withDisambiguation("mgt-localization");

const MGTLocalizationComponent = React.lazy(
	() =>
		import(
			/* webpackChunkName: 'mgt-react-component' */
			"./components/MgtLocalization"
		)
);

export interface IMgtLocalizationWebPartProps {
}

export default class MgtLocalizationWebPart extends BaseClientSideWebPart<IMgtLocalizationWebPartProps> {
	public render(): void {
		// Lazy load the component
		const element = lazyLoadComponent(MGTLocalizationComponent, {});

		ReactDom.render(element, this.domElement);
	}

	protected async onInit(): Promise<void> {
		// Initialize the MGT provider
		if (!Providers.globalProvider) {
			Providers.globalProvider = new SharePointProvider(this.context);
		}
		return super.onInit();
	}

	protected onDispose(): void {
		ReactDom.unmountComponentAtNode(this.domElement);
	}

	protected get dataVersion(): Version {
		return Version.parse("1.0");
	}
}
