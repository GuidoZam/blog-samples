import * as React from 'react';
import * as ReactDom from 'react-dom';
import { Version } from '@microsoft/sp-core-library';
import {
  type IPropertyPaneConfiguration,
  PropertyPaneSlider
} from '@microsoft/sp-property-pane';
import { BaseClientSideWebPart } from '@microsoft/sp-webpart-base';

import * as strings from 'SearchWebPartStrings';
import SearchWebPartComponent from "./components/SearchWebPartComponent";
import { ISearchWebPartComponentProps } from "./components/ISearchWebPartComponentProps";
import { spfi, SPFI, SPFx } from '@pnp/sp';

export interface ISearchWebPartWebPartProps {
	rowLimit: number;
}

export default class SearchWebPart extends BaseClientSideWebPart<ISearchWebPartWebPartProps> {
	private _sp: SPFI;

	public render(): void {
		const element: React.ReactElement<ISearchWebPartComponentProps> =
			React.createElement(SearchWebPartComponent, {
				sp: this._sp,
				rowLimit: this.properties.rowLimit
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

	protected getPropertyPaneConfiguration(): IPropertyPaneConfiguration {
		return {
			pages: [
				{
					header: {
						description: strings.PropertyPane.PropertyPaneDescription,
					},
					groups: [
						{
							groupName: strings.PropertyPane.BasicGroupName,
							groupFields: [
								PropertyPaneSlider("rowLimit", {
									label: strings.PropertyPane.RowLimitFieldLabel,
									min: 1,
									max: 10,
									step: 1,
								}),
							],
						},
					],
				},
			],
		};
	}
}
