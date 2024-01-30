import {
	BaseComponentsCardView,
	ComponentsCardViewParameters,
	PrimaryTextCardView,
	IExternalLinkCardAction,
	IQuickViewCardAction,
  ICardTextConfiguration,
  GenericCardViewFooterConfiguration,
  ICardButtonConfiguration,
  IActionArguments,
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
			footer: this.getCardFooter(),
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

	private getCardFooter(): GenericCardViewFooterConfiguration {
		const { index, rssItems } = this.state;

		if (!rssItems || (rssItems && rssItems.length === 0)) {
			return undefined;
		}

		// Quick view button
		const openQuickViewButton: ICardButtonConfiguration = {
			componentName: "cardButton",
			title: strings.QuickViewButton,
			style: "positive",
			action: {
				type: "QuickView",
				parameters: {
					view: QUICK_VIEW_REGISTRY_ID,
				},
			},
		};

		// Calculate next index
		let nextIndex: number = index! + 1;
		if (rssItems && nextIndex >= rssItems.length) {
			nextIndex = 0;
		}

		// Next button
		const nextButton: ICardButtonConfiguration = {
			componentName: "cardButton",
			title: strings.NextButton,
			style: "default",
			action: {
				type: "Submit",
				parameters: {
					nextIndex: nextIndex,
				},
			},
		};

		return [openQuickViewButton, nextButton];
	}

	private get getSelectedItem(): any | undefined {
		const { rssItems, index } = this.state;

		if (rssItems && rssItems.length > 0 && index !== undefined) {
			return rssItems[index];
		}

		return undefined;
	}

	onAction(action: IActionArguments): void {
    const { type } = action;

    if (type === "Submit" && action.data) {
      const { nextIndex } = action.data;

      this.setState({
        index: nextIndex,
      });
    }
  }

	public get onCardSelection():
		| IQuickViewCardAction
		| IExternalLinkCardAction
		| undefined {
		const selectedItem: any | undefined = this.getSelectedItem;

		return selectedItem
			? {
					type: "ExternalLink",
					parameters: {
						target: selectedItem.link,
					},
			}
			: undefined;
	}
}
