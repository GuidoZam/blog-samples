declare interface ISearchWebPartStrings {
	Title: string;
	SearchLabel: string;
	SearchPlaceholder: string;
	SearchResults: string;
	SearchButtonText: string;
	PropertyPane: {
		PropertyPaneDescription: string;
		BasicGroupName: string;
		RowLimitFieldLabel: string;
	};
}

declare module 'SearchWebPartStrings' {
  const strings: ISearchWebPartStrings;
  export = strings;
}
