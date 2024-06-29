declare interface IMgtSearchResultWebPartStrings {
	PropertyPaneDescription: string;
	SettingsGroupName: string;
	Title: string;
	QueryLabel: string;
	UseWildcardLabel: string;
	UseCustomTmeplateLabel: string;
	MaxResultCountLabel: string;
	MaxAvailablePaginationLabel: string;
}

declare module 'MgtSearchResultWebPartStrings' {
  const strings: IMgtSearchResultWebPartStrings;
  export = strings;
}
