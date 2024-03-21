declare interface IMgtPickerWebPartStrings {
	PropertyPaneDescription: string;
	BasicGroupName: string;
	DescriptionFieldLabel: string;
	SelectTaskList: string;
	SelectTask: string;
	SelectedTask: string;
	Status: string;
	Importance: string;
	Tasks: string;
	Users: string;
	SelectUser: string
  Events: string;
  SelectEvent: string;
	Title: string;
}

declare module 'MgtPickerWebPartStrings' {
  const strings: IMgtPickerWebPartStrings;
  export = strings;
}
