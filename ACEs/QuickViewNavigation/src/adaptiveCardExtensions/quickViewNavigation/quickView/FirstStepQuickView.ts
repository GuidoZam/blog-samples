import { ISPFxAdaptiveCard, BaseAdaptiveCardQuickView, IActionArguments } from '@microsoft/sp-adaptive-card-extension-base';
import * as strings from 'QuickViewNavigationAdaptiveCardExtensionStrings';
import {
  IQuickViewNavigationAdaptiveCardExtensionProps,
  IQuickViewNavigationAdaptiveCardExtensionState,
  SECOND_QUICK_VIEW_REGISTRY_ID
} from '../QuickViewNavigationAdaptiveCardExtension';

export interface IFirstStepQuickViewData {
	subTitle: string;
	title: string;
}

export class FirstQuickView extends BaseAdaptiveCardQuickView<
	IQuickViewNavigationAdaptiveCardExtensionProps,
	IQuickViewNavigationAdaptiveCardExtensionState,
	IFirstStepQuickViewData
> {
	public get data(): IFirstStepQuickViewData {
		return {
			title: strings.FirstStepTitle,
			subTitle: strings.FirstStepSubTitle,
		};
	}

	public onAction(action: IActionArguments): void {
		if (action.type === "Submit") {
			if (action.id === "next") {
				this.quickViewNavigator.push(SECOND_QUICK_VIEW_REGISTRY_ID);
			}
		}
	}

	public get template(): ISPFxAdaptiveCard {
		return require("./template/FirstQuickViewTemplate.json");
	}
}
