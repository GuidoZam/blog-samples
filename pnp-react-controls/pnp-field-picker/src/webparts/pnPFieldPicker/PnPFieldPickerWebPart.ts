import * as React from 'react';
import * as ReactDom from 'react-dom';
import { Version } from '@microsoft/sp-core-library';
import { BaseClientSideWebPart } from '@microsoft/sp-webpart-base';
import PnPFieldPicker from './components/PnPFieldPicker';
import { IPnPFieldPickerProps } from './components/IPnPFieldPickerProps';
import { PropertyFieldListPicker, PropertyFieldListPickerOrderBy } from '@pnp/spfx-property-controls/lib/PropertyFieldListPicker';
import * as strings from 'PnPFieldPickerWebPartStrings';

export interface IPnPFieldPickerWebPartProps {
  selectedList?: string;
}

export default class PnPFieldPickerWebPart extends BaseClientSideWebPart<IPnPFieldPickerWebPartProps> {

  public render(): void {
    const element: React.ReactElement<IPnPFieldPickerProps> = React.createElement(
      PnPFieldPicker,
      {
        context: this.context,
        selectedList: this.properties.selectedList
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

  protected getPropertyPaneConfiguration(): any {
    return {
			pages: [
				{
					header: {
						description: strings.PropertyPane.Description,
					},
					groups: [
						{
							groupName: strings.PropertyPane.GroupName,
							groupFields: [
								PropertyFieldListPicker('selectedList', {
                  label: strings.PropertyPane.ListPickerLabel,
                  selectedList: this.properties.selectedList,
                  orderBy: PropertyFieldListPickerOrderBy.Title,
                  onPropertyChange: this.onPropertyPaneFieldChanged.bind(this),
                  properties: this.properties,
                  context: this.context,
                  key: 'listPickerFieldId'
                })
              ]
            }
					],
				},
			],
		};
  }
}
