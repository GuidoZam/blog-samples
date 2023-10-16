/**
 * Defines the abstract interface for the Settings Service
 */
export interface ISettingsService {
	/**
	 * Retrieves the target URL
	 */
	GetTargetUrl: () => Promise<string | undefined>;
}
