declare interface IPnPDashboardSampleWebPartStrings {
	FirstWidget: {
		Title: string;
		Description: string;
    PrincipalTab: string;
    SecondaryTab: string;
    LastTab: string;
	};
	SecondWidget: {
		Title: string;
    ContentTitle: string;
	};
	ThirdWidget: {
    Title: string;
  }
}

declare module 'PnPDashboardSampleWebPartStrings' {
  const strings: IPnPDashboardSampleWebPartStrings;
  export = strings;
}
