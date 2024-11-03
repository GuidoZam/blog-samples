declare interface IBasicListViewCommandSetStrings {
  Command1: string;
  Command2: string;
}

declare module 'BasicListViewCommandSetStrings' {
  const strings: IBasicListViewCommandSetStrings;
  export = strings;
}
