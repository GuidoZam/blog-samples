declare interface IDateTimePickerWebPartStrings {
  PropertyPaneDescription: string;
  BasicGroupName: string;
  DescriptionFieldLabel: string;
  AppLocalEnvironmentSharePoint: string;
  AppLocalEnvironmentTeams: string;
  AppLocalEnvironmentOffice: string;
  AppLocalEnvironmentOutlook: string;
  AppSharePointEnvironment: string;
  AppTeamsTabEnvironment: string;
  AppOfficeEnvironment: string;
  AppOutlookEnvironment: string;
  UnknownEnvironment: string;
  
  // DateTimePicker control labels
  DateTime12Hour: string;
  Select12HourDateTime: string;
  DateTime24Hour: string;
  Select24HourDateTime: string;
  DateOnly: string;
  SelectDateOnly: string;
  WithSeconds: string;
  TimeWithSeconds: string;
  DropdownTime: string;
  SelectWithDropdowns: string;
  WithRestrictions: string;
  DateWithRestrictions: string;
  WithDefaultValue: string;
  PresetDate: string;
  DisabledPicker: string;
  PickerIsDisabled: string;
}

declare module 'DateTimePickerWebPartStrings' {
  const strings: IDateTimePickerWebPartStrings;
  export = strings;
}
