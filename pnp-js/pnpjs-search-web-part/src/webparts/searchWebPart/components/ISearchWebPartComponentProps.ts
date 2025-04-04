import { SPFI } from "@pnp/sp";

export interface ISearchWebPartComponentProps {
	sp: SPFI;
	rowLimit?: number;
	siteUrl?: string;
	showTitle: boolean;
}
