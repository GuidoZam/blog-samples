import { Approver } from "./Approver";
import { Owner } from "./Owner";
import { ViewPoint } from "./ViewPoint";

export interface ApprovalItem {
  id: string;
  displayName: string;
  approvalType: string;
  createdDateTime: string;
  allowCancel: boolean;
  allowEmailNotification: any;
  description?: string;
  completedDateTime?: string;
  responsePrompts: string[];
  state: string;
  result?: string;
  approvers: Approver[];
  viewPoint: ViewPoint;
  owner: Owner;
}
