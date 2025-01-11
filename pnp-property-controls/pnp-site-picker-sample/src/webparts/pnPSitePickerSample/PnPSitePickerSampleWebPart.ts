import * as React from 'react';
import * as ReactDom from 'react-dom';
import { Version } from '@microsoft/sp-core-library';
import {
  type IPropertyPaneConfiguration
} from '@microsoft/sp-property-pane';
import { BaseClientSideWebPart } from '@microsoft/sp-webpart-base';

import * as strings from 'PnPSitePickerSampleWebPartStrings';
import PnPSitePickerSample from './components/PnPSitePickerSample';
import { IPnPSitePickerSampleProps } from './components/IPnPSitePickerSampleProps';
import { PropertyFieldSitePicker } from "@pnp/spfx-property-controls";
import { IPropertyFieldSite } from "@pnp/spfx-property-controls";

export interface IPnPSitePickerSampleWebPartProps {
	minimalSitePicker: IPropertyFieldSite[];
	site: IPropertyFieldSite[];
	sites: IPropertyFieldSite[];
	disabledSite: IPropertyFieldSite[];
	errorSite: IPropertyFieldSite[];
	deferredSite: IPropertyFieldSite[];
	additionalQuerySite: IPropertyFieldSite[];
}

export default class PnPSitePickerSampleWebPart extends BaseClientSideWebPart<IPnPSitePickerSampleWebPartProps> {
	public render(): void {
		const { minimalSitePicker, site, sites } = this.properties;

		const element: React.ReactElement<IPnPSitePickerSampleProps> =
			React.createElement(PnPSitePickerSample, {
				minimalSitePicker: minimalSitePicker ? minimalSitePicker[0] : undefined,
				site: site ? site[0] : undefined,
				sites: sites,
			});

		ReactDom.render(element, this.domElement);
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
							groupName: strings.BasicGroupName,
							groupFields: [
								PropertyFieldSitePicker("minimalSitePicker", {
									label: strings.MinimalSelectSiteFieldLabel,
									initialSites: this.properties.minimalSitePicker,
									context: this.context,
									onPropertyChange: this.onPropertyPaneFieldChanged,
									properties: this.properties,
									key: "minimalSitePicker",
								}),
								PropertyFieldSitePicker("site", {
									label: strings.SelectSiteFieldLabel,
									initialSites: this.properties.site,
									context: this.context,
									multiSelect: false,
									onPropertyChange: this.onPropertyPaneFieldChanged,
									properties: this.properties,
									key: "sitePicker",
								}),
								PropertyFieldSitePicker("sites", {
									label: strings.SelectSitesFieldLabel,
									initialSites: this.properties.sites,
									context: this.context,
									multiSelect: true,
									onPropertyChange: this.onPropertyPaneFieldChanged,
									properties: this.properties,
									key: "sitesPicker",
								}),
								PropertyFieldSitePicker("disabledSite", {
									label: strings.DisabledSelectSiteFieldLabel,
									initialSites: [],
									context: this.context,
									onPropertyChange: this.onPropertyPaneFieldChanged,
									properties: this.properties,
									key: "disabledSitesPicker",
									disabled: true,
								}),
								PropertyFieldSitePicker("deferredSite", {
									label: strings.DeferredSelectSiteFieldLabel,
									initialSites: this.properties.deferredSite,
									context: this.context,
									onPropertyChange: this.onPropertyPaneFieldChanged,
									properties: this.properties,
									key: "deferredSitesPicker",
									deferredValidationTime: 2000,
								}),
								PropertyFieldSitePicker("additionalQuerySite", {
									label: strings.QuerySelectSiteFieldLabel,
									initialSites: this.properties.additionalQuerySite,
									context: this.context,
									onPropertyChange: this.onPropertyPaneFieldChanged,
									properties: this.properties,
									key: "querySitesPicker",
									additionalQuery: `Title:*site*`,
								}),
							],
						},
					],
				},
			],
		};
	}
}
