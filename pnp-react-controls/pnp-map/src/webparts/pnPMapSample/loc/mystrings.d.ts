declare interface IPnPMapSampleWebPartStrings {
	Title: string;
	CustomMapTitle: string;
	LoadingMessage: string;
  SelectedLocationDiv: string;
  DisplayName: string;
  Latitude: string;
  Longitude: string;
}

declare module 'PnPMapSampleWebPartStrings' {
  const strings: IPnPMapSampleWebPartStrings;
  export = strings;
}
