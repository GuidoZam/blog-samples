import { IPropertyPaneConfiguration, PropertyPaneTextField } from '@microsoft/sp-property-pane';
import * as strings from 'HelloWorldAdaptiveCardExtensionStrings';

/**
 * This class lets you define the properties you want to expose in the property pane. 
 **/
export class HelloWorldPropertyPane {
  public getPropertyPaneConfiguration(): IPropertyPaneConfiguration {
    return {
      pages: [
        {
          // This is the display name for the property pane
          header: { description: strings.PropertyPaneDescription },
          groups: [
            {
              groupFields: [
                // You can use the PropertyPaneTextField to allow the user to enter a piece of text (e.g. a text or an URL)
                PropertyPaneTextField('title', {
                  label: strings.TitleFieldLabel
                }),
                /* Other property pane fields can be added here, some of the available fields are:
                  - PropertyPaneDropdown
                  - PropertyPaneCheckbox
                  - PropertyPaneButton
                */
              ]
            }
          ]
        }
      ]
    };
  }
}
