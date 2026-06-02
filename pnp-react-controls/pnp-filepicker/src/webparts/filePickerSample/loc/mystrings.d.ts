declare interface IFilePickerSampleWebPartStrings {
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
  
  // FilePicker strings
  PageTitle: string;
  PageDescription: string;
  FilePickerLabel: string;
  FilePickerButtonLabel: string;
  SelectedFileLabel: string;
  NoFileSelectedMessage: string;
  FileNameLabel: string;
  FileUrlLabel: string;
  FileSizeLabel: string;
  DownloadFileLabel: string;
  ClearSelectionLabel: string;
  FilePickerDescription: string;
  BytesLabel: string;
  
  // Example sections
  Example1Title: string;
  Example1Description: string;
  Example2Title: string;
  Example2Description: string;
  Example3Title: string;
  Example3Description: string;
  Example4Title: string;
  Example4Description: string;
  Example5Title: string;
  Example5Description: string;
  Example6Title: string;
  Example6Description: string;
  Example7Title: string;
  Example7Description: string;
  Example8Title: string;
  Example8Description: string;
  Example9Title: string;
  Example9Description: string;
  Example10Title: string;
  Example10Description: string;
  
  // Additional labels
  SelectFile: string;
  PickDocument: string;
  FileChangedMessage: string;
  FileCancelledMessage: string;
  OnlyDocxPdfLabel: string;
  RequiredFileLabel: string;
  DisabledPickerLabel: string;
  HiddenPickerLabel: string;
  ToggleVisibilityButton: string;
  ShowPicker: string;
  HidePicker: string;
  CheckFileExistsLabel: string;
  TabVisibilityLabel: string;
  TabVisibilityDescription: string;
  HideRecentTab: string;
  HideWebSearchTab: string;
  HideStockImages: string;
  HideOrganisationalAssetTab: string;
  HideOneDriveTab: string;
  HideSiteFilesTab: string;
  HideLocalUploadTab: string;
  HideLocalMultipleUploadTab: string;
  HideLinkUploadTab: string;
}

declare module 'FilePickerSampleWebPartStrings' {
  const strings: IFilePickerSampleWebPartStrings;
  export = strings;
}
