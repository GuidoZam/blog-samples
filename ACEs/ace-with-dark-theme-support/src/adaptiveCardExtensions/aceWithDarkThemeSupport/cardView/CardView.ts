import {
  BaseComponentsCardView,
  ComponentsCardViewParameters,
  BasicCardView,
  IExternalLinkCardAction,
  IQuickViewCardAction
} from '@microsoft/sp-adaptive-card-extension-base';
import * as strings from 'AceWithDarkThemeSupportAdaptiveCardExtensionStrings';
import {
  IAceWithDarkThemeSupportAdaptiveCardExtensionProps,
  IAceWithDarkThemeSupportAdaptiveCardExtensionState,
  QUICK_VIEW_REGISTRY_ID
} from '../AceWithDarkThemeSupportAdaptiveCardExtension';

export class CardView extends BaseComponentsCardView<
  IAceWithDarkThemeSupportAdaptiveCardExtensionProps,
  IAceWithDarkThemeSupportAdaptiveCardExtensionState,
  ComponentsCardViewParameters
> {
  public get cardViewParameters(): ComponentsCardViewParameters {
    return BasicCardView({
			cardBar: {
				componentName: "cardBar",
				title:
					this.cardSize === "Large"
						? strings.CardViewTitleExtended
						: strings.CardViewTitle,
			},
			header: {
				componentName: "text",
				text:
					this.cardSize === "Large"
						? strings.PrimaryTextExtended
						: strings.PrimaryText,
			},
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

  public get onCardSelection(): IQuickViewCardAction | IExternalLinkCardAction | undefined {
    return {
      type: 'ExternalLink',
      parameters: {
        target: 'https://iamguidozam.blog'
      }
    };
  }
}
