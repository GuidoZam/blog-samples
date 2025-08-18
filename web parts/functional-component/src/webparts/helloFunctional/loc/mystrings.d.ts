declare interface IHelloFunctionalWebPartStrings {
  Title: string;
  FunctionalMessage: string;
  ClassMessage: string;
  Increment: string;
  Reset: string;
}

declare module 'HelloFunctionalWebPartStrings' {
  const strings: IHelloFunctionalWebPartStrings;
  export = strings;
}
