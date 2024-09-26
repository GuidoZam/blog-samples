import * as React from 'react';
import * as ReactDom from 'react-dom';
import { Version } from '@microsoft/sp-core-library';
import { BaseClientSideWebPart } from '@microsoft/sp-webpart-base';

import { Providers, customElementHelper } from "@microsoft/mgt-element";
import { SharePointProvider } from "@microsoft/mgt-sharepoint-provider";
import { lazyLoadComponent } from "@microsoft/mgt-spfx-utils";

customElementHelper.withDisambiguation("styling-mgt-components");

const StylingMGTComponent = React.lazy(
	() =>
		import(
			/* webpackChunkName: 'mgt-react-component' */
			"./components/StylingMgt"
		)
);

export interface IStylingMgtWebPartProps {
}

export default class StylingMgtWebPart extends BaseClientSideWebPart<IStylingMgtWebPartProps> {

	public render(): void {
		// Lazy load the component
		const element = lazyLoadComponent(StylingMGTComponent, {});

		ReactDom.render(element, this.domElement);
	}

	protected onInit(): Promise<void> {
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
