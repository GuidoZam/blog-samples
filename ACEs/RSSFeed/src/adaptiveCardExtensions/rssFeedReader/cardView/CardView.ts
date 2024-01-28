import {
	BaseComponentsCardView,
	ComponentsCardViewParameters,
	PrimaryTextCardView,
	IExternalLinkCardAction,
	IQuickViewCardAction,
  ICardTextConfiguration,
} from "@microsoft/sp-adaptive-card-extension-base";
import * as strings from 'RssFeedReaderAdaptiveCardExtensionStrings';
import {
  IRssFeedReaderAdaptiveCardExtensionProps,
  IRssFeedReaderAdaptiveCardExtensionState,
  QUICK_VIEW_REGISTRY_ID
} from '../RssFeedReaderAdaptiveCardExtension';

export class CardView extends BaseComponentsCardView<
	IRssFeedReaderAdaptiveCardExtensionProps,
	IRssFeedReaderAdaptiveCardExtensionState,
	ComponentsCardViewParameters
> {
	public get cardViewParameters(): ComponentsCardViewParameters {
		let selectedItem: any = this.getSelectedItem;

		return PrimaryTextCardView({
			cardBar: {
				componentName: "cardBar",
				title: strings.Title,
				icon: {
					url: require("../assets/icon.png"),
				},
			},
			header: this.getCardHeader(selectedItem),
			body: this.getCardBody(selectedItem),
			footer: {
				componentName: "cardButton",
				title: strings.QuickViewButton,
				action: {
					type: "QuickView",
					parameters: {
						view: QUICK_VIEW_REGISTRY_ID,
					},
				},
			},
		});
	}

	private getCardHeader(selectedItem: any | undefined): ICardTextConfiguration {
		const { isLoading, error } = this.state;

		let header: ICardTextConfiguration = {
			componentName: "text",
			text: strings.NeedConfigurationMessage,
		};
    
    if (isLoading === true) {
      header.text = strings.Loading;
    }
    
    if (selectedItem) {
      header.text = selectedItem.title;
    }

		if (error) {
			header.text = `${strings.ErrorLabel}`;
		}

		return header;
	}

  private getCardBody(selectedItem: any | undefined): ICardTextConfiguration {
    const { isLoading, error } = this.state;

    let body: ICardTextConfiguration = {
      componentName: "text",
      text: "",
    };

    if (isLoading === true) {
      body.text = strings.Loading;
    }

    if (selectedItem) {
      body.text = selectedItem.contentSnippet;
    }
    
    if (error) {
      body.text = error;
    }

    return body;
  }

	private get getSelectedItem(): any | undefined {
		const { rssItems, index } = this.state;

		if (rssItems && rssItems.length > 0 && index !== undefined) {
			return rssItems[index];
		}

		return undefined;
	}

	public get onCardSelection():
		| IQuickViewCardAction
		| IExternalLinkCardAction
		| undefined {
		return {
			type: "ExternalLink",
			parameters: {
				target: "https://www.bing.com",
			},
		};
	}
}
