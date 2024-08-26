declare interface IListPickerSampleWebPartStrings {
	Title: string;
	BasicUsage: string;
	HideHiddenLists: string;
	OrderById: string;
	MultiSelection: string;
	CustomStrings: {
		Title: string;
		Label: string;
		PlaceHolder: string;
	};
	FilterByContentType: string;
	RefreshToggle: string;
}

declare module 'ListPickerSampleWebPartStrings' {
  const strings: IListPickerSampleWebPartStrings;
  export = strings;
}
