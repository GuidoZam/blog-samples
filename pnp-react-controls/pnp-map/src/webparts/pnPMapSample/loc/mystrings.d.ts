declare interface IPnPMapSampleWebPartStrings {
	Title: string;
	CustomMapTitle: string;
	LoadingMessage: string;
	SelectedLocationDiv: string;
	Labels: {
		MinimalUsage: string;
		Customized: string;
		SearchEnabled: string;
		CycleVisualization: string;
		StandardVisualization: string;
		NormalVisualization: string;
		TransportVisualization: string;
		CustomSize: string;
		DataRetrieval: string;
		DisplayName: string;
		Latitude: string;
		Longitude: string;
	};
}

declare module 'PnPMapSampleWebPartStrings' {
  const strings: IPnPMapSampleWebPartStrings;
  export = strings;
}
