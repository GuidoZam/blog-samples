import * as React from 'react';
import * as ReactDom from 'react-dom';
import { Version } from '@microsoft/sp-core-library';
import {
	type IPropertyPaneConfiguration,
	PropertyPaneTextField,
	PropertyPaneSlider,
} from "@microsoft/sp-property-pane";
import { BaseClientSideWebPart } from '@microsoft/sp-webpart-base';

import * as strings from 'MgtPeopleWebPartStrings';
import MgtPeople from './components/MgtPeople';
import { IMgtPeopleProps } from './components/IMgtPeopleProps';
import { Providers, SharePointProvider } from "@microsoft/mgt-spfx";

export interface IMgtPeopleWebPartProps {
	groupdId: string;
  maxPeople: number;
  queries: string;
}

export default class MgtPeopleWebPart extends BaseClientSideWebPart<IMgtPeopleWebPartProps> {

	public render(): void {
		const element: React.ReactElement<IMgtPeopleProps> = React.createElement(
			MgtPeople,
			{
				groupId: this.properties.groupdId,
        maxPeople: this.properties.maxPeople,
        queries: this.properties.queries && this.properties.queries?.length > 0 ? this.properties.queries.split(",") : []
			}
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
								PropertyPaneTextField("groupdId", {
									label: strings.GroupIdFieldLabel,
								}),
								PropertyPaneSlider("maxPeople", {
									label: strings.MaxPeopleFieldLabel,
									min: 1,
									max: 10,
									value: 6,
									showValue: true,
									step: 1,
								}),
								PropertyPaneTextField("queries", {
									label: "Queries",
								}),
							],
						},
					],
				},
			],
		};
	}
}
