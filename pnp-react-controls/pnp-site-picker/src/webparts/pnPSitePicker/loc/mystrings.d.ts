declare interface IPnPSitePickerWebPartStrings {
	Title: string;
	BasicUsage: string;
	DeferredSearchTime: string;
	DisableSearch: string;
	Mode: string;
	MultiSelectionDisabled: string;
	OrderByUrl: string;
	CustomLabels: string;
	Label: string;
	Placeholder: string;
	CurrentSiteCollection: string;
	AlreadySelectedAndDisabled: string;
}

declare module 'PnPSitePickerWebPartStrings' {
  const strings: IPnPSitePickerWebPartStrings;
  export = strings;
}
