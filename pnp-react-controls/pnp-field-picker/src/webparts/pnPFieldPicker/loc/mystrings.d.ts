declare interface IPnPFieldPickerWebPartStrings {
	PropertyPane: {
		Description: string;
		GroupName: string;
		ListPickerLabel: string;
	};
	ConfigureWebPart: string;
	OpenPropertyPane: string;
	Title: string;
	MinimalConfiguration: string;
	ListConfigured: string;
	OnSelectionChanged: string;
	CustomLabel: string;
	CustomStrings: {
		Label: string;
	};
	MultiSelect: string;
	OrderBy: string;
	ShowBlankOption: string;
	Disabled: string;
	GroupConfiguration: string;
}

declare module 'PnPFieldPickerWebPartStrings' {
  const strings: IPnPFieldPickerWebPartStrings;
  export = strings;
}
