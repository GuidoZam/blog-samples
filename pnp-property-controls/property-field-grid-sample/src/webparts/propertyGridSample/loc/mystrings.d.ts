declare interface IPropertyGridSampleWebPartStrings {
  PropertyPaneDescription: string;
  GridSettingsGroupName: string;
  ShowGridLabel: string;
  ShowGridOnText: string;
  ShowGridOffText: string;
  EnableMultiSelectionLabel: string;
  EnableMultiSelectionOnText: string;
  EnableMultiSelectionOffText: string;
  GridGroupName: string;
  GridFieldLabel: string;
  Title: string;
}

declare module 'PropertyGridSampleWebPartStrings' {
  const strings: IPropertyGridSampleWebPartStrings;
  export = strings;
}
