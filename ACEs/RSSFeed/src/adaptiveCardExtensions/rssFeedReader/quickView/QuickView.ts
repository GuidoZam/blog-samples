import { ISPFxAdaptiveCard, BaseAdaptiveCardQuickView } from '@microsoft/sp-adaptive-card-extension-base';
import {
  IRssFeedReaderAdaptiveCardExtensionProps,
  IRssFeedReaderAdaptiveCardExtensionState
} from '../RssFeedReaderAdaptiveCardExtension';
import * as strings from 'RssFeedReaderAdaptiveCardExtensionStrings';

export interface IQuickViewData {
	title: string;
	contentSnippet: string;
	link: string;
	creator: string;
	pubDate?: string;
	viewFullLabel: string;
}

export class QuickView extends BaseAdaptiveCardQuickView<
  IRssFeedReaderAdaptiveCardExtensionProps,
  IRssFeedReaderAdaptiveCardExtensionState,
  IQuickViewData
> {
  public get data(): IQuickViewData {
    const selectedItem = this.state.rssItems[this.state.index!];

    return {
			title: selectedItem.title,
			contentSnippet: selectedItem.contentSnippet,
			link: selectedItem.link,
			creator: selectedItem.creator,
			pubDate: selectedItem.pubDate,
			viewFullLabel: strings.ViewFullLabel
		};
  }

  public get template(): ISPFxAdaptiveCard {
    return require('./template/QuickViewTemplate.json');
  }
}
