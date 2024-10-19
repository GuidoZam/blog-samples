declare interface IPnPLocationPickerWebPartStrings {
	MinimalConfigurationInstance: string;
	DefaultValueInstance: string;
	ErrorMessageInstance: string;
	ErrorMessageText: string;
  CustomStringsInstance: string;
	CustomStrings: {
		Label: string;
		Placeholder: string;
	};
	OnChangeInstance: string;
	DisabledInstance: string;
}

declare module 'PnPLocationPickerWebPartStrings' {
  const strings: IPnPLocationPickerWebPartStrings;
  export = strings;
}
