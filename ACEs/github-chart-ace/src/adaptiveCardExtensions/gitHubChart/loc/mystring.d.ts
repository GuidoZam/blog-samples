declare interface IGitHubChartAdaptiveCardExtensionStrings {
	SettingsPaneDescription: string;
	SecurityPageDescription: string;
	APIKeyFieldLabel: string;
	ChartTypeFieldLabel: string;
	ChartTypeFieldOptions: {
		Bar: string;
		Pie: string;
		Donut: string;
		Line: string;
	};
	Title: string;
  NeedsConfiguration: {
    Title: string;
    Header: string;
  };
}

declare module 'GitHubChartAdaptiveCardExtensionStrings' {
  const strings: IGitHubChartAdaptiveCardExtensionStrings;
  export = strings;
}
