import * as React from 'react';
import * as ReactDom from 'react-dom';
import { Version } from '@microsoft/sp-core-library';
import {
  type IPropertyPaneConfiguration,
  PropertyPaneTextField
} from '@microsoft/sp-property-pane';
import { BaseClientSideWebPart } from '@microsoft/sp-webpart-base';

import * as strings from 'SecurityTrimmedControlSampleWebPartStrings';
import SecurityTrimmedControlSample from './components/SecurityTrimmedControlSample';
import { ISecurityTrimmedControlSampleProps } from './components/ISecurityTrimmedControlSampleProps';

export interface ISecurityTrimmedControlSampleWebPartProps {
	siteUrl: string;
	listUrl: string;
	itemId: number;
}

export default class SecurityTrimmedControlSampleWebPart extends BaseClientSideWebPart<ISecurityTrimmedControlSampleWebPartProps> {

  public render(): void {
    const element: React.ReactElement<ISecurityTrimmedControlSampleProps> = React.createElement(
      SecurityTrimmedControlSample,
      {
        siteUrl: this.properties.siteUrl,
        listUrl: this.properties.listUrl,
        itemId: this.properties.itemId,
        context: this.context,
      }
    );

    ReactDom.render(element, this.domElement);
  }

  protected onDispose(): void {
    ReactDom.unmountComponentAtNode(this.domElement);
  }

  protected get dataVersion(): Version {
    return Version.parse('1.0');
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
								PropertyPaneTextField("siteUrl", {
									label: strings.SiteUrlFieldLabel,
								}),
								PropertyPaneTextField("listUrl", {
									label: strings.ListUrlFieldLabel,
								}),
								PropertyPaneTextField("itemId", {
									label: strings.ItemIdFieldLabel,
								})
							],
						},
					],
				},
			],
		};
  }
}
