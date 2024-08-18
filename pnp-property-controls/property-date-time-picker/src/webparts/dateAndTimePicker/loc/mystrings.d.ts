declare interface IDateAndTimePickerWebPartStrings {
	BasicConfigurationLabel: string;
	CustomFormatLabel: string;
	DateConventionLabel: string;
	TimeConventionLabel: string;
	HideLabelsLabel: string;
	DeferredValidationValueLabel: string;
	ValidationLabel: string;

  Validation: {
    DateIsRequired: string;
    DateGreaterThan2000: string;
  }

  Title: string;
}

declare module 'DateAndTimePickerWebPartStrings' {
  const strings: IDateAndTimePickerWebPartStrings;
  export = strings;
}
