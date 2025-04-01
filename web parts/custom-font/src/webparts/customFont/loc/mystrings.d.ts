declare interface ICustomFontWebPartStrings {
  Title: string;
  Content: string;
}

declare module 'CustomFontWebPartStrings' {
  const strings: ICustomFontWebPartStrings;
  export = strings;
}
