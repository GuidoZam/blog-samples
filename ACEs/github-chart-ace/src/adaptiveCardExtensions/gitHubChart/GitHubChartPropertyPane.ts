import { IPropertyPaneConfiguration, PropertyPaneTextField, PropertyPaneDropdown } from '@microsoft/sp-property-pane';
import * as strings from 'GitHubChartAdaptiveCardExtensionStrings';

export class GitHubChartPropertyPane {
  public getPropertyPaneConfiguration(): IPropertyPaneConfiguration {
    return {
			pages: [
				{
					header: { description: strings.SettingsPaneDescription },
					groups: [
						{
							groupFields: [
								PropertyPaneDropdown("chartType", {
									label: strings.ChartTypeFieldLabel,
									options: [
										{ key: "bar", text: strings.ChartTypeFieldOptions.Bar },
										{ key: "pie", text: strings.ChartTypeFieldOptions.Pie },
										{ key: "donut", text: strings.ChartTypeFieldOptions.Donut },
										{ key: "line", text: strings.ChartTypeFieldOptions.Line },
									],
								}),
							],
						},
					],
				},
				{
					header: { description: strings.SecurityPageDescription },
					groups: [
						{
							groupFields: [
								PropertyPaneTextField("apiKey", {
									label: strings.APIKeyFieldLabel,
								}),
							],
						},
					],
				},
			],
		};
  }
}
