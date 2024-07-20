declare interface IMgtToDoWebPartStrings {
	Title: string;
	MinimalInstanceTitle: string;
	ReadOnlyTitle: string;
	InitialFolderTitle: string;
	TargetFolderTitle: string;
	PropertyPaneDescription: string;
	PropertyPaneGroupName: string;
	InitialFolderLabel: string;
	TargetFolderLabel: string;
	HighImportanceTaskFilterTitle: string;
  NotCompletedTaskFilterTitle: string;
}

declare module 'MgtToDoWebPartStrings' {
  const strings: IMgtToDoWebPartStrings;
  export = strings;
}
