declare interface IHelloFunctionalWebPartStrings {
	PropertyPaneDescription: string;
	PropertyPaneGroupName: string;
	Title: string;
	FunctionalMessage: string;
	ClassMessage: string;
	Counter: string;
	Increment: string;
	Reset: string;
	ToggleLabel: string;
	ToggleOnText: string;
	ToggleOffText: string;
}

declare module 'HelloFunctionalWebPartStrings' {
  const strings: IHelloFunctionalWebPartStrings;
  export = strings;
}
