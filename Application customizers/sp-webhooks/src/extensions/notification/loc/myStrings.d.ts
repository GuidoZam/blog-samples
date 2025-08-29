declare interface INotificationApplicationCustomizerStrings {
  Title: string;
  NoPropertiesProvided: string;
  MessagePrefix: string;
}

declare module 'NotificationApplicationCustomizerStrings' {
  const strings: INotificationApplicationCustomizerStrings;
  export = strings;
}
