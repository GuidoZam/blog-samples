import { IListItem } from './IListViewContextualMenuState';

export interface IContextualMenuProps {
	item: IListItem;
	onAction?: (action: string, item: IListItem) => void;
}
