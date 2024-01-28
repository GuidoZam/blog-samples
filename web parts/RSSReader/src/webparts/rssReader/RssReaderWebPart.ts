import * as React from 'react';
import * as ReactDom from 'react-dom';
import { Version } from '@microsoft/sp-core-library';
import {
  type IPropertyPaneConfiguration,
  PropertyPaneTextField,
  PropertyPaneSlider
} from '@microsoft/sp-property-pane';
import { BaseClientSideWebPart } from '@microsoft/sp-webpart-base';
import { IReadonlyTheme } from '@microsoft/sp-component-base';

import * as strings from 'RssReaderWebPartStrings';
import RssReader from './components/RssReader';
import { IRssReaderProps } from './components/IRssReaderProps';

export interface IRssReaderWebPartProps {
	rssUrl: string;
	maxItemCount: number;
}

export default class RssReaderWebPart extends BaseClientSideWebPart<IRssReaderWebPartProps> {

  public render(): void {
    const element: React.ReactElement<IRssReaderProps> = React.createElement(
			RssReader,
			{
				rssUrl: this.properties.rssUrl,
        maxItemCount: this.properties.maxItemCount,
			}
		);

    ReactDom.render(element, this.domElement);
  }

  protected onThemeChanged(currentTheme: IReadonlyTheme | undefined): void {
    if (!currentTheme) {
      return;
    }

    const {
      semanticColors
    } = currentTheme;

    if (semanticColors) {
      this.domElement.style.setProperty('--bodyText', semanticColors.bodyText || null);
      this.domElement.style.setProperty('--link', semanticColors.link || null);
      this.domElement.style.setProperty('--linkHovered', semanticColors.linkHovered || null);
      this.domElement.style.setProperty('--errorText', semanticColors.errorText || null);
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
								PropertyPaneTextField("rssUrl", {
									label: strings.RSSUrlFieldLabel,
								}),
								PropertyPaneSlider("maxItemCount", {
									label: strings.MaxItemCountFieldLabel,
                  min: 3,
                  max: 10,
								}),
							],
						},
					],
				},
			],
		};
  }
}
