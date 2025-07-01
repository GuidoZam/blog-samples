declare interface IStorageSampleWebPartStrings {
	Title: string;
	TestFieldLabel: string;
	RetrievedValueTitle: string;
	NoValueStored: string;
}

declare module 'StorageSampleWebPartStrings' {
  const strings: IStorageSampleWebPartStrings;
  export = strings;
}
