import { ISearchResult } from "@pnp/sp/search";

export interface ISearchService {
	search(searchQuery: string): Promise<ISearchResult[]>;
}