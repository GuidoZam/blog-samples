declare interface IPnPProgressSampleWebPartStrings {
	PropertyPaneDescription: string;
	BasicGroupName: string;
	DescriptionFieldLabel: string;
	Title: string;
	ProgressTitle: string;
	InitialActionTitle: string;
	PrerequisitesActionTitle: string;
	MainActionTitle: string;
	FinalActionTitle: string;
	LongRunningText: string;
	JustPlayWithButtonsText: string;
	Buttons: {
		Back: string;
		Next: string;
	};
	ShowProgressLabel: string;
	ShowIndeterminateOverallProgressFieldLabel: string;
	HideNotStartedActionsFieldLabel: string;
	ActionErrorMessage: string;
	MainActionStep1: string;
	MainActionStep2: string;
	MainActionStep3: string;
}

declare module 'PnPProgressSampleWebPartStrings' {
  const strings: IPnPProgressSampleWebPartStrings;
  export = strings;
}
