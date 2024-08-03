import { ISPFxAdaptiveCard, BaseAdaptiveCardQuickView } from '@microsoft/sp-adaptive-card-extension-base';
import * as strings from 'AceWithDarkThemeSupportAdaptiveCardExtensionStrings';
import {
  IAceWithDarkThemeSupportAdaptiveCardExtensionProps,
  IAceWithDarkThemeSupportAdaptiveCardExtensionState
} from '../AceWithDarkThemeSupportAdaptiveCardExtension';

export interface IQuickViewData {
	subTitle: string;
	title: string;
	imageUrl: string;
}

export class QuickView extends BaseAdaptiveCardQuickView<
  IAceWithDarkThemeSupportAdaptiveCardExtensionProps,
  IAceWithDarkThemeSupportAdaptiveCardExtensionState,
  IQuickViewData
> {
  public get data(): IQuickViewData {
    const isDarkTheme = this.state.theme === "dark" ? true : false;
    
    const imageUrl = isDarkTheme
			? require("../assets/darkImage.svg")
			: require("../assets/lightImage.svg"); 

    return {
      subTitle: strings.SubTitle,
      title: strings.Title,
      imageUrl
    };
  }

  public get template(): ISPFxAdaptiveCard {
    return require('./template/QuickViewTemplate.json');
  }
}
