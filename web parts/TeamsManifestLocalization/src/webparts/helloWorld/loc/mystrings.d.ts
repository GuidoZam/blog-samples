declare interface IHelloWorldWebPartStrings {
	PropertyPaneDescription: string;
	BasicGroupName: string;
	DescriptionFieldLabel: string;
	WelcomeString: string;
}

declare module 'HelloWorldWebPartStrings' {
  const strings: IHelloWorldWebPartStrings;
  export = strings;
}
