import * as React from 'react';
import * as ReactDom from 'react-dom';
import { Version } from '@microsoft/sp-core-library';
import {
  type IPropertyPaneConfiguration,
  PropertyPaneTextField
} from '@microsoft/sp-property-pane';
import { BaseClientSideWebPart } from '@microsoft/sp-webpart-base';

import * as strings from 'SoFlexibleWebPartStrings';
import SoFlexible from './components/SoFlexible';
import { ISoFlexibleProps } from './components/ISoFlexibleProps';

export interface ISoFlexibleWebPartProps {
  description: string;
}

export default class SoFlexibleWebPart extends BaseClientSideWebPart<ISoFlexibleWebPartProps> {

  public render(): void {
    const element: React.ReactElement<ISoFlexibleProps> = React.createElement(
      SoFlexible,
      {
        description: this.properties.description
      }
    );

    ReactDom.render(element, this.domElement);
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
            description: strings.PropertyPaneDescription
          },
          groups: [
            {
              groupName: strings.BasicGroupName,
              groupFields: [
                PropertyPaneTextField('description', {
                  label: strings.DescriptionFieldLabel
                })
              ]
            }
          ]
        }
      ]
    };
  }
}
