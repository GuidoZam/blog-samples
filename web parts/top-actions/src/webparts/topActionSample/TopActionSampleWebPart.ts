import * as React from 'react';
import * as ReactDom from 'react-dom';
import { Version } from '@microsoft/sp-core-library';
import { BaseClientSideWebPart } from '@microsoft/sp-webpart-base';

import * as strings from 'TopActionSampleWebPartStrings';
import TopActionSample from './components/TopActionSample';
import { ITopActionSampleProps } from './components/ITopActionSampleProps';

import {
  ITopActions,
  TopActionsFieldType
} from '@microsoft/sp-top-actions';
import { LoggingEnum } from './components/LoggingEnum';

export interface ITopActionSampleWebPartProps {
	like: boolean;
	logging: LoggingEnum;
}

export default class TopActionSampleWebPart extends BaseClientSideWebPart<ITopActionSampleWebPartProps> {
	public render(): void {
		const element: React.ReactElement<ITopActionSampleProps> =
			React.createElement(TopActionSample, {
        like: this.properties.like,
        logging: this.properties.logging
      });

		ReactDom.render(element, this.domElement);
	}

	protected onDispose(): void {
		ReactDom.unmountComponentAtNode(this.domElement);
	}

	protected get dataVersion(): Version {
		return Version.parse("1.0");
	}

	public getTopActionsConfiguration = (): ITopActions | undefined => {
    // Create variable to hold properties
    const properties = this.properties;

		return {
			topActions: [
				{
					type: TopActionsFieldType.Button,
					title: strings.TopActions.ButtonTitle,
					targetProperty: "button",
					properties: {
						text: strings.TopActions.ButtonText,
						icon: properties.like === true ? "LikeSolid" : "Like",
					},
				},
				{
					type: TopActionsFieldType.Dropdown,
					title: strings.TopActions.DropdownTitle,
					targetProperty: "dropdown",
					properties: {
						options: [
							{
								key: LoggingEnum.Off,
								text: strings.TopActions.DropdownOptionOff,
                checked: true
							},
							{
								key: LoggingEnum.Warning,
								text: strings.TopActions.DropdownOptionWarning,
							},
							{
								key: LoggingEnum.Error,
								text: strings.TopActions.DropdownOptionError,
							},
							{
								key: LoggingEnum.Verbose,
								text: strings.TopActions.DropdownOptionVerbose,
							},
						],
					},
				},
			],
			onExecute(actionName, updatedValue) {
				console.log("onExecute", actionName, updatedValue);
				switch (actionName) {
					case "button":
						properties.like = !properties.like;
						break;
					case "dropdown":
						properties.logging = updatedValue as LoggingEnum;
						break;
				}
			},
		};
	}
}
