import * as React from 'react';
import * as ReactDom from 'react-dom';
import { Version } from '@microsoft/sp-core-library';
import {
  type IPropertyPaneConfiguration,
} from '@microsoft/sp-property-pane';
import { BaseClientSideWebPart } from '@microsoft/sp-webpart-base';

import * as strings from 'PnPListPickerSampleWebPartStrings';
import PnPListPickerSample from './components/PnPListPickerSample';
import { IPnPListPickerSampleProps } from './components/IPnPListPickerSampleProps';
import {
  ISPList,
	PropertyFieldListPicker,
	PropertyFieldListPickerOrderBy,
} from "@pnp/spfx-property-controls";

export interface IPnPListPickerSampleWebPartProps {
	minimal: string;
	list: string;
	lists: string[];
	selectAllInList: string[];
	orderByList: string;
	hiddenList: string;
	onErrorList: string;
	excludedList: string;
	filterList: string;
	filterByContentTypeList: string;
	onListRetrieved: string;
	extendedList: any;
}

export default class PnPListPickerSampleWebPart extends BaseClientSideWebPart<IPnPListPickerSampleWebPartProps> {

  public render(): void {
    const element: React.ReactElement<IPnPListPickerSampleProps> =
			React.createElement(PnPListPickerSample, {
				minimal: this.properties.minimal,
				list: this.properties.list,
				lists: this.properties.lists,
				orderByList: this.properties.orderByList,
				hiddenList: this.properties.hiddenList,
				onErrorList: this.properties.onErrorList,
				extendedList: this.properties.extendedList,
			});

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
								PropertyFieldListPicker("minimal", {
									label: strings.MinimalListPickerFieldLabel,
									onPropertyChange: this.onPropertyPaneFieldChanged,
									properties: this.properties,
									context: this.context,
									key: "minimalPicker",
								}),
								PropertyFieldListPicker("list", {
									label: strings.ListPickerFieldLabel,
									selectedList: this.properties.list,
									onPropertyChange: this.onPropertyPaneFieldChanged,
									properties: this.properties,
									context: this.context,
									key: "listPicker",
								}),
								PropertyFieldListPicker("hiddenList", {
									label: strings.HiddenListPickerFieldLabel,
									selectedList: this.properties.hiddenList,
									includeHidden: false,
									onPropertyChange: this.onPropertyPaneFieldChanged,
									properties: this.properties,
									context: this.context,
									key: "hiddenListPicker",
								}),
								PropertyFieldListPicker("lists", {
									label: strings.ListsPickerFieldLabel,
									selectedList: this.properties.lists,
									onPropertyChange: this.onPropertyPaneFieldChanged,
									properties: this.properties,
									context: this.context,
									includeHidden: false,
									multiSelect: true,
									key: "listsPicker",
								}),
								PropertyFieldListPicker("selectAllInList", {
									label: strings.SelectAllInListPickerFieldLabel,
									selectedList: this.properties.selectAllInList,
									onPropertyChange: this.onPropertyPaneFieldChanged,
									properties: this.properties,
									context: this.context,
									includeHidden: false,
									multiSelect: true,
									showSelectAll: true,
									selectAllInList: true,
									selectAllInListLabel: strings.SelectAllInListLabel,
									key: "selectAllInList",
								}),
								PropertyFieldListPicker("list", {
									label: strings.DisabledListPickerFieldLabel,
									selectedList: this.properties.list,
									onPropertyChange: this.onPropertyPaneFieldChanged,
									properties: this.properties,
									context: this.context,
									disabled: true,
									key: "disabledPicker",
								}),
								PropertyFieldListPicker("orderByList", {
									label: strings.OrderByListPickerFieldLabel,
									selectedList: this.properties.orderByList,
									orderBy: PropertyFieldListPickerOrderBy.Title,
									onPropertyChange: this.onPropertyPaneFieldChanged,
									properties: this.properties,
									context: this.context,
									key: "orderByListPicker",
								}),
								PropertyFieldListPicker("onErrorList", {
									label: strings.OnErrorListPickerFieldLabel,
									selectedList: this.properties.onErrorList,
									onPropertyChange: this.onPropertyPaneFieldChanged,
									properties: this.properties,
									context: this.context,
									onGetErrorMessage: (value: string) => {
										return value === undefined || value.length === 0
											? "You must select a list"
											: "";
									},
									key: "onErrorlistPicker",
								}),
								PropertyFieldListPicker("excludedList", {
									label: strings.ExcludeListPickerFieldLabel,
									selectedList: this.properties.excludedList,
									onPropertyChange: this.onPropertyPaneFieldChanged,
									properties: this.properties,
									context: this.context,
									listsToExclude: ["appdata", "appfiles"],
									key: "excludedListPicker",
								}),
								PropertyFieldListPicker("filterList", {
									label: strings.FilterListPickerFieldLabel,
									selectedList: this.properties.filterList,
									onPropertyChange: this.onPropertyPaneFieldChanged,
									properties: this.properties,
									context: this.context,
									filter: "BaseTemplate eq 100",
									key: "excludedListPicker",
								}),
								PropertyFieldListPicker("filterByContentTypeList", {
									label: strings.FilterByContentTypeListPickerFieldLabel,
									selectedList: this.properties.filterByContentTypeList,
									onPropertyChange: this.onPropertyPaneFieldChanged,
									properties: this.properties,
									context: this.context,
									contentTypeId: "0x0101",
									key: "excludedListPicker",
								}),
								PropertyFieldListPicker("onListRetrieved", {
									label: strings.OnListRetrievedListPickerFieldLabel,
									selectedList: this.properties.onListRetrieved,
									onPropertyChange: this.onPropertyPaneFieldChanged,
									properties: this.properties,
									context: this.context,
									onListsRetrieved: (lists: ISPList[]) => {
										// Perform actions with the lists before displaying them
										if (lists.length > 0) {
											lists = lists.filter(
												(list) => {
                          const baseTemplate = Number(list.BaseTemplate);
                          return baseTemplate === 101;
                        }
											);
										}

										return lists;
									},
									key: "onListRetrievedListPicker",
								}),
								PropertyFieldListPicker("extendedList", {
									label: strings.ExtendedListPickerFieldLabel,
									selectedList: this.properties.extendedList,
									onPropertyChange: this.onPropertyPaneFieldChanged,
									properties: this.properties,
									context: this.context,
									includeListTitleAndUrl: true,
									key: "extendedListPicker",
								}),
							],
						},
					],
				},
			],
		};
  }
}
