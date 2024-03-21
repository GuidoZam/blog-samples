declare interface IMgtPeopleWebPartStrings {
	PropertyPaneDescription: string;
	BasicGroupName: string;
	GroupIdFieldLabel: string;
	MaxPeopleFieldLabel: string;
	SpecifyQueriesInPropertyPane: string;
	Title: string;
	MinimalUsage: string;
	ShowPresence: string;
	ShowMaxPeople: string;
	PeopleOfSpecificGroup: string;
	CustomQuery: string;
}

declare module 'MgtPeopleWebPartStrings' {
  const strings: IMgtPeopleWebPartStrings;
  export = strings;
}
