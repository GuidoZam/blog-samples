import * as React from 'react';
import * as ReactDom from 'react-dom';
import { Version } from '@microsoft/sp-core-library';
import {
  type IPropertyPaneConfiguration,
  PropertyPaneTextField,
  PropertyPaneCheckbox,
  PropertyPaneDropdown,
  PropertyPaneToggle,
  PropertyPaneSlider
} from '@microsoft/sp-property-pane';
import { BaseClientSideWebPart } from '@microsoft/sp-webpart-base';

import * as strings from 'PropertyPaneSampleWebPartStrings';
import PropertyPaneSample from './components/PropertyPaneSample';
import { IPropertyPaneSampleProps } from './components/IPropertyPaneSampleProps';

export interface IPropertyPaneSampleWebPartProps {
	description: string;
	checkboxValue: boolean;
  dropdownValue: string;
  toggleValue: boolean;
  sliderValue: number;
}

export default class PropertyPaneSampleWebPart extends BaseClientSideWebPart<IPropertyPaneSampleWebPartProps> {
	public render(): void {
		const element: React.ReactElement<IPropertyPaneSampleProps> =
			React.createElement(PropertyPaneSample, {
				description: this.properties.description,
				checkboxValue: this.properties.checkboxValue,
				dropdownValue: this.properties.dropdownValue,
				toggleValue: this.properties.toggleValue,
				sliderValue: this.properties.sliderValue,
			});

		ReactDom.render(element, this.domElement);
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
							groupName: strings.BasicGroupName,
							groupFields: [
								PropertyPaneTextField("description", {
									label: strings.DescriptionFieldLabel,
								}),
								PropertyPaneCheckbox("checkboxValue", {
									text: strings.CheckboxValueFieldLabel,
									checked: this.properties.checkboxValue,
								}),
								PropertyPaneDropdown("dropdownValue", {
									label: strings.DropdownValueFieldLabel,
									options: [
										{ key: "1", text: "One" },
										{ key: "2", text: "Two" },
										{ key: "3", text: "Three" },
										{ key: "4", text: "Four" },
										{ key: "5", text: "Five" },
									],
								}),
								PropertyPaneToggle("toggleValue", {
									label: strings.ToggleValueFieldLabel,
									onText: "On",
									offText: "Off",
									checked: this.properties.toggleValue,
								}),
								PropertyPaneSlider("sliderValue", {
									label: strings.SliderValueFieldLabel,
									min: 0,
									max: 100,
									step: 1,
									showValue: true,
									value: 50,
								}),
							],
						},
					],
				},
			],
		};
	}
}
