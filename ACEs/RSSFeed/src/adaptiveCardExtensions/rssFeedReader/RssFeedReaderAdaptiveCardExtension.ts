import type { IPropertyPaneConfiguration } from '@microsoft/sp-property-pane';
import { BaseAdaptiveCardExtension } from '@microsoft/sp-adaptive-card-extension-base';
import { CardView } from './cardView/CardView';
import { QuickView } from './quickView/QuickView';
import { RssFeedReaderPropertyPane } from './RssFeedReaderPropertyPane';
import * as Parser from "rss-parser";

export interface IRssFeedReaderAdaptiveCardExtensionProps {
	rssUrl: string;
	maxItemCount: number;
}

export interface IRssFeedReaderAdaptiveCardExtensionState {
	rssItems: any[];
  index?: number;
	isLoading: boolean;
	error?: string;
}

const CARD_VIEW_REGISTRY_ID: string = 'RssFeedReader_CARD_VIEW';
export const QUICK_VIEW_REGISTRY_ID: string = 'RssFeedReader_QUICK_VIEW';

export default class RssFeedReaderAdaptiveCardExtension extends BaseAdaptiveCardExtension<
	IRssFeedReaderAdaptiveCardExtensionProps,
	IRssFeedReaderAdaptiveCardExtensionState
> {
	private _deferredPropertyPane: RssFeedReaderPropertyPane;

  // CORS proxy to avoid CORS issues when running locally
  // In production, you should use your own proxy or adapt to your own CORS setup
	private CORS_PROXY: string = "https://cors-anywhere.herokuapp.com/";

	public async onInit(): Promise<void> {
		this.state = {
			rssItems: [],
			isLoading: false,
		};

		// registers the card view to be shown in a dashboard
		this.cardNavigator.register(CARD_VIEW_REGISTRY_ID, () => new CardView());
		// registers the quick view to open via QuickView action
		this.quickViewNavigator.register(
			QUICK_VIEW_REGISTRY_ID,
			() => new QuickView()
		);

		await this.loadRssFeed();

		return Promise.resolve();
	}

  /*
  This method load the RSS feed and sets the state with the items and, if necessary, the error message
  */
	private async loadRssFeed(): Promise<void> {
    if (!this.properties.rssUrl || this.properties.rssUrl.length === 0) {
      // If the RSS URL is not set don't load the feed
      return;
    }

		this.setState({
			isLoading: true,
		});

		let items: any[] = [];
		let errorMessage: string | undefined = undefined;

    // Instantiate the RSS parser
		const parser: Parser = new Parser();

		try {
      // Parse the RSS feed
			const feed = await parser.parseURL(
				`${this.CORS_PROXY}${this.properties.rssUrl}`
			);
			// limit the items to the number specified in the web part properties
			items = feed.items.slice(0, this.properties.maxItemCount);
		} catch (error) {
      // If there is an error, set the error message
			errorMessage = error.message;
		}

    // Set the state with the items and error message
		this.setState({
			rssItems: items,
			isLoading: false,
			error: errorMessage,
      index: this.state.index ?? 0
		});
	}

	protected loadPropertyPaneResources(): Promise<void> {
		return import(
			/* webpackChunkName: 'RssFeedReader-property-pane'*/
			"./RssFeedReaderPropertyPane"
		).then((component) => {
			this._deferredPropertyPane = new component.RssFeedReaderPropertyPane();
		});
	}

	protected renderCard(): string | undefined {
		return CARD_VIEW_REGISTRY_ID;
	}

	protected getPropertyPaneConfiguration(): IPropertyPaneConfiguration {
		return this._deferredPropertyPane?.getPropertyPaneConfiguration();
	}
}
