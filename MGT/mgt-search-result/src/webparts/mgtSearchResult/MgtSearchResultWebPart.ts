import * as React from 'react';
import * as ReactDom from 'react-dom';
import { Version } from '@microsoft/sp-core-library';
import { BaseClientSideWebPart } from '@microsoft/sp-webpart-base';
import * as strings from "MgtSearchResultWebPartStrings";
import MgtSearchResult from './components/MgtSearchResult';
import { IMgtSearchResultProps } from './components/IMgtSearchResultProps';
import { Providers, SharePointProvider } from "@microsoft/mgt-spfx";
import { IPropertyPaneConfiguration, PropertyPaneSlider } from '@microsoft/sp-property-pane';

export interface IMgtSearchResultWebPartProps {
	maxResultCount?: number;
	maxAvailablePagination?: number;
}

export default class MgtSearchResultWebPart extends BaseClientSideWebPart<IMgtSearchResultWebPartProps> {
	public render(): void {
		const element: React.ReactElement<IMgtSearchResultProps> =
			React.createElement(MgtSearchResult, {
				maxResultCount: this.properties.maxResultCount,
				maxAvailablePagination: this.properties.maxAvailablePagination,
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

	protected getPropertyPaneConfiguration(): IPropertyPaneConfiguration {
		return {
			pages: [
				{
					header: {
						description: strings.PropertyPaneDescription,
					},
					groups: [
						{
							groupName: strings.SettingsGroupName,
							groupFields: [
								PropertyPaneSlider("maxResultCount", {
									label: strings.MaxResultCountLabel,
									min: 3,
									max: 10,
								}),
								PropertyPaneSlider("maxAvailablePagination", {
									label: strings.MaxAvailablePaginationLabel,
									min: 3,
									max: 7,
								}),
							],
						},
					],
				},
			],
		};
	}
}
