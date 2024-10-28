declare interface IFindMeetingTimeAdaptiveCardExtensionStrings {
	PropertyPaneDescription: string;
	TitleFieldLabel: string;
	SelectTimeTitle: string;
	SelectTimeSubTitle: string;
	PrimaryText: string;
	Description: string;
	QuickViewButton: string;
	AttendeeSearchPlaceholder: string;
	CardFooterTitle: string;
	CardFooterText: string;
	Success: {
		Title: string;
		Description: string;
	};
	Error: {
		Title: string;
		GenericDescription: string;
	};
}

declare module 'FindMeetingTimeAdaptiveCardExtensionStrings' {
  const strings: IFindMeetingTimeAdaptiveCardExtensionStrings;
  export = strings;
}
