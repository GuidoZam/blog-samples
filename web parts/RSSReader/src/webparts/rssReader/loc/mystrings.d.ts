declare interface IRssReaderWebPartStrings {
	PropertyPaneDescription: string;
	BasicGroupName: string;
	RSSUrlFieldLabel: string;
	RssReaderTitle: string;
	Loading: string;
	ErrorLabel: string;
	MaxItemCountFieldLabel: string;
}

declare module 'RssReaderWebPartStrings' {
  const strings: IRssReaderWebPartStrings;
  export = strings;
}
