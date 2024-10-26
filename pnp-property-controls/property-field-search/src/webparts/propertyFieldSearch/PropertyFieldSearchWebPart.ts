import * as React from 'react';
import * as ReactDom from 'react-dom';
import { Version } from '@microsoft/sp-core-library';
import {
  type IPropertyPaneConfiguration,
} from '@microsoft/sp-property-pane';
import { BaseClientSideWebPart } from '@microsoft/sp-webpart-base';
import * as strings from 'PropertyFieldSearchWebPartStrings';
import { IPnPPropertyFieldSearchProps } from './components/IPnPPropertyFieldSearchProps';
import { PropertyFieldSearch } from "@pnp/spfx-property-controls/lib/PropertyFieldSearch";
import PnPPropertyFieldSearch from './components/PnPPropertyFieldSearch';

export interface IPropertyFieldSearchWebPartProps {
	searchValueMinimal: string;
	searchValuePlaceholder: string;
	searchValuePreFilled: string;
	searchValueUnderlined: string;
	searchValueWithEvents: string;
}

export default class PropertyFieldSearchWebPart extends BaseClientSideWebPart<IPropertyFieldSearchWebPartProps> {

  public render(): void {
    const element: React.ReactElement<IPnPPropertyFieldSearchProps> = React.createElement(
      PnPPropertyFieldSearch,
      {
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
							groupName: strings.MinimalGroupName,
							groupFields: [
								PropertyFieldSearch("searchValueMinimal", {
									key: "searchMinimal",
									value: this.properties.searchValueMinimal,
								}),
							],
						},
						{
							groupName: strings.PlaceholderGroupName,
							groupFields: [
								PropertyFieldSearch("searchValuePlaceholder", {
									key: "searchPlaceholder",
									placeholder: strings.PlaceHolder,
									value: this.properties.searchValuePlaceholder,
								}),
							],
						},
						{
							groupName: strings.UnderlinedGroupName,
							groupFields: [
								PropertyFieldSearch("searchValueUnderlined", {
									key: "searchUnderlined",
									value: this.properties.searchValueUnderlined,
									underlined: true,
								}),
							],
						},
						{
							groupName: strings.WithEventsGroupName,
							groupFields: [
								PropertyFieldSearch("searchValueWithEvents", {
									key: "search",
									value: this.properties.searchValueWithEvents,
									onSearch: this._onSearch,
									onChange: this._onChange,
									onEscape: this._onEscape,
									onClear: this._onClear,
								}),
							],
						},
					],
				},
			],
		};
  }

  private _onSearch = (value: string) => {
    console.log("onSearch called!");
    this.properties.searchValueWithEvents = value;
  }

  private _onChange = (value: string) => {
    console.log("onChange called!");
    this.properties.searchValueWithEvents = value;
  }

  private _onEscape = (ev: any) => {
    console.log("onEscape called!");
  }

  private _onClear = (ev: any) => {
    console.log("onClear called!");
  }
}
