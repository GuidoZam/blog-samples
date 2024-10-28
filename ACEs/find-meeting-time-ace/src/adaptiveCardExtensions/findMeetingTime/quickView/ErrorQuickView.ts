import {
	ISPFxAdaptiveCard,
	IActionArguments,
	BaseAdaptiveCardQuickView,
} from "@microsoft/sp-adaptive-card-extension-base";
import * as strings from "FindMeetingTimeAdaptiveCardExtensionStrings";
import {
	IFindMeetingTimeAdaptiveCardExtensionProps,
	IFindMeetingTimeAdaptiveCardExtensionState
} from "../FindMeetingTimeAdaptiveCardExtension";

export interface IErrorQuickViewData {
	title: string;
	description: string;
	imageUrl: string;
}

export class ErrorQuickView extends BaseAdaptiveCardQuickView<
	IFindMeetingTimeAdaptiveCardExtensionProps,
	IFindMeetingTimeAdaptiveCardExtensionState,
	IErrorQuickViewData
> {
	public get data(): IErrorQuickViewData {
		return {
			title: strings.Error.Title,
			description: this.state.error || strings.Error.GenericDescription,
			imageUrl: require("../assets/error.png"),
		};
	}

	public get template(): ISPFxAdaptiveCard {
		return require("./template/ErrorQuickViewTemplate.json");
	}

	public onAction(action: IActionArguments): void {
		if (action.id === "close") {
			this.quickViewNavigator.pop();
		}
	}
}