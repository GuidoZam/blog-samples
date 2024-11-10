declare interface IGeolocationAceAdaptiveCardExtensionStrings {
	Title: string;
	PrimaryText: string;
	QuickViewButton: string;
	ShowCurrentLocation: string;
	Latitude: string;
	Longitude: string;
	TBD: string;
  QuickView: {
    ChooseLocationOnMap: string;
    GetMyLocation: string;
    CustomLocation: string;
    Description: string;
  }
}

declare module 'GeolocationAceAdaptiveCardExtensionStrings' {
  const strings: IGeolocationAceAdaptiveCardExtensionStrings;
  export = strings;
}
