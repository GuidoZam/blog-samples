import { ISPFxAdaptiveCard, BaseAdaptiveCardQuickView, IActionArguments, QuickViewNavigator, BaseQuickView } from '@microsoft/sp-adaptive-card-extension-base';
import * as strings from 'QuickViewNavigationAdaptiveCardExtensionStrings';
import {
  IQuickViewNavigationAdaptiveCardExtensionProps,
  IQuickViewNavigationAdaptiveCardExtensionState
} from '../QuickViewNavigationAdaptiveCardExtension';

export interface IThirdQuickViewData {
  subTitle: string;
  title: string;
}

export class ThirdQuickView extends BaseAdaptiveCardQuickView<
	IQuickViewNavigationAdaptiveCardExtensionProps,
	IQuickViewNavigationAdaptiveCardExtensionState,
	IThirdQuickViewData
> {
	public get data(): IThirdQuickViewData {
		return {
      title: strings.ThirdStepTitle,
      subTitle: strings.ThirdStepSubTitle
		};
	}

	public onAction(action: IActionArguments): void {
		if (action.type === "Submit") {
			if (action.id === "close") {
        // To use the close method of the QuickViewNavigator, we need to cast it to the QuickViewNavigator type
        const nav = this.quickViewNavigator as QuickViewNavigator<BaseQuickView<IQuickViewNavigationAdaptiveCardExtensionProps, IQuickViewNavigationAdaptiveCardExtensionState>>;
        nav.close();
			}
		}
	}

	public get template(): ISPFxAdaptiveCard {
		return require("./template/ThirdQuickViewTemplate.json");
	}
}
