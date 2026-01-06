declare interface IMermaidDiagramWebPartStrings {
	PropertyPaneDescription: string;
	ConfigurationGroupName: string;
  StylingGroupName: string;
	TitleFieldLabel: string;
	ShowTitleFieldLabel: string;
	ShowBorderFieldLabel: string;
	MermaidDiagramFieldLabel: string;
	MermaidDiagramPanelTitle: string;
	DefaultTitle: string;
}

declare module 'MermaidDiagramWebPartStrings' {
  const strings: IMermaidDiagramWebPartStrings;
  export = strings;
}
