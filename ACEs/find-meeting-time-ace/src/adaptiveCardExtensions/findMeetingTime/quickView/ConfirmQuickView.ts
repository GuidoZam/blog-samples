import {
	ISPFxAdaptiveCard,
	IActionArguments,
	BaseAdaptiveCardQuickView,
} from "@microsoft/sp-adaptive-card-extension-base";
import * as strings from "FindMeetingTimeAdaptiveCardExtensionStrings";
import {
	IFindMeetingTimeAdaptiveCardExtensionProps,
	IFindMeetingTimeAdaptiveCardExtensionState,
} from "../FindMeetingTimeAdaptiveCardExtension";

export interface IConfirmQuickViewData {
	title: string;
	description: string;
	imageUrl: string;
}

export class ConfirmQuickView extends BaseAdaptiveCardQuickView<
	IFindMeetingTimeAdaptiveCardExtensionProps,
	IFindMeetingTimeAdaptiveCardExtensionState,
	IConfirmQuickViewData
> {
	public get data(): IConfirmQuickViewData {
		return {
			title: strings.Success.Title,
			description: strings.Success.Description,
			imageUrl: require("../assets/success.png"),
		};
	}

	public get template(): ISPFxAdaptiveCard {
		return require("./template/ConfirmQuickViewTemplate.json");
	}

	public onAction(action: IActionArguments): void {
		if (action.id === "close") {
			this.quickViewNavigator.pop();
		}
	}
}
