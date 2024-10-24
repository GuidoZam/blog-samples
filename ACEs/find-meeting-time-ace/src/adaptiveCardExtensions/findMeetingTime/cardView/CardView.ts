import {
	BaseComponentsCardView,
	ComponentsCardViewParameters,
	BasicCardView,
	IExternalLinkCardAction,
	IQuickViewCardAction,
} from "@microsoft/sp-adaptive-card-extension-base";
import * as strings from 'FindMeetingTimeAdaptiveCardExtensionStrings';
import {
  IFindMeetingTimeAdaptiveCardExtensionProps,
  IFindMeetingTimeAdaptiveCardExtensionState,
  SELECT_ATTENDEES_QUICK_VIEW_REGISTRY_ID
} from '../FindMeetingTimeAdaptiveCardExtension';

export class CardView extends BaseComponentsCardView<
  IFindMeetingTimeAdaptiveCardExtensionProps,
  IFindMeetingTimeAdaptiveCardExtensionState,
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
						view: SELECT_ATTENDEES_QUICK_VIEW_REGISTRY_ID,
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
