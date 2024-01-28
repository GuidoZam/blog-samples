import { IPropertyPaneConfiguration, PropertyPaneSlider, PropertyPaneTextField } from '@microsoft/sp-property-pane';
import * as strings from 'RssFeedReaderAdaptiveCardExtensionStrings';

export class RssFeedReaderPropertyPane {
  public getPropertyPaneConfiguration(): IPropertyPaneConfiguration {
    return {
			pages: [
				{
					header: { description: strings.PropertyPaneDescription },
					groups: [
						{
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
