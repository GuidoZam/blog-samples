declare interface IBasicApplicationCustomizerStrings {
  TopMessage: string;
  BottomMessage: string;
  DialogMessage: string;
}

declare module 'BasicApplicationCustomizerStrings' {
  const strings: IBasicApplicationCustomizerStrings;
  export = strings;
}
