declare interface IStorageSampleWebPartStrings {
	Title: string;
	TestFieldLabel: string;
	RetrieveValueTitle: string;
	ValueRetrievedLabel: string;
	NoValueStored: string;
	SaveButtonText: string;
	DeleteFromStorageButtonText: string;
	RetrieveButtonText: string;
	ExpirationSliderLabel: string;
  NotificationValueSaved: string;
  NotificationValueDeleted: string;
  NotificationValueRetrieved: string;
	StorageTypeLabel: string;
	StorageTypeLocal: string;
	StorageTypeSession: string;
}

declare module 'StorageSampleWebPartStrings' {
  const strings: IStorageSampleWebPartStrings;
  export = strings;
}
