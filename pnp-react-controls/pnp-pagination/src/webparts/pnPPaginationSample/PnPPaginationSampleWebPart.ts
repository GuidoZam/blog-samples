import * as React from 'react';
import * as ReactDom from 'react-dom';
import { Version } from '@microsoft/sp-core-library';
import {
  type IPropertyPaneConfiguration,
  PropertyPaneSlider
} from '@microsoft/sp-property-pane';
import { BaseClientSideWebPart } from '@microsoft/sp-webpart-base';

import * as strings from 'PnPPaginationSampleWebPartStrings';
import PnPPaginationSample from './components/PnPPaginationSample';
import { IPnPPaginationSampleProps } from './components/IPnPPaginationSampleProps';

export interface IPnPPaginationSampleWebPartProps {
	pageSize: number;
}

export default class PnPPaginationSampleWebPart extends BaseClientSideWebPart<IPnPPaginationSampleWebPartProps> {

  public render(): void {
    const element: React.ReactElement<IPnPPaginationSampleProps> =
			React.createElement(PnPPaginationSample, {
				pageSize: isNaN(this.properties.pageSize) ? 3 : this.properties.pageSize,
			});

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
								PropertyPaneSlider("pageSize", {
									label: strings.PageSizeFieldLabel,
                  min: 3,
                  max: 20,
								}),
							],
						},
					],
				},
			],
		};
  }
}
