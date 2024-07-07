declare interface IPnPDashboardSampleWebPartStrings {
	FirstWidget: {
		Title: string;
		Description: string;
		PrincipalTab: string;
		PrincipalTabContent: string;
		SecondaryTab: string;
		SecondaryTabContent: string;
		LastTab: string;
		LastTabContent: string;
	};
	SecondWidget: {
		Title: string;
		ContentTitle: string;
	};
	ThirdWidget: {
		Title: string;
		ContentTitle: string;
		Description: string;
	};
	FourthWidget: {
		Title: string;
		Header: string;
		ArticleContent: string;
	};
	FifthWidget: {
		Title: string;
		Header: string;
		ArticleContent: string;
	};
	SixthWidget: {
		Title: string;
		Header: string;
		ArticleContent: string;
	};
}

declare module 'PnPDashboardSampleWebPartStrings' {
  const strings: IPnPDashboardSampleWebPartStrings;
  export = strings;
}
