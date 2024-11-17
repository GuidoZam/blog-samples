import { WebPartContext } from "@microsoft/sp-webpart-base";

export interface ISecurityTrimmedControlSampleProps {
	siteUrl: string;
	listUrl: string;
	itemId: number;
	context: WebPartContext;
}
