import * as React from 'react';
import * as ReactDom from 'react-dom';
import { Version } from '@microsoft/sp-core-library';
// import {
//   type IPropertyPaneConfiguration,
//   PropertyPaneTextField
// } from '@microsoft/sp-property-pane';
import { BaseClientSideWebPart } from '@microsoft/sp-webpart-base';
//import { IReadonlyTheme } from '@microsoft/sp-component-base';

//import * as strings from 'SearchWebPartWebPartStrings';
import SearchWebPartComponent from "./components/SearchWebPartComponent";
import { ISearchWebPartComponentProps } from "./components/ISearchWebPartComponentProps";
import { spfi, SPFI, SPFx } from '@pnp/sp';

export interface ISearchWebPartWebPartProps {
}

export default class SearchWebPart extends BaseClientSideWebPart<ISearchWebPartWebPartProps> {
	private _sp: SPFI;

	public render(): void {
		const element: React.ReactElement<ISearchWebPartComponentProps> =
			React.createElement(SearchWebPartComponent, {
				sp: this._sp,
			});

		ReactDom.render(element, this.domElement);
	}

	protected async onInit(): Promise<void> {
		await super.onInit();

		// Initialize PnPjs with the current context
		this._sp = spfi().using(SPFx(this.context));
	}

	protected onDispose(): void {
		ReactDom.unmountComponentAtNode(this.domElement);
	}

	protected get dataVersion(): Version {
		return Version.parse("1.0");
	}

	// protected getPropertyPaneConfiguration(): IPropertyPaneConfiguration {
	//   return {
	//     pages: [
	//       {
	//         header: {
	//           description: strings.PropertyPaneDescription
	//         },
	//         groups: [
	//           {
	//             groupName: strings.BasicGroupName,
	//             groupFields: [
	//               PropertyPaneTextField('description', {
	//                 label: strings.DescriptionFieldLabel
	//               })
	//             ]
	//           }
	//         ]
	//       }
	//     ]
	//   };
	// }
}
