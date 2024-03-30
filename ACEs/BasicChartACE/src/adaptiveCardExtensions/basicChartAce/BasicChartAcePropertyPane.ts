import { IPropertyPaneConfiguration, PropertyPaneDropdown, PropertyPaneSlider, PropertyPaneTextField } from '@microsoft/sp-property-pane';
import * as strings from 'BasicChartAceAdaptiveCardExtensionStrings';

export class BasicChartAcePropertyPane {
  public getPropertyPaneConfiguration(): IPropertyPaneConfiguration {
    return {
			pages: [
				{
					header: { description: strings.APIGroupName },
					groups: [
						{
							groupFields: [
								PropertyPaneTextField("apiKey", {
									label: strings.APIKeyFieldLabel,
								}),
								PropertyPaneTextField("symbols", {
									label: strings.SymbolsFieldLabel,
								}),
								PropertyPaneSlider("interval", {
									label: strings.IntervalFieldLabel,
									min: 5,
									max: 60,
									step: 5,
									showValue: true,
								}),
                PropertyPaneDropdown("valueToShow", {
                  label: strings.ValueToShowFieldLabel,
                  options: [
                    { key: "1. open", text: strings.Open },
                    { key: "2. high", text: strings.High },
                    { key: "3. low", text: strings.Low },
                    { key: "4. close", text: strings.Close },
                    { key: "5. volume", text: strings.Volume },
                  ],
                })
							],
						},
					],
				},
			],
		};
  }
}
