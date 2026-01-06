declare interface ITopActionSampleWebPartStrings {
  Title: string;
  Description: string;
	TopActions: {
		ButtonTitle: string;
		ButtonText: string;
    DropdownTitle: string;
    DropdownOptionOff: string;
    DropdownOptionWarning: string;
    DropdownOptionError: string;
    DropdownOptionVerbose: string;
	};
}

declare module 'TopActionSampleWebPartStrings' {
  const strings: ITopActionSampleWebPartStrings;
  export = strings;
}
