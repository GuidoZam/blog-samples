import * as React from 'react';
import * as ReactDom from 'react-dom';
import { Version } from '@microsoft/sp-core-library';
import {
  type IPropertyPaneConfiguration,
  PropertyPaneTextField
} from '@microsoft/sp-property-pane';
import { BaseClientSideWebPart } from '@microsoft/sp-webpart-base';

import * as strings from 'MgtFileWebPartStrings';
import MgtFile from './components/MgtFile';
import { IMgtFileProps } from './components/IMgtFileProps';
import { Providers, SharePointProvider } from "@microsoft/mgt-spfx";

export interface IMgtFileWebPartProps {
  itemId: string;
}

export default class MgtFileWebPart extends BaseClientSideWebPart<IMgtFileWebPartProps> {

  public render(): void {
    const element: React.ReactElement<IMgtFileProps> = React.createElement(
      MgtFile,
      {
        itemId: this.properties.itemId,
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
								PropertyPaneTextField("itemId", {
									label: strings.ItemIdFieldLabel,
								}),
							],
						},
					],
				},
			],
		};
  }
}
