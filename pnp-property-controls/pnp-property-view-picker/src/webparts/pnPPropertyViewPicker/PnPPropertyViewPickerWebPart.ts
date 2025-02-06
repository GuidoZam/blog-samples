import * as React from 'react';
import * as ReactDom from 'react-dom';
import { Version } from '@microsoft/sp-core-library';
import {
  type IPropertyPaneConfiguration
} from '@microsoft/sp-property-pane';
import { BaseClientSideWebPart } from '@microsoft/sp-webpart-base';

import * as strings from 'PnPPropertyViewPickerWebPartStrings';
import PnPPropertyViewPicker from './components/PnPPropertyViewPicker';
import { IPnPPropertyViewPickerProps } from './components/IPnPPropertyViewPickerProps';
import {
	PropertyFieldListPicker,
	PropertyFieldListPickerOrderBy,
} from "@pnp/spfx-property-controls/lib/PropertyFieldListPicker";
import {
	PropertyFieldViewPicker,
	PropertyFieldViewPickerOrderBy,
} from "@pnp/spfx-property-controls/lib/PropertyFieldViewPicker";

export interface IPnPPropertyViewPickerWebPartProps {
	list: string;
	selectedView: string;
	disabledView: string;
	orderByView: string;
	excludedView: string;
	filterView: string;
	onViewsRetrieved: string;
	onGetErrorMessage: string;
}

export default class PnPPropertyViewPickerWebPart extends BaseClientSideWebPart<IPnPPropertyViewPickerWebPartProps> {

  public render(): void {
    const element: React.ReactElement<IPnPPropertyViewPickerProps> =
			React.createElement(PnPPropertyViewPicker, {
				selectedView: this.properties.selectedView,
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
						description: strings.ListPaneDescription,
					},
					groups: [
						{
							groupName: strings.ListGroupName,
							groupFields: [
								PropertyFieldListPicker("list", {
									label: strings.ListPickerFieldLabel,
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
						description: strings.ViewsPaneDescription,
					},
					groups: [
						{
							groupName: strings.ViewGroupName,
							groupFields: [
								PropertyFieldViewPicker("minimalView", {
									label: strings.MinimalViewPickerFieldLabel,
									listId: this.properties.list,
									onPropertyChange: this.onPropertyPaneFieldChanged.bind(this),
									properties: this.properties,
									context: this.context,
									key: "minimalViewPickerFieldId",
								}),
								PropertyFieldViewPicker("selectedView", {
									label: strings.SelectedViewPickerFieldLabel,
									listId: this.properties.list,
									selectedView: this.properties.selectedView,
									onPropertyChange: this.onPropertyPaneFieldChanged.bind(this),
									properties: this.properties,
									context: this.context,
									key: "selectedViewPickerFieldId",
								}),
								PropertyFieldViewPicker("disabledView", {
									label: strings.DisabledViewPickerFieldLabel,
									listId: this.properties.list,
									selectedView: this.properties.disabledView,
									disabled: true,
									onPropertyChange: this.onPropertyPaneFieldChanged.bind(this),
									properties: this.properties,
									context: this.context,
									key: "disabledViewPickerFieldId",
								}),
								PropertyFieldViewPicker("orderByView", {
									label: strings.OrderByViewPickerFieldLabel,
									listId: this.properties.list,
									selectedView: this.properties.orderByView,
									orderBy: PropertyFieldViewPickerOrderBy.Title,
									onPropertyChange: this.onPropertyPaneFieldChanged.bind(this),
									properties: this.properties,
									context: this.context,
									key: "orderByViewPickerFieldId",
								}),
								PropertyFieldViewPicker("excludedView", {
									label: strings.ExcludedViewPickerFieldLabel,
									listId: this.properties.list,
									selectedView: this.properties.excludedView,
									onPropertyChange: this.onPropertyPaneFieldChanged.bind(this),
									properties: this.properties,
									context: this.context,
									viewsToExclude: ["All Items"],
									key: "excludedViewPickerFieldId",
								}),
								PropertyFieldViewPicker("filterView", {
									label: strings.FilterViewPickerFieldLabel,
									listId: this.properties.list,
									selectedView: this.properties.filterView,
									onPropertyChange: this.onPropertyPaneFieldChanged.bind(this),
									properties: this.properties,
									context: this.context,
									filter: "Title ne 'All Items' and Title ne 'Private view'",
									key: "filterViewPickerFieldId",
								}),
								PropertyFieldViewPicker("onViewsRetrieved", {
									label: strings.OnViewsRetrievedPickerFieldLabel,
									listId: this.properties.list,
									selectedView: this.properties.onViewsRetrieved,
									onPropertyChange: this.onPropertyPaneFieldChanged.bind(this),
									properties: this.properties,
									context: this.context,
									onViewsRetrieved: (views) => {
										console.log(views);
										return views;
									},
									key: "viewPickerFieldId",
								}),
								PropertyFieldViewPicker("onGetErrorMessage", {
									label: strings.OnGetErrorMessagePickerFieldLabel,
									listId: this.properties.list,
									selectedView: this.properties.onGetErrorMessage,
									onPropertyChange: this.onPropertyPaneFieldChanged.bind(this),
									properties: this.properties,
									context: this.context,
									onGetErrorMessage: (view) => {
										console.log(view);
										if (view === "All Items") {
											return "You cannot select the All Items view";
										}
										return "";
									},
									key: "viewPickerFieldId",
								}),
							],
						},
					],
				},
			],
		};
  }
}
