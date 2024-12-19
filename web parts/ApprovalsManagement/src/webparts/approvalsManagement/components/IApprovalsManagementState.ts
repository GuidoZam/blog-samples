import { ApprovalItem } from "../../../services/models/ApprovalItem";

export interface IApprovalsManagementState {
	status: AppStatus;
	nextLink?: string;
	error?: string;
	tasks: ApprovalItem[];
}

export enum AppStatus {
	Loading,
	Loaded,
	Error
}