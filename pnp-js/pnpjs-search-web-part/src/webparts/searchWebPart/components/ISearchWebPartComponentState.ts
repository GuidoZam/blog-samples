import { ISearchResult } from "@pnp/sp/search";

export interface ISearchWebPartComponentState {
	results: ISearchResult[];
	query?: string;
}
