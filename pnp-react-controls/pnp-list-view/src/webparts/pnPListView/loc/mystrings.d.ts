declare interface IPnPListViewWebPartStrings {
	Title: string;
	MinimalConfiguration: string;
	ViewFields: string;
	CompactListView: string;
	ShowFilter: string;
	DragDropFiles: string;
	StickyHeader: string;
	MultipleSelectionMode: string;
	HandleSelection: string;
	GroupByFields: string;
	CustomSorting: string;
	FilterPlaceHolder: string;
	DefaultFilter: string;
	CustomRenderRow: string;
	PropertyPane: {
		Description: string;
		GroupName: string;
		UseSampleDataFieldLabel: string;
	};
	Fields: {
		Key: string;
		Title: string;
		CreatedBy: string;
		Version: string;
		CreatedDate: string;
		NoDate: string;
	};
	NoItems: string;
}

declare module 'PnPListViewWebPartStrings' {
  const strings: IPnPListViewWebPartStrings;
  export = strings;
}
