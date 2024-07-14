declare interface IMgtLocalizationWebPartStrings {
	Title: string;
	Login: string;
  PersonCard: string;
  PeoplePicker: string;
  TaxonomyPicker: string;
}

declare module 'MgtLocalizationWebPartStrings' {
  const strings: IMgtLocalizationWebPartStrings;
  export = strings;
}
