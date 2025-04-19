import * as React from 'react';
import * as ReactDom from 'react-dom';
import { Version } from '@microsoft/sp-core-library';
import {
  type IPropertyPaneConfiguration,
  PropertyPaneToggle
} from '@microsoft/sp-property-pane';
import { BaseClientSideWebPart } from '@microsoft/sp-webpart-base';
import {
	PropertyFieldGrid
} from "@pnp/spfx-property-controls/lib/propertyFields/propertyFieldGrid";
import { DocumentBulletListRegular } from '@fluentui/react-icons';
import { IItem } from "@pnp/spfx-property-controls/lib/propertyFields/propertyFieldGrid/grid/IItem";

import * as strings from 'PropertyGridSampleWebPartStrings';
import PropertyGridSample from './components/PropertyGridSample';
import { IPropertyGridSampleProps } from './components/IPropertyGridSampleProps';

export interface IPropertyGridSampleWebPartProps {
  items: IItem[];
  showGrid: boolean;
  enableMultiSelection: boolean;
}

export default class PropertyGridSampleWebPart extends BaseClientSideWebPart<IPropertyGridSampleWebPartProps> {
	public render(): void {
		const element: React.ReactElement<IPropertyGridSampleProps> =
			React.createElement(PropertyGridSample, {
				items: this.properties.items,
			});

		ReactDom.render(element, this.domElement);
	}

  protected onPropertyPaneFieldChanged(propertyPath: string, oldValue: any, newValue: any): void {
    console.log("onPropertyPaneFieldChanged", propertyPath, oldValue, newValue);
    if (propertyPath === "enableMultiSelection" && newValue === false) {
      
      this.properties.items = [];
      // Force the property pane to refresh to refresh
      // the selected items in the grid. If there are multiple
      // selected items those should be removed when switching
      // to single selection mode.
      this.context.propertyPane.close();
      this.context.propertyPane.open();
    }
    super.onPropertyPaneFieldChanged(propertyPath, oldValue, newValue);
  }

	protected onDispose(): void {
		ReactDom.unmountComponentAtNode(this.domElement);
	}

	protected get dataVersion(): Version {
		return Version.parse("1.0");
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
							groupName: strings.GridSettingsGroupName,
							groupFields: [
								PropertyPaneToggle("showGrid", {
									label: strings.ShowGridLabel,
									key: "showGrid",
									checked: this.properties.showGrid ?? true,
									onText: strings.ShowGridOnText,
									offText: strings.ShowGridOffText,
								}),
								PropertyPaneToggle("enableMultiSelection", {
									label: strings.EnableMultiSelectionLabel,
									key: "enableMultiSelection",
									checked: this.properties.enableMultiSelection ?? false,
									onText: strings.EnableMultiSelectionOnText,
									offText: strings.EnableMultiSelectionOffText,
								}),
							],
						},
						{
							groupName: strings.GridGroupName,
							groupFields: [
								PropertyFieldGrid("items", {
									multiSelect: this.properties.enableMultiSelection ?? false,
									items: this._getItems(),
									label: strings.GridFieldLabel,
									key: "gridFieldId",
									defaultSelectedItems: this.properties.items,
									maxHeight: 500,
									className: "gridClass",
									styles: { padding: 10 },
									isVisible: this.properties.showGrid ?? true,
									column1Label: "File",
									column2Label: "Location",
									onSelected: (item: IItem[]) => {
										console.log(item);
									},
								}),
							],
						},
					],
				},
			],
		};
	}

	private _getItems(): IItem[] {
		const gridItems: IItem[] = [
			{
				key: "1",
				icon: React.createElement(DocumentBulletListRegular),
				title: "File 1",
				description: "This is the first document",
			},
			{
				key: "2",
				icon: React.createElement(DocumentBulletListRegular),
				title: "File 2",
				description: "This is the 2 document",
			},
			{
				key: "3",
				icon: React.createElement(DocumentBulletListRegular),
				title: "File 3",
				description: "This is the 3 document",
			},
			{
				key: "4",
				icon: React.createElement(DocumentBulletListRegular),
				title: "File 4",
				description: "This is the 4 document",
			},
		];

		return gridItems;
	}
}
