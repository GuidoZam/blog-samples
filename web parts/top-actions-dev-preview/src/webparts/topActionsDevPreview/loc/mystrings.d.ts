declare interface ITopActionsDevPreviewWebPartStrings {
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
		ToggleTitle: string;
		ToggleText: string;
		ComboboxTitle: string;
		ComboboxPlaceholder: string;
		SplitTitle: string;
		SplitText: string;
		SplitButtonAriaLabel: string;
		SplitShare: string;
		SplitEmail: string;
		SplitCopy: string;
	};
}

declare module 'TopActionsDevPreviewWebPartStrings' {
  const strings: ITopActionsDevPreviewWebPartStrings;
  export = strings;
}
