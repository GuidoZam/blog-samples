import * as React from 'react';
import * as ReactDom from 'react-dom';
import { Version } from '@microsoft/sp-core-library';
import { BaseClientSideWebPart } from '@microsoft/sp-webpart-base';
import { PropertyPaneTextField } from '@microsoft/sp-property-pane';
import * as strings from 'PlannerSampleWebPartStrings';
import PlannerSample from './components/PlannerSample';
import { IPlannerSampleProps } from './components/IPlannerSampleProps';
import { Providers, SharePointProvider } from "@microsoft/mgt-spfx";

export interface IPlannerSampleWebPartProps {
  groupId?: string;
}

export default class PlannerSampleWebPart extends BaseClientSideWebPart<IPlannerSampleWebPartProps> {

	public render(): void {
		const element: React.ReactElement<IPlannerSampleProps> =
			React.createElement(PlannerSample, {
        groupId: this.properties.groupId,
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

  protected getPropertyPaneConfiguration(): any {
    return {
			pages: [
				{
					groups: [
						{
							groupName: strings.BasicGroupName,
							groupFields: [
								PropertyPaneTextField("groupId", {
									label: strings.GroupIdFieldLabel,
								}),
							],
						},
					],
				},
			],
		};
  }
}
