import { ISearchService } from './ISearchService';
import { SPFI } from '@pnp/sp';
import { ISearchQuery, ISearchResult } from "@pnp/sp/search";
import "@pnp/sp/search";

export default class SearchService implements ISearchService {
	private _sp: SPFI;

	constructor(sp: SPFI) {
		this._sp = sp;
	}

	public async search(
		searchQuery: string,
		rowLimit?: number,
		siteUrl?: string
	): Promise<ISearchResult[]> {
		if (siteUrl && siteUrl.length > 0) {
			searchQuery = `{searchQuery} path:{siteUrl}`;
		}

		const query: ISearchQuery = {
			Querytext: searchQuery,
			RowLimit: rowLimit ?? 5,
		};

		const searchResults = await this._sp.search(query);

		if (searchResults.TotalRows === 0) {
			return [];
		}

		return searchResults.PrimarySearchResults.map(
			(result: { Title: string; OriginalPath: string}) => {
				return {
					Title: result.Title,
					OriginalPath: result.OriginalPath
				};
			}
		);
	}
}