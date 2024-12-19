import { IApprovalsService } from "./IApprovalsService";

// Import types for supporting SPFx with the service class
import { ServiceKey, ServiceScope } from "@microsoft/sp-core-library";
import { MSGraphClientFactory, MSGraphClientV3 } from "@microsoft/sp-http";
import { ApprovalItem } from "./models/ApprovalItem";

/**
 * Defines the concrete implementation of the interface for the Settings Service
 */
export class ApprovalsService implements IApprovalsService {
	public static readonly serviceKey: ServiceKey<IApprovalsService> =
		ServiceKey.create<IApprovalsService>(
			"SAMPLE:ApprovalsService",
			ApprovalsService
		);

	public IsReady: boolean = false;
	public UseGraphBetaEndpoint: boolean = false;

	private _graphService: MSGraphClientV3;

	/**
	 * Constructor for the service class
	 * @param serviceScope Service Scope to initialize the service class
	 */
	public constructor(serviceScope: ServiceScope) {
		serviceScope.whenFinished(async () => {
			const graphClientFactory = serviceScope.consume(
				MSGraphClientFactory.serviceKey
			);
			this._graphService = await graphClientFactory.getClient("3");
			this.IsReady = true;
		});
	}

	public async ListTasks(): Promise<[value: ApprovalItem[], nextLink?: string]> {
		// Get user's groups
		const approvalsTasks = await this._loadData<ApprovalItem>(
			"/solutions/approval/approvalItems",
			10
		);

		return approvalsTasks;
	}

	GetTask: (taskId: string) => Promise<void>;
	CreateTask: (task: any) => Promise<void>;
	UpdateTask: (task: any) => Promise<void>;
	DeleteTask: (taskId: string) => Promise<void>;

	private async _loadData<T>(
		targetURL: string,
		top?: number
	): Promise<[value: T[], nextLink?: string]> {
		let allItems: T[] = [];

		// Determine the API version to use
		const apiVersion = this.UseGraphBetaEndpoint ? "beta" : "v1.0";

		// Create the request with the specified URL and API version
		let request = this._graphService.api(targetURL).version(apiVersion);

		// Add the top query parameter if specified
		if (top) {
			request = request.top(top);
		}

		// Execute the request
		const response = await request.get();

		// Append the items to the list
		allItems = allItems.concat(response.value);

		// Check if there are more items to load
		const nextLink = response["@odata.nextLink"];

		return [allItems, nextLink];
	}
}
