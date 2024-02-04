import * as React from 'react';
import * as ReactDom from 'react-dom';
import { Version } from '@microsoft/sp-core-library';
import {
  PropertyPaneCheckbox,
  type IPropertyPaneConfiguration,
  PropertyPaneSlider
} from '@microsoft/sp-property-pane';
import { BaseClientSideWebPart } from '@microsoft/sp-webpart-base';

import * as strings from 'MgtAgendaWebPartStrings';
import MgtAgenda from './components/MgtAgenda';
import { IMgtAgendaProps } from './components/IMgtAgendaProps';
import { Providers, SharePointProvider } from "@microsoft/mgt-spfx";

export interface IMgtAgendaWebPartProps {
	groupByDay?: boolean;
	showMaxDays?: number;
}

export default class MgtAgendaWebPart extends BaseClientSideWebPart<IMgtAgendaWebPartProps> {

	public render(): void {
		const element: React.ReactElement<IMgtAgendaProps> = React.createElement(
			MgtAgenda,
			{
        groupByDay: this.properties.groupByDay,
        showMaxDays: this.properties.showMaxDays ?? 1
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
                PropertyPaneCheckbox('groupByDay', {
                  text: strings.GroupByDayFieldLabel,
                  checked: this.properties.groupByDay === true
                }),
                PropertyPaneSlider('showMaxDays', {
                  label: strings.ShowMaxDaysFieldLabel,
                  value: this.properties.showMaxDays,
                  min: 1,
                  max: 30,
                  step: 1,
                })
							],
						},
					],
				},
			],
		};
	}
}
