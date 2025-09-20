declare interface IImageHelperWebPartStrings {
	Title: string;
	SelectWidth: string;
	ResultTitle: string;
	NoImage: string;
  URL: string;
}

declare module 'ImageHelperWebPartStrings' {
  const strings: IImageHelperWebPartStrings;
  export = strings;
}
