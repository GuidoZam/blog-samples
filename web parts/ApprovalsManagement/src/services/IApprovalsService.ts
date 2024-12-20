import { ApprovalItem } from "./models/ApprovalItem";

/**
 * Defines the abstract interface for the Approvals Service
 */
export interface IApprovalsService {
	IsReady: boolean;
	UseGraphBetaEndpoint: boolean;

	/**
	 * List all the Approvals tasks
	 */
	ListTasks: (hideCompleted?: boolean) => Promise<[value: ApprovalItem[], nextLink?: string]>;

	/**
	 * Get a specific Approvals task
	 */
	GetTask: (taskId: string) => Promise<void>;

	/**
	 * Create a new Approvals task
	 */
	CreateTask: (task: any) => Promise<void>;

	/**
	 * Update an existing Approvals task
	 */
	UpdateTask: (task: any) => Promise<void>;

	/**
	 * Delete an existing Approvals task
	 */
	DeleteTask: (taskId: string) => Promise<void>;
}
