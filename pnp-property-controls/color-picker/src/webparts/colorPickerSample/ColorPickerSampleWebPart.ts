import * as React from 'react';
import * as ReactDom from 'react-dom';
import { Version } from '@microsoft/sp-core-library';
import {
	PropertyPaneToggle,
  type IPropertyPaneConfiguration
} from '@microsoft/sp-property-pane';
import { BaseClientSideWebPart } from '@microsoft/sp-webpart-base';

import * as strings from 'ColorPickerSampleWebPartStrings';
import ColorPickerSample from './components/ColorPickerSample';
import { IColorPickerSampleProps } from './components/IColorPickerSampleProps';
import {
	PropertyFieldColorPicker,
	PropertyFieldColorPickerStyle,
} from "@pnp/spfx-property-controls/lib/PropertyFieldColorPicker";

export interface IColorPickerSampleWebPartProps {
	baseValue: string;
	noAlphaSliderValue: string;
	fullPickerValue: string;
	disabled: boolean;
	hidden: boolean;
	showPreview: boolean;
	iconNameValue: string;
	asObjectValue: any;
	onPropertyChangeValue: string;
}

export default class ColorPickerSampleWebPart extends BaseClientSideWebPart<IColorPickerSampleWebPartProps> {

  public render(): void {
    const element: React.ReactElement<IColorPickerSampleProps> =
			React.createElement(ColorPickerSample, {
				baseValue: this.properties.baseValue,
				noAlphaSliderValue: this.properties.noAlphaSliderValue,
				fullPickerValue: this.properties.fullPickerValue,
				iconNameValue: this.properties.iconNameValue,
				asObjectValue: this.properties.asObjectValue?.str,
				onPropertyChangeValue: this.properties.onPropertyChangeValue,
			});

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
							groupFields: [
								PropertyFieldColorPicker("baseValue", {
									label: strings.BasicSelectColorLabel,
									selectedColor: this.properties.baseValue,
									onPropertyChange: this.onPropertyPaneFieldChanged,
									properties: this.properties,
									key: "basicUsage",
								}),
								PropertyPaneToggle("showPreview", {
									label: strings.ShowPreviewToggleLabel,
								}),
								PropertyPaneToggle("disabled", {
									label: strings.DisableToggleLabel,
								}),
								PropertyPaneToggle("hidden", {
									label: strings.HideToggleLabel,
								}),
								PropertyFieldColorPicker("noAlphaSliderValue", {
									label: strings.NoAlphaSliderColorLabel,
									selectedColor: this.properties.noAlphaSliderValue,
									onPropertyChange: this.onPropertyPaneFieldChanged,
									properties: this.properties,
									alphaSliderHidden: true,
									key: "noAlphaSlider",
									isHidden: this.properties.hidden,
									disabled: this.properties.disabled,
									showPreview: this.properties.showPreview,
								}),
								PropertyFieldColorPicker("fullPickerValue", {
									label: strings.FullPickerColorLabel,
									selectedColor: this.properties.fullPickerValue,
									onPropertyChange: this.onPropertyPaneFieldChanged,
									properties: this.properties,
									disabled: this.properties.disabled,
									isHidden: this.properties.hidden,
									showPreview: this.properties.showPreview,
									style: PropertyFieldColorPickerStyle.Full,
									key: "fullStyle",
								}),
								PropertyFieldColorPicker("iconNameValue", {
									label: strings.IconNameSelectColorLabel,
									selectedColor: this.properties.iconNameValue,
									onPropertyChange: this.onPropertyPaneFieldChanged,
									properties: this.properties,
									iconName: "Eyedropper",
									key: "noPreviewUsage",
								}),
								PropertyFieldColorPicker("asObjectValue", {
									label: strings.AsObjectValueSelectColorLabel,
									selectedColor: this.properties.asObjectValue,
									onPropertyChange: (
										propertyPath: string,
										oldValue: any,
										newValue: any
									) => {
										console.log(oldValue);
										console.log(newValue);
										this.onPropertyPaneFieldChanged(
											propertyPath,
											oldValue,
											newValue
										);
									},
									properties: this.properties,
									valueAsObject: true,
									// An example of the object value returned both for the oldValue
									// and newValue when using valueAsObject set to true:
									// {
									// 	"a": 100,
									// 	"b": 26,
									// 	"g": 201,
									// 	"h": 126,
									// 	"hex": "06c91a",
									// 	"r": 6,
									// 	"s": 97,
									// 	"str": "#06c91a",
									// 	"v": 79,
									// 	"t": 0
									// }
									key: "asObjectValue",
								}),
								PropertyFieldColorPicker("onPropertyChangeValue", {
									label: strings.OnPropertyChangeSelectColorLabel,
									selectedColor: this.properties.onPropertyChangeValue,
									onPropertyChange: (
										propertyPath: string,
										oldValue: any,
										newValue: any
									) => {
										console.log(oldValue);
										console.log(newValue);
										// Here you can perform additional operations when the color changes
										// For example you can prevent the user from selecting a specific color.
										// This instance does not return an object so the value will be
										// a string containing the hex value of the color.
										if (newValue === "#ffffff" || newValue === "#000000") {
											alert(strings.CannotSelectThisColorErrorMessage);
											return;
										}

										this.onPropertyPaneFieldChanged(
											propertyPath,
											oldValue,
											newValue
										);
									},
									properties: this.properties,
									key: "onPropertyChange",
								}),
							],
						},
					],
				},
			],
		};
  }
}
