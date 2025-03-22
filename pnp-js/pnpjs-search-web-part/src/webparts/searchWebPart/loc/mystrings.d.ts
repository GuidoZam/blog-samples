declare interface ISearchWebPartStrings {
	Title: string;
	SearchLabel: string;
	SearchPlaceholder: string;
	SearchResults: string;
	SearchButtonText: string;
	NoResultsFound: string;
	PropertyPane: {
		PropertyPaneDescription: string;
		SearchSettingsGroupName: string;
		RowLimitFieldLabel: string;
		SitePickerFieldLabel: string;
		AppearanceGroupName: string;
		ShowTitleFieldLabel: string;
	};
}

declare module 'SearchWebPartStrings' {
  const strings: ISearchWebPartStrings;
  export = strings;
}
