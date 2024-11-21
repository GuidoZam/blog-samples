import * as React from 'react';
import * as ReactDom from 'react-dom';
import { Version } from '@microsoft/sp-core-library';
import {
  type IPropertyPaneConfiguration,
  PropertyPaneToggle
} from '@microsoft/sp-property-pane';
import { BaseClientSideWebPart } from '@microsoft/sp-webpart-base';
import { IReadonlyTheme } from '@microsoft/sp-component-base';

import * as strings from 'PnPPlaceholderControlWebPartStrings';
import PnPPlaceholderControl from './components/PnPPlaceholderControl';
import { IPnPPlaceholderControlProps } from './components/IPnPPlaceholderControlProps';

export interface IPnPPlaceholderControlWebPartProps {
  sampleToggle: boolean;
}

export default class PnPPlaceholderControlWebPart extends BaseClientSideWebPart<IPnPPlaceholderControlWebPartProps> {

  public render(): void {
    const element: React.ReactElement<IPnPPlaceholderControlProps> = React.createElement(
      PnPPlaceholderControl,
      {
        context: this.context,
        displayMode: this.displayMode,
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
            description: strings.PropertyPaneDescription
          },
          groups: [
            {
              groupName: strings.BasicGroupName,
              groupFields: [
                PropertyPaneToggle('sampleToggle', {
                  label: strings.SampleToggleFieldLabel
                })
              ]
            }
          ]
        }
      ]
    };
  }
}
