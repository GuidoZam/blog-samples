export interface IMgtSearchResultState {
	query?: string;
	useWildcard?: boolean;
	useCustomTemplate: boolean;
	maxResultCount?: number;
	maxAvailablePagination?: number;
}
