import * as React from 'react';
import * as ReactDom from 'react-dom';
import { Version } from '@microsoft/sp-core-library';
import {
	type IPropertyPaneConfiguration
} from "@microsoft/sp-property-pane";
import { BaseClientSideWebPart } from '@microsoft/sp-webpart-base';
import {
	PropertyFieldListPicker,
	PropertyFieldListPickerOrderBy,
} from "@pnp/spfx-property-controls/lib/PropertyFieldListPicker";
import * as strings from 'DynamicFormWithListSelectionWebPartStrings';
import DynamicFormWithListSelection from './components/DynamicFormWithListSelection';
import { IDynamicFormWithListSelectionProps } from './components/IDynamicFormWithListSelectionProps';

export interface IDynamicFormWithListSelectionWebPartProps {
	listId: string;
}

export default class DynamicFormWithListSelectionWebPart extends BaseClientSideWebPart<IDynamicFormWithListSelectionWebPartProps> {

  public render(): void {
    const element: React.ReactElement<IDynamicFormWithListSelectionProps> = React.createElement(
      DynamicFormWithListSelection,
      {
        context: this.context,
        listId: this.properties.listId,
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
						description: strings.PropertyPaneDescription,
					},
					groups: [
						{
							groupName: strings.BasicGroupName,
							groupFields: [
								PropertyFieldListPicker("listId", {
									label: strings.SelectListFieldLabel,
									selectedList: this.properties.listId,
									includeHidden: false,
									orderBy: PropertyFieldListPickerOrderBy.Title,
									disabled: false,
									onPropertyChange: this.onPropertyPaneFieldChanged.bind(this),
									properties: this.properties,
									context: this.context as any,
									deferredValidationTime: 0,
                  key: "listPickerFieldId",
								}),
							],
						},
					],
				},
			],
		};
  }
}
