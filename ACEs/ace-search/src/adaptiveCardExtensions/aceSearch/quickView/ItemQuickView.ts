import { ISPFxAdaptiveCard, BaseAdaptiveCardQuickView } from '@microsoft/sp-adaptive-card-extension-base';
import * as strings from 'AceSearchAdaptiveCardExtensionStrings';
import {
  IAceSearchAdaptiveCardExtensionProps,
  IAceSearchAdaptiveCardExtensionState
} from '../AceSearchAdaptiveCardExtension';

export interface IItemQuickViewData {
  subTitle: string;
  title: string;
}

export class ItemQuickView extends BaseAdaptiveCardQuickView<
  IAceSearchAdaptiveCardExtensionProps,
  IAceSearchAdaptiveCardExtensionState,
  IItemQuickViewData
> {
  public get data(): IItemQuickViewData {
    return {
      subTitle: strings.SubTitle,
      title: strings.Title
    };
  }

  public get template(): ISPFxAdaptiveCard {
    return require('./template/ItemQuickViewTemplate.json');
  }
}
