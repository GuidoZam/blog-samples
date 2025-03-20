import { ISearchService } from './ISearchService';
import { SPFI } from '@pnp/sp';
import { ISearchQuery, ISearchResult } from "@pnp/sp/search";
import "@pnp/sp/search";

export default class SearchService implements ISearchService {
	private _sp: SPFI;

	constructor(sp: SPFI) {
		this._sp = sp;
	}

	public async search(searchQuery: string, rowLimit?: number): Promise<ISearchResult[]> {
		const query: ISearchQuery = {
			// SelectProperties: [
			// 	"editorowsuser",
			// 	"authorowsuser",
			// 	"Filename",
			// 	"SPSiteURL",
			// 	"Title",
			// 	"ParentLink",
			// 	"ListItemID",
			// 	"ListID",
			// 	"contentclass",
			// 	"IsDocument",
			// 	"IsContainer",
			// 	"FileExtension",
			// 	"SecondaryFileExtension",
			// 	"OriginalPath",
			// 	"DefaultEncodingURL",
			// 	"ServerRedirectedURL",
			// 	"ServerRedirectedPreviewURL",
			// 	"LastModifiedTime",
			// 	"SharedWithUsersOWSUser",
			// 	"HitHighlightedSummary",
			// 	"ModifierDates",
			// 	"LastModifiedTimeForRetention",
			// 	"CreatedBy",
			// ],
			Querytext: searchQuery,
			RowLimit: rowLimit ?? 5,
		};

		const searchResults = await this._sp.search(query);

		return searchResults.PrimarySearchResults.map(
			(result: {
				Title: string;
				SecondaryFileExtension: string;
				Path: string;
				DefaultEncodingURL: string;
				ParentLink: string;
				SPSiteURL: string;
				CreatedBy: string;
				authorowsuser: string;
			}) => {
				console.log(result);
				return {
					Title: result.Title,
					FileExtension: result.SecondaryFileExtension,
					FileUrl: result.Path,
					DefaultEncodingUrl: result.DefaultEncodingURL,
					ParentLink: result.ParentLink,
					SPSiteURL: result.SPSiteURL,
					CreatedBy: result.CreatedBy,
					AuthorOWSUser: result.authorowsuser,
				};
			}
		);
	}
}