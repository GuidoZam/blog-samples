import { IPropertyPaneConfiguration, PropertyPaneDropdown, PropertyPaneTextField } from '@microsoft/sp-property-pane';
import * as strings from 'AceWithMediaActionAdaptiveCardExtensionStrings';

export class AceWithMediaActionPropertyPane {
  public getPropertyPaneConfiguration(): IPropertyPaneConfiguration {
    return {
			pages: [
				{
					header: { description: strings.PropertyPaneDescription },
					groups: [
						{
							groupFields: [
								PropertyPaneTextField("title", {
									label: strings.TitleFieldLabel,
								}),
								PropertyPaneDropdown("mediaType", {
									label: strings.MediaTypeFieldLabel,
									options: [
										{
											key: "Image",
											text: "Image",
										},
										{
											key: "Audio",
											text: "Audio",
										},
										{
											key: "Document",
											text: "Document",
										},
									],
								}),
							],
						},
					],
				},
			],
		};
  }
}
