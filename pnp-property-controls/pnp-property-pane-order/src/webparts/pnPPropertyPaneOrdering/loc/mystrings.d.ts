declare interface IPnPPropertyPaneOrderingWebPartStrings {
	PropertyPaneDescription: string;
	BasicGroupName: string;
	DescriptionFieldLabel: string;

	// Page headers and groups
	DemoPageDescription: string;
	MinimalOrderGroupName: string;
	DisabledOrderGroupName: string;
	NoArrowsOrderGroupName: string;
	NoDragDropOrderGroupName: string;
	CustomIconsOrderGroupName: string;
	CustomRenderGroupName: string;

	// Control labels
	MinimalOrderLabel: string;
	DisabledOrderLabel: string;
	NoArrowsOrderLabel: string;
	NoDragDropOrderLabel: string;
	CustomIconsOrderLabel: string;
	CustomRenderLabel: string;
	CustomUpIconLabel: string;
	CustomDownIconLabel: string;

	// Component strings
	RacingResultsTitle: string;
	NoCharactersMessage: string;
	DemoTitle: string;
	DemoDescription1: string;
	DemoDescription2: string;
	MinimalOrderSectionTitle: string;
	SelectedOrderSectionTitle: string;
	DisabledOrderSectionTitle: string;
	NoArrowsOrderSectionTitle: string;
	NoDragDropOrderSectionTitle: string;
	CustomIconsOrderSectionTitle: string;
	CustomRenderOrderSectionTitle: string;

	// Environment strings
	AppLocalEnvironmentSharePoint: string;
	AppLocalEnvironmentTeams: string;
	AppLocalEnvironmentOffice: string;
	AppLocalEnvironmentOutlook: string;
	AppSharePointEnvironment: string;
	AppTeamsTabEnvironment: string;
	AppOfficeEnvironment: string;
	AppOutlookEnvironment: string;
	UnknownEnvironment: string;
}

declare module 'PnPPropertyPaneOrderingWebPartStrings' {
  const strings: IPnPPropertyPaneOrderingWebPartStrings;
  export = strings;
}
