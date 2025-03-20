import { ISearchResult } from "@pnp/sp/search";

export interface ISearchService {
	search(searchQuery: string, rowLimit?: number): Promise<ISearchResult[]>;
}