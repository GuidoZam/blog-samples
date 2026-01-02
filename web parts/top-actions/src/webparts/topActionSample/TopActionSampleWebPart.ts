import * as React from 'react';
import * as ReactDom from 'react-dom';
import { Version } from '@microsoft/sp-core-library';
import { BaseClientSideWebPart } from '@microsoft/sp-webpart-base';

//import * as strings from 'TopActionSampleWebPartStrings';
import TopActionSample from './components/TopActionSample';
import { ITopActionSampleProps } from './components/ITopActionSampleProps';

import {
  ITopActions,
  TopActionsFieldType
} from '@microsoft/sp-top-actions';

export interface ITopActionSampleWebPartProps {
  description: string;
}

export default class TopActionSampleWebPart extends BaseClientSideWebPart<ITopActionSampleWebPartProps> {
	public render(): void {
		const element: React.ReactElement<ITopActionSampleProps> =
			React.createElement(TopActionSample, {});

		ReactDom.render(element, this.domElement);
	}

	protected onDispose(): void {
		ReactDom.unmountComponentAtNode(this.domElement);
	}

	protected get dataVersion(): Version {
		return Version.parse("1.0");
	}

	public getTopActionsConfiguration(): ITopActions | undefined {
		return {
			topActions: [
				{
					type: TopActionsFieldType.Button,
					title: "Button",
					targetProperty: "button",
					properties: {
						text: "Button",
						icon: "SharePointLogo",
					},
				},
				{
					type: TopActionsFieldType.Dropdown,
					title: "Dropdown",
					targetProperty: "dropdown",
					properties: {
						options: [
							{
								key: "1",
								text: "Option 1", // TODO; update localization
							},
							{
								key: "2",
								text: "Option 2",
							},
						],
					},
				},
			],
			onExecute(actionName, updatedValue) {
				console.log("onExecute", actionName, updatedValue);
			},
		};
	}
}
