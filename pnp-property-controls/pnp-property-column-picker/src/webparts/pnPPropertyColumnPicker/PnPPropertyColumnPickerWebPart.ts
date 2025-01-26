import * as React from 'react';
import * as ReactDom from 'react-dom';
import { Version } from '@microsoft/sp-core-library';
import {
  type IPropertyPaneConfiguration,
} from '@microsoft/sp-property-pane';
import { BaseClientSideWebPart } from '@microsoft/sp-webpart-base';

import * as strings from 'PnPPropertyColumnPickerWebPartStrings';
import {
	PropertyFieldListPicker,
	PropertyFieldListPickerOrderBy,
} from "@pnp/spfx-property-controls/lib/PropertyFieldListPicker";
import PnPPropertyColumnPicker from './components/PnPPropertyColumnPicker';
import { IPnPPropertyColumnPickerProps } from './components/IPnPPropertyColumnPickerProps';
import {
  IColumnReturnProperty,
	IPropertyFieldRenderOption,
	PropertyFieldColumnPicker,
	PropertyFieldColumnPickerOrderBy,
} from "@pnp/spfx-property-controls";

export interface IPnPPropertyColumnPickerWebPartProps {
	list: string;
	column: string;
	multiColumn: string;
	multiColumnChoiceGroup: string;
	onErrorColumn: string;
	orderByColumn: string;
	columnReturnProperty: string;
	deferredColumn: string;
}

export default class PnPPropertyColumnPickerWebPart extends BaseClientSideWebPart<IPnPPropertyColumnPickerWebPartProps> {

  public render(): void {
    const element: React.ReactElement<IPnPPropertyColumnPickerProps> = React.createElement(
      PnPPropertyColumnPicker,
      {
        column: this.properties.column,
        multiColumn: this.properties.multiColumn,
        multiColumnChoiceGroup: this.properties.multiColumnChoiceGroup,
        onErrorColumn: this.properties.onErrorColumn,
        orderByColumn: this.properties.orderByColumn,
        columnReturnProperty: this.properties.columnReturnProperty,
        deferredColumn: this.properties.deferredColumn,
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
						description: strings.ConfigurationPropertyPaneDescription,
					},
					groups: [
						{
							groupName: strings.ConfigurationGroupName,
							groupFields: [
								PropertyFieldListPicker("list", {
									label: "Select a list",
									selectedList: this.properties.list,
									includeHidden: false,
									orderBy: PropertyFieldListPickerOrderBy.Title,
									onPropertyChange: this.onPropertyPaneFieldChanged.bind(this),
									properties: this.properties,
									context: this.context,
									key: "listPickerFieldId",
								}),
							],
						},
					],
				},
				{
					header: {
						description: strings.ColumnsPropertyPaneDescription,
					},
					groups: [
						{
							groupName: strings.ColumnsGroupName,
							groupFields: [
								PropertyFieldColumnPicker("column", {
									label: strings.MinimalInstance,
									context: this.context,
									selectedColumn: this.properties.column,
									listId: this.properties.list,
									onPropertyChange: this.onPropertyPaneFieldChanged.bind(this),
									properties: this.properties,
									key: "minimalColumnPickerFieldId",
								}),
								PropertyFieldColumnPicker("column", {
									label: strings.DisabledInstance,
									context: this.context,
									selectedColumn: this.properties.column,
									listId: this.properties.list,
									disabled: true,
									onPropertyChange: this.onPropertyPaneFieldChanged.bind(this),
									properties: this.properties,
									key: "disabledColumnPickerFieldId",
								}),
								PropertyFieldColumnPicker("onErrorColumn", {
									label: strings.OnErrorInstance,
									context: this.context,
									selectedColumn: this.properties.onErrorColumn,
									listId: this.properties.list,
									onPropertyChange: this.onPropertyPaneFieldChanged.bind(this),
									properties: this.properties,
									onGetErrorMessage: (value: string) => {
										return value === "Title" ? "Title is not allowed" : "";
									},
									key: "onErrorColumnPickerFieldId",
								}),
								PropertyFieldColumnPicker("orderByColumn", {
									label: strings.OrderByInstance,
									context: this.context,
									selectedColumn: this.properties.orderByColumn,
									listId: this.properties.list,
									orderBy: PropertyFieldColumnPickerOrderBy.Id,
									onPropertyChange: this.onPropertyPaneFieldChanged.bind(this),
									properties: this.properties,
									key: "orderByColumnPickerFieldId",
								}),
								PropertyFieldColumnPicker("deferredColumn", {
									label: strings.DeferredInstance,
									context: this.context,
									selectedColumn: this.properties.deferredColumn,
									listId: this.properties.list,
									onPropertyChange: this.onPropertyPaneFieldChanged.bind(this),
									properties: this.properties,
									deferredValidationTime: 1000,
									key: "deferredColumnPickerFieldId",
								}),
								PropertyFieldColumnPicker("columnReturnProperty", {
									label: strings.ReturnPropertyInstance,
									context: this.context,
									selectedColumn: this.properties.columnReturnProperty,
									listId: this.properties.list,
									onPropertyChange: this.onPropertyPaneFieldChanged.bind(this),
									properties: this.properties,
									key: "returnPropertyColumnPickerFieldId",
									columnReturnProperty: IColumnReturnProperty["Internal Name"],
								}),
								PropertyFieldColumnPicker("multiColumn", {
									label: strings.MultiColumnInstance,
									context: this.context,
									selectedColumn: this.properties.multiColumn,
									listId: this.properties.list,
									orderBy: PropertyFieldColumnPickerOrderBy.Title,
									onPropertyChange: this.onPropertyPaneFieldChanged.bind(this),
									properties: this.properties,
									key: "multiColumnPickerFieldId",
									multiSelect: true,
								}),
								PropertyFieldColumnPicker("multiColumnChoiceGroup", {
									label: strings.MultiColumnChoiceInstance,
									context: this.context,
									selectedColumn: this.properties.multiColumnChoiceGroup,
									listId: this.properties.list,
									onPropertyChange: this.onPropertyPaneFieldChanged.bind(this),
									properties: this.properties,
									key: "multiColumnChoicePickerFieldId",
									multiSelect: true,
									renderFieldAs: IPropertyFieldRenderOption["Choice Group"],
								}),
								PropertyFieldColumnPicker("showHiddenColumn", {
									label: strings.ShowHiddenColumnsInstance,
									context: this.context,
									selectedColumn: this.properties.column,
									listId: this.properties.list,
									onPropertyChange: this.onPropertyPaneFieldChanged.bind(this),
									properties: this.properties,
									displayHiddenColumns: true,
									key: "showHiddenColumnPickerFieldId",
								}),
							],
						},
					],
				},
			],
		};
  }
}
