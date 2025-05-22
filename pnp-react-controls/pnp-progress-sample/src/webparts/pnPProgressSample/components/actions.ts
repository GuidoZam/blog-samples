import { IProgressAction } from "@pnp/spfx-controls-react/lib/controls/progress/IProgress";
import * as strings from "PnPProgressSampleWebPartStrings";

class BaseAction implements IProgressAction {
	title: string;
	subActionsTitles?: string[] | undefined;
	hasError?: boolean | undefined;
	errorMessage?: string | undefined;
}

export class InitialAction extends BaseAction {
	constructor() {
		super();
		this.title = strings.InitialActionTitle;
	}
}

export class PrerequisitesAction extends BaseAction {
	constructor() {
		super();
		this.title = strings.PrerequisitesActionTitle;
	}
}

export class MainAction extends BaseAction {
	constructor() {
		super();
		this.title = strings.MainActionTitle;
		this.subActionsTitles = [
			strings.MainActionStep1,
			strings.MainActionStep2,
			strings.MainActionStep3,
		];
	}
}

export class FinalAction extends BaseAction {
	constructor() {
		super();
		this.title = strings.FinalActionTitle;
		this.hasError = true;
		this.errorMessage = strings.ActionErrorMessage;
	}
}
