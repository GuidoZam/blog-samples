import { IPropertyPaneConfiguration, PropertyPaneToggle } from '@microsoft/sp-property-pane';
import * as strings from 'PieChartAceAdaptiveCardExtensionStrings';

export class PieChartAcePropertyPane {
  public getPropertyPaneConfiguration(): IPropertyPaneConfiguration {
    return {
			pages: [
				{
					header: { description: strings.PropertyPaneDescription },
					groups: [
						{
							groupFields: [
								PropertyPaneToggle("isDonut", {
									label: strings.IsDonutFieldLabel,
								}),
								PropertyPaneToggle("highlightTopThree", {
									label: strings.HighlightTopThreeFieldLabel,
								}),
							],
						},
					],
				},
			],
		};
  }
}
