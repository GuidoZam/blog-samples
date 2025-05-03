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
import { 
	DocumentBulletListRegular,
	DocumentPdfRegular,
	DocumentTextLinkFilled,
	DocumentGlobeRegular,
	DocumentTextToolboxRegular
} from '@fluentui/react-icons';
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
									styles: { padding: 2 },
									isVisible: this.properties.showGrid ?? true,
									column1Label: "Title", // Column1 will be the title of the IItem
									column2Label: "Content", // Column2 will be the description of the IItem
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
    // Generate a sample set of items to be displayed in the grid
		const gridItems: IItem[] = [
			{
				key: "test01",
				icon: React.createElement(DocumentTextLinkFilled),
				title: "Test 1",
				description: "Test document 01",
			},
			{
				key: "test02",
				icon: React.createElement(DocumentGlobeRegular),
				title: "Test 2",
				description: "This is just a test document 02",
			},
			{
				key: "test03",
				icon: React.createElement(DocumentTextToolboxRegular),
				title: "Test 3",
				description: "Test document 03",
			},
			{
				key: "test04",
				icon: React.createElement(DocumentPdfRegular),
				title: "Test 4",
				description: "Test document 04",
			},
			{
				key: "test05",
				icon: React.createElement(DocumentBulletListRegular),
				title: "Test with long title 5",
				description: "This is yet another test document 05",
			},
		];

		return gridItems;
	}
}
