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
	noPreviewValue: string;
	iconNameValue: string;
	asObjectValue: string;
	onPropertyChangeValue: string;
}

export default class ColorPickerSampleWebPart extends BaseClientSideWebPart<IColorPickerSampleWebPartProps> {

  public render(): void {
    const element: React.ReactElement<IColorPickerSampleProps> =
			React.createElement(ColorPickerSample, {
				baseValue: this.properties.baseValue,
				noAlphaSliderValue: this.properties.noAlphaSliderValue,
				fullPickerValue: this.properties.fullPickerValue,
				noPreviewValue: this.properties.noPreviewValue,
				iconNameValue: this.properties.iconNameValue,
				asObjectValue: this.properties.asObjectValue,
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
							groupName: strings.BasicGroupName,
							groupFields: [
								PropertyFieldColorPicker("baseValue", {
									label: strings.BasicSelectColorLabel,
									selectedColor: this.properties.baseValue,
									onPropertyChange: this.onPropertyPaneFieldChanged,
									properties: this.properties,
									key: "basicUsage",
								}),
								PropertyFieldColorPicker("noAlphaSliderValue", {
									label: strings.NoAlphaSliderColorLabel,
									selectedColor: this.properties.noAlphaSliderValue,
									onPropertyChange: this.onPropertyPaneFieldChanged,
									properties: this.properties,
									alphaSliderHidden: true,
									key: "noAlphaSlider",
									disabled: this.properties.disabled,
								}),
								PropertyFieldColorPicker("fullPickerValue", {
									label: strings.FullPickerColorLabel,
									selectedColor: this.properties.fullPickerValue,
									onPropertyChange: this.onPropertyPaneFieldChanged,
									properties: this.properties,
									disabled: this.properties.disabled,
									isHidden: false,
									alphaSliderHidden: false,
									style: PropertyFieldColorPickerStyle.Full,
									iconName: "Precipitation",
									key: "colorFieldId",
								}),
								PropertyPaneToggle("disabled", {
									label: strings.DisableToggleLabel,
								}),
								PropertyFieldColorPicker("noPreviewValue", {
									label: strings.NoPreviewSelectColorLabel,
									selectedColor: this.properties.noPreviewValue,
									onPropertyChange: this.onPropertyPaneFieldChanged,
									properties: this.properties,
									showPreview: false,
									key: "noPreviewUsage",
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
										console.log(propertyPath);
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
										// For example you can prevent the user from selecting a specific color
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
