import {
  BaseComponentsCardView,
  ComponentsCardViewParameters,
  BasicCardView,
  IExternalLinkCardAction,
  IQuickViewCardAction
} from '@microsoft/sp-adaptive-card-extension-base';
import * as strings from 'ReactQuickViewAdaptiveCardExtensionStrings';
import {
  IReactQuickViewAdaptiveCardExtensionProps,
  IReactQuickViewAdaptiveCardExtensionState,
  QUICK_VIEW_REGISTRY_ID
} from '../ReactQuickViewAdaptiveCardExtension';

export class CardView extends BaseComponentsCardView<
  IReactQuickViewAdaptiveCardExtensionProps,
  IReactQuickViewAdaptiveCardExtensionState,
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
						view: QUICK_VIEW_REGISTRY_ID,
					},
				},
			},
		});
  }

  public get onCardSelection(): IQuickViewCardAction | IExternalLinkCardAction | undefined {
    return undefined;
  }
}
