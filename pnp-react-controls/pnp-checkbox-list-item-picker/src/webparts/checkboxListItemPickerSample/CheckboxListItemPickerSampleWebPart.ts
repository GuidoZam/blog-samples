import * as React from 'react';
import * as ReactDom from 'react-dom';
import { Version } from '@microsoft/sp-core-library';
import {
  type IPropertyPaneConfiguration
} from '@microsoft/sp-property-pane';
import { BaseClientSideWebPart } from '@microsoft/sp-webpart-base';
import { PropertyFieldListPicker, PropertyFieldListPickerOrderBy } from '@pnp/spfx-property-controls/lib/PropertyFieldListPicker';

import * as strings from 'CheckboxListItemPickerSampleWebPartStrings';
import CheckboxListItemPickerSample from './components/CheckboxListItemPickerSample';
import { ICheckboxListItemPickerSampleProps } from './components/ICheckboxListItemPickerSampleProps';

export interface ICheckboxListItemPickerSampleWebPartProps {
  listId: string;
}

export default class CheckboxListItemPickerSampleWebPart extends BaseClientSideWebPart<ICheckboxListItemPickerSampleWebPartProps> {

  public render(): void {
    const element: React.ReactElement<ICheckboxListItemPickerSampleProps> = React.createElement(
      CheckboxListItemPickerSample,
      {
        context: this.context,
        listId: this.properties.listId,
        strings: strings
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
                PropertyFieldListPicker('listId', {
                  label: strings.ListPickerLabel,
                  selectedList: this.properties.listId,
                  includeHidden: false,
                  orderBy: PropertyFieldListPickerOrderBy.Title,
                  disabled: false,
                  onPropertyChange: this.onPropertyPaneFieldChanged.bind(this),
                  properties: this.properties,
                  context: this.context as any,
                  key: 'listPickerFieldId'
                })
              ]
            }
          ]
        }
      ]
    };
  }
}
