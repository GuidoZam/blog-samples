import { ISPFxAdaptiveCard, BaseAdaptiveCardQuickView } from '@microsoft/sp-adaptive-card-extension-base';
import * as strings from 'AceWithMultipleQuickViewAdaptiveCardExtensionStrings';
import {
  IAceWithMultipleQuickViewAdaptiveCardExtensionProps,
  IAceWithMultipleQuickViewAdaptiveCardExtensionState
} from '../AceWithMultipleQuickViewAdaptiveCardExtension';

export interface IFirstQuickViewData {
  subTitle: string;
  title: string;
}

export class FirstQuickView extends BaseAdaptiveCardQuickView<
  IAceWithMultipleQuickViewAdaptiveCardExtensionProps,
  IAceWithMultipleQuickViewAdaptiveCardExtensionState,
  IFirstQuickViewData
> {
  public get data(): IFirstQuickViewData {
    return {
      subTitle: strings.FirstSubTitle,
      title: strings.FirstTitle
    };
  }

  public get template(): ISPFxAdaptiveCard {
    return require('./template/FirstQuickViewTemplate.json');
  }
}
