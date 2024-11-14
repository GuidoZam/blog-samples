declare interface ICustomFormFormatterWebPartStrings {
	PropertyPaneDescription: string;
	BasicGroupName: string;
	SiteUrlFieldLabel: string;
	TargetListFieldLabel: string;
	ContentTypeFieldLabel: string;
	JsonHeaderFormatFieldLabel: string;
	JsonBodyFormatFieldLabel: string;
	JsonFooterFormatFieldLabel: string;
	FailedToUpdateContentType: string;
	SuccessMessage: string;
	FailedToRetrieveFormDigest: string;
	GenericError: string;
	Title: string;
	Description: string;
	ApplyFormatting: string;
}

declare module 'CustomFormFormatterWebPartStrings' {
  const strings: ICustomFormFormatterWebPartStrings;
  export = strings;
}
