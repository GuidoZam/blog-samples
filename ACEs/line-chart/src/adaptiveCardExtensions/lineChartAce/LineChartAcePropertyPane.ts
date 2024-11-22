import { IPropertyPaneConfiguration, PropertyPaneTextField, PropertyPaneToggle } from '@microsoft/sp-property-pane';
import * as strings from 'LineChartAceAdaptiveCardExtensionStrings';

export class LineChartAcePropertyPane {
  public getPropertyPaneConfiguration(): IPropertyPaneConfiguration {
    return {
      pages: [
        {
          header: { description: strings.PropertyPaneDescription },
          groups: [
            {
              groupFields: [
                PropertyPaneTextField('title', {
                  label: strings.TitleFieldLabel
                }),
                PropertyPaneToggle('showMultipleData', {
                  label: strings.ShowMultipleDataFieldLabel
                }),
              ]
            }
          ]
        }
      ]
    };
  }
}
