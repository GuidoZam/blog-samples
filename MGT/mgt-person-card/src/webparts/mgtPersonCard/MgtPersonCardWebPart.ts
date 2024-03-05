import * as React from 'react';
import * as ReactDom from 'react-dom';
import { Version } from '@microsoft/sp-core-library';
import {
  type IPropertyPaneConfiguration,
  PropertyPaneToggle
} from '@microsoft/sp-property-pane';
import { BaseClientSideWebPart } from '@microsoft/sp-webpart-base';

import * as strings from 'MgtPersonCardWebPartStrings';
import MgtPersonCard from './components/MgtPersonCard';
import { IMgtPersonCardProps } from './components/IMgtPersonCardProps';

import { Providers, SharePointProvider } from "@microsoft/mgt-spfx";

export interface IMgtPersonCardWebPartProps {
	useContactApis: boolean;
	sectionFiles: boolean;
	sectionMailMessages: boolean;
	sectionOrganization: boolean;
	sectionProfile: boolean;
}

export default class MgtPersonCardWebPart extends BaseClientSideWebPart<IMgtPersonCardWebPartProps> {

	public render(): void {
		const element: React.ReactElement<IMgtPersonCardProps> =
			React.createElement(MgtPersonCard, {
        useContactApis: this.properties.useContactApis,
        sectionFiles: this.properties.sectionFiles,
        sectionMailMessages: this.properties.sectionMailMessages,
        sectionOrganization: this.properties.sectionOrganization,
        sectionProfile: this.properties.sectionProfile,
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
							groupName: strings.BasicGroupName,
							groupFields: [
								PropertyPaneToggle("useContactApis", {
									label: strings.UseContactApiFieldLabel,
								}),
								PropertyPaneToggle("sectionFiles", {
									label: strings.SectionProfileFieldLabel,
								}),
								PropertyPaneToggle("sectionMailMessages", {
									label: strings.SectionOrganizationFieldLabel,
								}),
								PropertyPaneToggle("sectionOrganization", {
									label: strings.SectionMailMessagesFieldLabel,
								}),
								PropertyPaneToggle("sectionProfile", {
									label: strings.SectionFilesFieldLabel,
								}),
							],
						},
					],
				},
			],
		};
	}
}
