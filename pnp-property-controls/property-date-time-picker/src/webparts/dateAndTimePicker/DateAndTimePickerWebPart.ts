import * as React from 'react';
import * as ReactDom from 'react-dom';
import { Version } from '@microsoft/sp-core-library';
import {
  PropertyPaneHorizontalRule,
  type IPropertyPaneConfiguration
} from '@microsoft/sp-property-pane';
import { BaseClientSideWebPart } from '@microsoft/sp-webpart-base';

import * as strings from 'DateAndTimePickerWebPartStrings';
import DateAndTimePicker from './components/DateAndTimePicker';
import { IDateAndTimePickerProps } from './components/IDateAndTimePickerProps';

import {
	PropertyFieldDateTimePicker,
	IDateTimeFieldValue,
  DateConvention,
  TimeConvention,
} from "@pnp/spfx-property-controls/lib/PropertyFieldDateTimePicker";

export interface IDateAndTimePickerWebPartProps {
	basicValue: IDateTimeFieldValue;
	customFormatValue: IDateTimeFieldValue;
	dateConventionValue: IDateTimeFieldValue;
	timeConventionValue: IDateTimeFieldValue;
	hideLabelsValue: IDateTimeFieldValue;
	validationValue: IDateTimeFieldValue;
	deferredValidationValue: IDateTimeFieldValue;
}

export default class DateAndTimePickerWebPart extends BaseClientSideWebPart<IDateAndTimePickerWebPartProps> {
	public render(): void {
		const element: React.ReactElement<IDateAndTimePickerProps> =
			React.createElement(DateAndTimePicker, {
				basicValue: this.properties.basicValue,
				customFormatValue: this.properties.customFormatValue,
				dateConventionValue: this.properties.dateConventionValue,
				timeConventionValue: this.properties.timeConventionValue,
				hideLabelsValue: this.properties.hideLabelsValue,
				deferredValidationValue: this.properties.deferredValidationValue,
				validationValue: this.properties.validationValue,
			});

		ReactDom.render(element, this.domElement);
	}

	protected onDispose(): void {
		ReactDom.unmountComponentAtNode(this.domElement);
	}

	protected get dataVersion(): Version {
		return Version.parse("1.0");
	}

	protected validateDateTime = (dateValue: string): string => {
		if (!dateValue) {
			return strings.Validation.DateIsRequired;
		}

		const date = new Date(dateValue);

		if (date.getFullYear() <= 2000) {
			return strings.Validation.DateGreaterThan2000;
		}

		return "";
	};

	protected getPropertyPaneConfiguration(): IPropertyPaneConfiguration {
		return {
			pages: [
				{
					groups: [
						{
							groupFields: [
								PropertyFieldDateTimePicker("basicValue", {
									label: strings.BasicConfigurationLabel,
									initialDate: this.properties.basicValue,
									onPropertyChange: this.onPropertyPaneFieldChanged,
									properties: this.properties,
									key: "basicDateTimeField",
								}),
								PropertyPaneHorizontalRule(),
								PropertyFieldDateTimePicker("customFormatValue", {
									label: strings.CustomFormatLabel,
									initialDate: this.properties.customFormatValue,
									onPropertyChange: this.onPropertyPaneFieldChanged,
									properties: this.properties,
									key: "customFormatDateTimeField",
									formatDate: (date: Date) => {
										// return the date formatted as dd/MM/yyyy HH:mm
										return `${date.getDate()}/${
											date.getMonth() + 1
										}/${date.getFullYear()} ${date.getHours()}:${date.getMinutes()}`;
									},
								}),
								PropertyPaneHorizontalRule(),
								PropertyFieldDateTimePicker("dateConventionValue", {
									label: strings.DateConventionLabel,
									initialDate: this.properties.dateConventionValue,
									onPropertyChange: this.onPropertyPaneFieldChanged,
									properties: this.properties,
									key: "dateConventionField",
									dateConvention: DateConvention.Date,
								}),
								PropertyPaneHorizontalRule(),
								PropertyFieldDateTimePicker("timeConventionValue", {
									label: strings.TimeConventionLabel,
									initialDate: this.properties.timeConventionValue,
									onPropertyChange: this.onPropertyPaneFieldChanged,
									properties: this.properties,
									key: "timeConventionField",
									timeConvention: TimeConvention.Hours12,
								}),
								PropertyPaneHorizontalRule(),
								PropertyFieldDateTimePicker("hideLabelsValue", {
									label: strings.HideLabelsLabel,
									initialDate: this.properties.hideLabelsValue,
									onPropertyChange: this.onPropertyPaneFieldChanged,
									properties: this.properties,
									key: "timeConventionField",
									showLabels: false,
								}),
								PropertyPaneHorizontalRule(),
								PropertyFieldDateTimePicker("validationValue", {
									label: strings.ValidationLabel,
									initialDate: this.properties.validationValue,
									onPropertyChange: this.onPropertyPaneFieldChanged,
									properties: this.properties,
									key: "validationValueField",
									onGetErrorMessage: this.validateDateTime
								}),
								PropertyPaneHorizontalRule(),
								PropertyFieldDateTimePicker("deferredValidationValue", {
									label: strings.DeferredValidationValueLabel,
									initialDate: this.properties.deferredValidationValue,
									onPropertyChange: this.onPropertyPaneFieldChanged,
									properties: this.properties,
									key: "deferredValidationField",
									deferredValidationTime: 2000,
									onGetErrorMessage: this.validateDateTime
								}),
							],
						},
					],
				},
			],
		};
	}
}
