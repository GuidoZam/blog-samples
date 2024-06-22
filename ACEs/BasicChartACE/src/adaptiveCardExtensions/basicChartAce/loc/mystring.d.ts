declare interface IBasicChartAceAdaptiveCardExtensionStrings {
	Title: string;
	SubTitle: string;
	PrimaryText: string;
	Description: string;
	QuickViewButton: string;
	APIGroupName: string;
	APIKeyGroupName: string;
	APIKeyFieldLabel: string;
	SymbolsFieldLabel: string;
	IntervalFieldLabel: string;
	ValueToShowFieldLabel: string;
	Open: string;
	High: string;
	Low: string;
	Close: string;
	Volume: string;
	ConfigureYourACE: {
		Title: string;
		MissingConfiguration: string;
		RateLimitReached: string;
		ErrorOccurred: string;
	};
}

declare module 'BasicChartAceAdaptiveCardExtensionStrings' {
  const strings: IBasicChartAceAdaptiveCardExtensionStrings;
  export = strings;
}
