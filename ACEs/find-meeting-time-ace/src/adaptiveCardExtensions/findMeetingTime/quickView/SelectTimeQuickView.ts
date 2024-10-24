import { ISPFxAdaptiveCard, BaseAdaptiveCardQuickView, IActionArguments } from '@microsoft/sp-adaptive-card-extension-base';
import * as strings from 'FindMeetingTimeAdaptiveCardExtensionStrings';
import {
	CONFIRM_QUICK_VIEW_REGISTRY_ID,
  ERROR_QUICK_VIEW_REGISTRY_ID,
  IFindMeetingTimeAdaptiveCardExtensionProps,
  IFindMeetingTimeAdaptiveCardExtensionState
} from '../FindMeetingTimeAdaptiveCardExtension';

export interface IQuickViewData {
  subTitle: string;
  title: string;
}

export class SelectTimeQuickView extends BaseAdaptiveCardQuickView<
	IFindMeetingTimeAdaptiveCardExtensionProps,
	IFindMeetingTimeAdaptiveCardExtensionState,
	IQuickViewData
> {
	public get data(): IQuickViewData {
		return {
			subTitle: strings.SubTitle,
			title: strings.Title,
		};
	}

	public get template(): ISPFxAdaptiveCard {
		return require("./template/SelectTimeQuickViewTemplate.json");
	}

	public onAction(action: IActionArguments | any): void {
		if (action.type === "Submit") {
			try {
				this._submit(action);
				this.quickViewNavigator.push(CONFIRM_QUICK_VIEW_REGISTRY_ID);
			} catch (error) {
				this.quickViewNavigator.push(ERROR_QUICK_VIEW_REGISTRY_ID);
			}
		}
	}

	private _submit(action: IActionArguments): void {
		// Add your logic here
	}
}
