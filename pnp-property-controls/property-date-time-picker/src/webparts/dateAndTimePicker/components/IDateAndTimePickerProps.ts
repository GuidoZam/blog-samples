import {
	IDateTimeFieldValue,
} from "@pnp/spfx-property-controls/lib/PropertyFieldDateTimePicker";

export interface IDateAndTimePickerProps {
	basicValue: IDateTimeFieldValue;
	customFormatValue: IDateTimeFieldValue;
	dateConventionValue: IDateTimeFieldValue;
	timeConventionValue: IDateTimeFieldValue;
	hideLabelsValue: IDateTimeFieldValue;
	validationValue: IDateTimeFieldValue;
	deferredValidationValue: IDateTimeFieldValue;
}
