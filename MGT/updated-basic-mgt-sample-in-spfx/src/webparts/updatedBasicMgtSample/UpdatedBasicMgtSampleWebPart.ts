import * as React from 'react';
import * as ReactDom from 'react-dom';
import { Version } from '@microsoft/sp-core-library';
import { BaseClientSideWebPart } from '@microsoft/sp-webpart-base';
import * as strings from "UpdatedBasicMgtSampleWebPartStrings";

// Import the MGT required packages
import { Providers, customElementHelper } from "@microsoft/mgt-element";
import { SharePointProvider } from "@microsoft/mgt-sharepoint-provider";
import { lazyLoadComponent } from "@microsoft/mgt-spfx-utils";

// Asyncronously import the component
const ReactComponent = React.lazy(() =>
		import(
			/* webpackChunkName: 'mgt-react-component' */ "./components/UpdatedBasicMgtSample"
		));

// Set the disambiguation before initialization
customElementHelper.withDisambiguation("updated-basic-mgt-sample");

export interface IUpdatedBasicMgtSampleWebPartProps {
}

export default class UpdatedBasicMgtSampleWebPart extends BaseClientSideWebPart<IUpdatedBasicMgtSampleWebPartProps> {
	public render(): void {
		// Lazy load the component
		const element = lazyLoadComponent(ReactComponent, {
			description: strings.Description,
		});

		ReactDom.render(element, this.domElement);
	}

	protected async onInit(): Promise<void> {
		// Set the global SharePoint provider
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
