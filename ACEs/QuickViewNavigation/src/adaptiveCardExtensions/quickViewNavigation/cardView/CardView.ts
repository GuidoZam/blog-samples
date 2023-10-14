import {
  BaseComponentsCardView,
  ComponentsCardViewParameters,
  BasicCardView,
  IExternalLinkCardAction,
  IQuickViewCardAction
} from '@microsoft/sp-adaptive-card-extension-base';
import * as strings from 'QuickViewNavigationAdaptiveCardExtensionStrings';
import {
  IQuickViewNavigationAdaptiveCardExtensionProps,
  IQuickViewNavigationAdaptiveCardExtensionState,
  FIRST_QUICK_VIEW_REGISTRY_ID
} from '../QuickViewNavigationAdaptiveCardExtension';

export class CardView extends BaseComponentsCardView<
  IQuickViewNavigationAdaptiveCardExtensionProps,
  IQuickViewNavigationAdaptiveCardExtensionState,
  ComponentsCardViewParameters
> {
  public get cardViewParameters(): ComponentsCardViewParameters {
    return BasicCardView({
			cardBar: {
				componentName: "cardBar",
				title: this.properties.title,
			},
			header: {
				componentName: "text",
				text: strings.PrimaryText,
			},
			footer: {
				componentName: "cardButton",
				title: strings.QuickViewButton,
				action: {
					type: "QuickView",
					parameters: {
						view: FIRST_QUICK_VIEW_REGISTRY_ID,
					},
				},
			},
		});
  }

  public get onCardSelection(): IQuickViewCardAction | IExternalLinkCardAction | undefined {
    return {
      type: 'ExternalLink',
      parameters: {
        target: 'https://www.bing.com'
      }
    };
  }
}
