import { ISPFxAdaptiveCard, BaseAdaptiveCardQuickView } from '@microsoft/sp-adaptive-card-extension-base';
import * as strings from 'AceWithMultipleQuickViewAdaptiveCardExtensionStrings';
import {
  IAceWithMultipleQuickViewAdaptiveCardExtensionProps,
  IAceWithMultipleQuickViewAdaptiveCardExtensionState
} from '../AceWithMultipleQuickViewAdaptiveCardExtension';

export interface ISecondQuickViewData {
  subTitle: string;
  title: string;
}

export class SecondQuickView extends BaseAdaptiveCardQuickView<
  IAceWithMultipleQuickViewAdaptiveCardExtensionProps,
  IAceWithMultipleQuickViewAdaptiveCardExtensionState,
  ISecondQuickViewData
> {
  public get data(): ISecondQuickViewData {
    return {
      subTitle: strings.SecondSubTitle,
      title: strings.SecondTitle
    };
  }

  public get template(): ISPFxAdaptiveCard {
    return require('./template/SecondQuickViewTemplate.json');
  }
}
