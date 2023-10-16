import { ISettingsService } from "./ISettingsService";

// Import types for supporting SPFx with the service class
import { ServiceKey, ServiceScope } from "@microsoft/sp-core-library";
import { PageContext } from "@microsoft/sp-page-context";
import { spfi, SPFI, SPFx } from "@pnp/sp";
import "@pnp/sp/appcatalog";
import { Settings } from "./Settings";

/**
 * Defines the concrete implementation of the interface for the Settings Service
 */
export class SettingsService implements ISettingsService {
	public static readonly serviceKey: ServiceKey<ISettingsService> =
		ServiceKey.create<ISettingsService>(
			"Sample:SettingsService",
			SettingsService
		);

	private _sp: SPFI;
	private settingsKey: string = "Sample:Settings";

	/**
	 * Constructor for the service class
	 * @param serviceScope Service Scope to initialize the service class
	 */
	public constructor(serviceScope: ServiceScope) {
		serviceScope.whenFinished(async () => {
			const pageContext: PageContext = serviceScope.consume(
				PageContext.serviceKey
			);
			this._sp = spfi().using(SPFx({ pageContext }));
		});
	}

	/**
	 * Retrieves the target URL from the tenant settings
	 */
	public async GetTargetUrl(): Promise<string | undefined> {
		const settings = await this.Load();

		return settings?.targetUrl;
	}

	/**
	 * Load the settings
	 */
	private async Load(): Promise<Settings | undefined> {
		const appCatalog = await this._sp.getTenantAppCatalogWeb();
		const settings = await appCatalog.getStorageEntity(this.settingsKey);

		if (settings && settings.Value) {
			return JSON.parse(settings.Value);
		} else {
			return undefined;
		}
	}
}
