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
		Placeholder: string;
	};
	MultiSelect: string;
	OrderBy: string;
	ShowBlankOption: string;
	Disabled: string;
	GroupConfiguration: string;
	RemoveHiddenFields: string;
	RemoveReadOnlyFields: string;
	FilterFields: string;
	AfterFilterFields: string;
	SetSelectedFilters: string;
}

declare module 'PnPFieldPickerWebPartStrings' {
  const strings: IPnPFieldPickerWebPartStrings;
  export = strings;
}
