declare interface ISearchBoxSampleWebPartStrings {
	Title: string;
	Placeholder: string;
	BasicUsageLabel: string;
	CustomTermLabel: string;
	CustomPlaceholderLabel: string;
	CustomDebounceDelayLabel: string;
	SearchTermChangedEventLabel: string;
	ChangedSearchTermLabel: string;
	ChangedDebounceSearchTermLabel: string;
}

declare module 'SearchBoxSampleWebPartStrings' {
  const strings: ISearchBoxSampleWebPartStrings;
  export = strings;
}
