import { IPropertyPaneConfiguration, PropertyPaneSlider, PropertyPaneTextField } from '@microsoft/sp-property-pane';
import * as strings from 'RssFeedReaderAdaptiveCardExtensionStrings';
import {
	MAX_RSS_ITEMS_COUNT,
	MIN_RSS_ITEMS_COUNT,
} from "./RssFeedReaderAdaptiveCardExtension";

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
									min: MIN_RSS_ITEMS_COUNT,
									max: MAX_RSS_ITEMS_COUNT,
								}),
							],
						},
					],
				},
			],
		};
  }
}
