declare interface IPersonalSettingsWebPartStrings {
  Title: string;
  SaveConfig: string;
  LoadConfig: string;
  ConfigLabel: string;
  ConfigContentPlaceholder: string;
  Loading: string;
}

declare module 'PersonalSettingsWebPartStrings' {
  const strings: IPersonalSettingsWebPartStrings;
  export = strings;
}
