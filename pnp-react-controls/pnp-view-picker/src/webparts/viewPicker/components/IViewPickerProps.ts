import { WebPartContext } from '@microsoft/sp-webpart-base';

export interface IViewPickerProps {
	description: string;
	context: WebPartContext;
	listId: string;
	defaultSelectedView: string;
}
