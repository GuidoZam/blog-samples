import * as React from 'react';
import * as ReactDom from 'react-dom';
import { Version } from '@microsoft/sp-core-library';
// import {
//   type IPropertyPaneConfiguration,
//   PropertyPaneToggle
// } from '@microsoft/sp-property-pane';
import { BaseClientSideWebPart } from '@microsoft/sp-webpart-base';
//import * as strings from "PnPListViewWebPartStrings";
import PnPListView from './components/PnPListView';
import { IPnPListViewProps } from './components/IPnPListViewProps';

export interface IPnPListViewWebPartProps {
}

export default class PnPListViewWebPart extends BaseClientSideWebPart<IPnPListViewWebPartProps> {

	public render(): void {
		const element: React.ReactElement<IPnPListViewProps> = React.createElement(
			PnPListView,
			{}
		);

		ReactDom.render(element, this.domElement);
	}

	protected onDispose(): void {
		ReactDom.unmountComponentAtNode(this.domElement);
	}

	protected get dataVersion(): Version {
		return Version.parse("1.0");
	}

	// protected getPropertyPaneConfiguration(): IPropertyPaneConfiguration {
	// 	return {
	// 		pages: [
	// 			{
	// 				header: {
	// 					description: strings.PropertyPane.Description,
	// 				},
	// 				groups: [
	// 					{
	// 						groupName: strings.PropertyPane.GroupName,
	// 						groupFields: [
	// 							PropertyPaneToggle("UseSampleData", {
	// 								label: strings.PropertyPane.UseSampleDataFieldLabel,
	// 							}),
	// 						],
	// 					},
	// 				],
	// 			},
	// 		],
	// 	};
	// }
}
