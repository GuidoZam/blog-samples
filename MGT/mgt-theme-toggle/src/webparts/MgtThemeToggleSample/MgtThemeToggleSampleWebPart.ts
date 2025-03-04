import * as React from 'react';
import * as ReactDom from 'react-dom';
import { Version } from '@microsoft/sp-core-library';
import { BaseClientSideWebPart } from '@microsoft/sp-webpart-base';
import * as strings from "MgtThemeToggleSampleWebPartStrings";

// Import the MGT required packages
import { Providers, customElementHelper } from "@microsoft/mgt-element";
import { SharePointProvider } from "@microsoft/mgt-sharepoint-provider";
import { lazyLoadComponent } from "@microsoft/mgt-spfx-utils";
import { IReadonlyTheme } from '@microsoft/sp-component-base';

// Set the disambiguation before initialization
customElementHelper.withDisambiguation("mgt-theme-toggle-sample");

// Asyncronously import the component
const CustomReactComponent = React.lazy(
	() =>
		import(
			/* webpackChunkName: 'mgt-react-component' */
			"./components/MgtThemeToggleSample"
		)
);

export interface IMgtThemeToggleSampleWebPartProps {}

export default class MgtThemeToggleSampleWebPart extends BaseClientSideWebPart<IMgtThemeToggleSampleWebPartProps> {
	public render(): void {
		// Lazy load the component
		const element = lazyLoadComponent(CustomReactComponent, {
			description: strings.Description,
			onThemeChanged: this.onThemeChanged,
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

	protected onThemeChanged(currentTheme: IReadonlyTheme | undefined): void {
		if (!currentTheme) {
			return;
		}

		const { semanticColors } = currentTheme;

		if (semanticColors) {
			this.domElement.style.setProperty(
				"--bodyText",
				semanticColors.bodyText || null
			);

			this.domElement.style.setProperty(
				"--bodyBackground",
				semanticColors.bodyBackground || null
			);
		}
	}

	protected onDispose(): void {
		ReactDom.unmountComponentAtNode(this.domElement);
	}

	protected get dataVersion(): Version {
		return Version.parse("1.0");
	}
}
