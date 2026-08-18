declare interface IViewPickerWebPartStrings {
	PropertyPaneDescription: string;
	BasicGroupName: string;
	DescriptionFieldLabel: string;
	ListIdFieldLabel: string;
	DefaultSelectedViewFieldLabel: string;

	// Component Titles
	MainTitle: string;
	MainDescription: string;

	// Section Titles
	SingleSelectionSection: string;
	MultiSelectionSection: string;
	OrderedSection: string;
	FilteredSection: string;
	DefaultSection: string;
	DisabledSection: string;

	// Labels
	SelectedViewLabel: string;
	SelectedViewsLabel: string;
	NoViewSelected: string;
}

declare module 'ViewPickerWebPartStrings' {
  const strings: IViewPickerWebPartStrings;
  export = strings;
}
