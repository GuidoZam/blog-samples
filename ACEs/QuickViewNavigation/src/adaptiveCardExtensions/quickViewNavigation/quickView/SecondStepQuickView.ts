import { ISPFxAdaptiveCard, BaseAdaptiveCardQuickView, IActionArguments } from '@microsoft/sp-adaptive-card-extension-base';
import * as strings from 'QuickViewNavigationAdaptiveCardExtensionStrings';
import {
  IQuickViewNavigationAdaptiveCardExtensionProps,
  IQuickViewNavigationAdaptiveCardExtensionState,
  THIRD_QUICK_VIEW_REGISTRY_ID
} from '../QuickViewNavigationAdaptiveCardExtension';

export interface ISecondQuickViewData {
  subTitle: string;
  title: string;
}

export class SecondQuickView extends BaseAdaptiveCardQuickView<
	IQuickViewNavigationAdaptiveCardExtensionProps,
	IQuickViewNavigationAdaptiveCardExtensionState,
	ISecondQuickViewData
> {
	public get data(): ISecondQuickViewData {
		return {
      title: strings.SecondStepTitle,
			subTitle: strings.SecondStepSubTitle
		};
	}

	public onAction(action: IActionArguments): void {
		if (action.type === "Submit") {
			if (action.id === "next") {
        this.quickViewNavigator.push(THIRD_QUICK_VIEW_REGISTRY_ID);
			}
		}
	}

	public get template(): ISPFxAdaptiveCard {
		return require("./template/SecondQuickViewTemplate.json");
	}
}
