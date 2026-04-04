declare interface ICheckboxListItemPickerSampleWebPartStrings {
  // Property Pane Strings
  PropertyPaneDescription: string;
  BasicGroupName: string;
  ListPickerLabel: string;
  DescriptionFieldLabel: string;
  
  // Component Strings
  WebPartTitle: string;
  NoListSelectedMessage: string;
  
  // Example Labels
  BasicSingleSelectionLabel: string;
  MultipleSelectionLabel: string;
  ODataFilterLabel: string;
  DefaultSelectionLabel: string;
  ItemLimitLabel: string;
  DisabledStateLabel: string;
  
  // Example Descriptions
  BasicSingleSelectionDescription: string;
  MultipleSelectionDescription: string;
  ODataFilterDescription: string;
  DefaultSelectionDescription: string;
  ItemLimitDescription: string;
  DisabledStateDescription: string;
  
  // Control Labels
  SelectAnItem: string;
  SelectMultipleItems: string;
  SelectItemsContaining: string;
  PreSelectedItemsExample: string;
  LimitedSelection: string;
  DisabledPicker: string;
  
  // Suggestions Headers
  AvailableItems: string;
  ChooseItemsMultiple: string;
  AvailableItemsFiltered: string;
  ItemsPreSelected: string;
  TopItemsAZ: string;
  PickerDisabled: string;
  
  // No Results Text
  NoItemsFound: string;
  NoMatchingItemsFound: string;
  NoItemsFoundFilter: string;
  NoItemsAvailable: string;
  NoMatchingItemsTop5: string;
  PickerIsDisabled: string;
  
  // Selection Display
  Selected: string;
  SelectedCount: string;
  SelectedFilteredItem: string;
  CurrentlySelected: string;
  SelectedFromLimitedList: string;
  
  // Environment Messages
  AppLocalEnvironmentSharePoint: string;
  AppLocalEnvironmentTeams: string;
  AppLocalEnvironmentOffice: string;
  AppLocalEnvironmentOutlook: string;
  AppSharePointEnvironment: string;
  AppTeamsTabEnvironment: string;
  AppOfficeEnvironment: string;
  AppOutlookEnvironment: string;
  UnknownEnvironment: string;
}

declare module 'CheckboxListItemPickerSampleWebPartStrings' {
  const strings: ICheckboxListItemPickerSampleWebPartStrings;
  export = strings;
}
