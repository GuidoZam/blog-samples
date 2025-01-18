import * as React from 'react';
import * as ReactDom from 'react-dom';
import { Version } from '@microsoft/sp-core-library';
import { BaseClientSideWebPart } from '@microsoft/sp-webpart-base';
import { IReadonlyTheme } from '@microsoft/sp-component-base';

//import * as strings from 'PnPUploadFileSampleWebPartStrings';
import PnPUploadFileSample from './components/PnPUploadFileSample';
import { IPnPUploadFileSampleProps } from './components/IPnPUploadFileSampleProps';

export interface IPnPUploadFileSampleWebPartProps {
}

export default class PnPUploadFileSampleWebPart extends BaseClientSideWebPart<IPnPUploadFileSampleWebPartProps> {
	private _theme: IReadonlyTheme;

	public render(): void {
		const element: React.ReactElement<IPnPUploadFileSampleProps> =
			React.createElement(PnPUploadFileSample, {
        context: this.context,
        themeVariant: this._theme
      });

		ReactDom.render(element, this.domElement);
	}

	protected onThemeChanged(currentTheme: IReadonlyTheme | undefined): void {
		if (!currentTheme) {
			return;
		}

		this._theme = currentTheme;
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
	// 					description: strings.PropertyPaneDescription,
	// 				},
	// 				groups: [
	// 					{
	// 						groupName: strings.BasicGroupName,
	// 						groupFields: [
	// 							PropertyPaneTextField("description", {
	// 								label: strings.DescriptionFieldLabel,
	// 							}),
	// 						],
	// 					},
	// 				],
	// 			},
	// 		],
	// 	};
	// }
}
