import { ISPFxAdaptiveCard, BaseAdaptiveCardQuickView } from '@microsoft/sp-adaptive-card-extension-base';
import * as strings from 'RssFeedReaderAdaptiveCardExtensionStrings';
import {
  IRssFeedReaderAdaptiveCardExtensionProps,
  IRssFeedReaderAdaptiveCardExtensionState
} from '../RssFeedReaderAdaptiveCardExtension';

export interface IQuickViewData {
  subTitle: string;
  title: string;
}

export class QuickView extends BaseAdaptiveCardQuickView<
  IRssFeedReaderAdaptiveCardExtensionProps,
  IRssFeedReaderAdaptiveCardExtensionState,
  IQuickViewData
> {
  public get data(): IQuickViewData {
    return {
      subTitle: strings.SubTitle,
      title: strings.Title
    };
  }

  public get template(): ISPFxAdaptiveCard {
    return require('./template/QuickViewTemplate.json');
  }
}
