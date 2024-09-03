declare interface IListItemPickerSampleWebPartStrings {
	Title: string;
	TargetList: string;
	MinimalConfiguration: string;
	DefaultSelectedItems: string;
	DisabledSelectedItems: string;
	KeyColumnConfiguration: string;
	MultipleSelection: string;
	CustomStrings: {
		Title: string;
		Header: string;
		NoResults: string;
		PlaceHolder: string;
		Label: string;
	};
	SubstringSearch: string;
	Filtering: string;
	EnableSuggestions: string;
	Sorting: string;
}

declare module 'ListItemPickerSampleWebPartStrings' {
  const strings: IListItemPickerSampleWebPartStrings;
  export = strings;
}
