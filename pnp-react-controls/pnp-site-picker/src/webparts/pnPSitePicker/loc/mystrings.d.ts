declare interface IPnPSitePickerWebPartStrings {
	Title: string;
	BasicUsage: string;
	DeferredSearchTime: string;
	DisableSearch: string;
	EntitiesAvailable: string;
	MultiSelectionDisabled: string;
	OrderByUrl: string;
	CustomLabels: string;
	Label: string;
	Placeholder: string;
}

declare module 'PnPSitePickerWebPartStrings' {
  const strings: IPnPSitePickerWebPartStrings;
  export = strings;
}
