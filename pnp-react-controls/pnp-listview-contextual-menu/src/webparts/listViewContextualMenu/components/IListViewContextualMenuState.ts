export interface IListViewContextualMenuState {
  items: IListItem[];
}

export interface IListItem {
  ID: number;
  Title: string;
  Department: string;
  Status: string;
  Priority: string;
}
