declare interface IListViewContextualMenuWebPartStrings {
  PropertyPaneDescription: string;
  BasicGroupName: string;
  DescriptionFieldLabel: string;
  
  // Component Titles
  MainTitle: string;
  
  // ListView Column Headers
  ColumnTitle: string;
  ColumnDepartment: string;
  ColumnStatus: string;
  ColumnPriority: string;
  ColumnActions: string;
  
  // Status Values
  StatusInProgress: string;
  StatusCompleted: string;
  StatusPending: string;
  
  // Priority Values
  PriorityHigh: string;
  PriorityMedium: string;
  PriorityLow: string;
}

declare module 'ListViewContextualMenuWebPartStrings' {
  const strings: IListViewContextualMenuWebPartStrings;
  export = strings;
}
