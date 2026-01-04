import * as React from 'react';
import * as ReactDom from 'react-dom';
import { Version } from '@microsoft/sp-core-library';
import { BaseClientSideWebPart } from '@microsoft/sp-webpart-base';
import { IReadonlyTheme } from '@microsoft/sp-component-base';

import * as strings from 'TopActionsDevPreviewWebPartStrings';
import TopActionsDevPreview from './components/TopActionsDevPreview';
import { ITopActionsDevPreviewProps } from './components/ITopActionsDevPreviewProps';

import { ITopActions, ITopActionsComboboxProps, ITopActionsToggleProps, TopActionsFieldType } from "@microsoft/sp-top-actions";
import { LoggingEnum } from './components/LoggingEnum';

export interface ITopActionsDevPreviewWebPartProps {
	like: boolean;
	logging: LoggingEnum;
  enableVerboseLogging: boolean;
}

export default class TopActionsDevPreviewWebPart extends BaseClientSideWebPart<ITopActionsDevPreviewWebPartProps> {
	private _isDarkTheme: boolean = false;
	private _environmentMessage: string = "";

  protected onInit(): Promise<void> {
    // Write the package version to the console
    console.log(`🔎 Top Actions Dev Preview Web Part - Version ${this.context.manifest.version}`);

    return super.onInit();
  }

	public render(): void {
		const element: React.ReactElement<ITopActionsDevPreviewProps> =
			React.createElement(TopActionsDevPreview, {
        like: this.properties.like,
        logging: this.properties.logging
			});

		ReactDom.render(element, this.domElement);
	}

	protected onThemeChanged(currentTheme: IReadonlyTheme | undefined): void {
		if (!currentTheme) {
			return;
		}

		this._isDarkTheme = !!currentTheme.isInverted;
		const { semanticColors } = currentTheme;

		if (semanticColors) {
			this.domElement.style.setProperty(
				"--bodyText",
				semanticColors.bodyText || null
			);
			this.domElement.style.setProperty("--link", semanticColors.link || null);
			this.domElement.style.setProperty(
				"--linkHovered",
				semanticColors.linkHovered || null
			);
		}
	}

	protected onDispose(): void {
		ReactDom.unmountComponentAtNode(this.domElement);
	}

	protected get dataVersion(): Version {
		return Version.parse("1.0");
	}

	public getTopActionsConfiguration = (): ITopActions | undefined => {
    const properties = this.properties;

		return {
			topActions: [
				// {
				// 	type: TopActionsFieldType.Button,
				// 	title: strings.TopActions.ButtonTitle,
				// 	targetProperty: "button",
				// 	properties: {
				// 		text: strings.TopActions.ButtonText,
				// 		icon: properties.like === true ? "LikeSolid" : "Like",
				// 	},
				// },
				// {
				// 	type: TopActionsFieldType.Dropdown,
				// 	title: strings.TopActions.DropdownTitle,
				// 	targetProperty: "dropdown",
				// 	properties: {
				// 		options: [
				// 			{
				// 				key: LoggingEnum.Off,
				// 				text: strings.TopActions.DropdownOptionOff,
				// 				checked: true,
				// 			},
				// 			{
				// 				key: LoggingEnum.Warning,
				// 				text: strings.TopActions.DropdownOptionWarning,
				// 			},
				// 			{
				// 				key: LoggingEnum.Error,
				// 				text: strings.TopActions.DropdownOptionError,
				// 			},
				// 			{
				// 				key: LoggingEnum.Verbose,
				// 				text: strings.TopActions.DropdownOptionVerbose,
				// 			},
				// 		],
				// 	},
				// },
				{
					type: TopActionsFieldType.Toggle,
					title: strings.TopActions.ToggleTitle,
					targetProperty: "toggle",
					properties: {
						checked: this.properties.enableVerboseLogging ?? false,
					} as ITopActionsToggleProps,
				},
				// {
				// 	type: TopActionsFieldType.Combobox,
				// 	title: strings.TopActions.ComboboxTitle,
				// 	targetProperty: "combobox",
				// 	properties: {
				// 		options: [
				// 			{ key: "option1", text: "Option 1" },
				// 			{ key: "option2", text: "Option 2" },
				// 			{ key: "option3", text: "Option 3" },
				// 		],
				// 		placeholder: strings.TopActions.ComboboxPlaceholder,
				// 		// allowFreeform: true,
				// 		// autoComplete: "on"
				// 	},
				// },
				{
					type: TopActionsFieldType.Split,
					title: strings.TopActions.SplitTitle,
					targetProperty: "split",
					properties: {
						// Insert properties from ITopActionsSplitButtonProps here
          text: strings.TopActions.SplitText,
          ariaLabel: strings.TopActions.SplitButtonAriaLabel,
          options: [
              {
              key: "share",
              text: strings.TopActions.SplitShare,
              },
              {
              key: "email",
              text: strings.TopActions.SplitEmail,
              },
              {
              key: "copy",
              text: strings.TopActions.SplitCopy,
              },
            ]
					},
				}
			],
			onExecute(actionName, updatedValue) {
				console.log(
					`Action executed: ${actionName} with value: ${updatedValue}`
				);

				switch (actionName) {
					case "button":
						properties.like = !properties.like;
						break;
					case "dropdown":
						properties.logging = updatedValue as LoggingEnum;
						break;
					case "toggle":
						properties.enableVerboseLogging = !properties.enableVerboseLogging;
						break;
					case "combobox":
						console.log(`Combobox value changed to: ${updatedValue}`);
						break;
					case "split":
						console.log(`Split button action executed: ${updatedValue}`);
						break;
				}
			},
		};
	};
}
