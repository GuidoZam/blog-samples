import {
  BaseComponentsCardView,
  ComponentsCardViewParameters,
  BasicCardView,
  IExternalLinkCardAction,
  IQuickViewCardAction
} from '@microsoft/sp-adaptive-card-extension-base';
import * as strings from 'AceWithMultipleQuickViewAdaptiveCardExtensionStrings';
import {
	IAceWithMultipleQuickViewAdaptiveCardExtensionProps,
	IAceWithMultipleQuickViewAdaptiveCardExtensionState,
	FIRST_QUICK_VIEW_REGISTRY_ID,
	SECOND_QUICK_VIEW_REGISTRY_ID,
} from "../AceWithMultipleQuickViewAdaptiveCardExtension";

export class CardView extends BaseComponentsCardView<
  IAceWithMultipleQuickViewAdaptiveCardExtensionProps,
  IAceWithMultipleQuickViewAdaptiveCardExtensionState,
  ComponentsCardViewParameters
> {
  public get cardViewParameters(): ComponentsCardViewParameters {
    return BasicCardView({
			cardBar: {
				componentName: "cardBar",
				title: strings.Title,
			},
			header: {
				componentName: "text",
				text: strings.PrimaryText,
			},
			footer: [
				{
					componentName: "cardButton",
					title: strings.FirstQuickViewButton,
					action: {
						type: "QuickView",
						parameters: {
							view: FIRST_QUICK_VIEW_REGISTRY_ID,
						},
					},
				},
				{
					componentName: "cardButton",
					title: strings.SecondQuickViewButton,
					action: {
						type: "QuickView",
						parameters: {
							view: SECOND_QUICK_VIEW_REGISTRY_ID,
						},
					},
				},
			],
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
