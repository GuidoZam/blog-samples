import {
	BaseComponentsCardView,
	ComponentsCardViewParameters,
	IExternalLinkCardAction,
	IQuickViewCardAction,
  SearchCardView,
} from "@microsoft/sp-adaptive-card-extension-base";
import * as strings from 'FindMeetingTimeAdaptiveCardExtensionStrings';
import {
  IFindMeetingTimeAdaptiveCardExtensionProps,
  IFindMeetingTimeAdaptiveCardExtensionState,
  SEARCH_BOX_ID,
  SELECT_TIME_QUICK_VIEW_REGISTRY_ID
} from '../FindMeetingTimeAdaptiveCardExtension';

export class CardView extends BaseComponentsCardView<
  IFindMeetingTimeAdaptiveCardExtensionProps,
  IFindMeetingTimeAdaptiveCardExtensionState,
  ComponentsCardViewParameters
> {
  public get cardViewParameters(): ComponentsCardViewParameters {
    return SearchCardView({
			cardBar: {
				componentName: "cardBar",
				title: this.properties.title,
			},
			header: {
				componentName: "text",
				text: strings.PrimaryText,
			},
			body: {
				componentName: "searchBox",
				placeholder: strings.AttendeeSearchPlaceholder,
				id: SEARCH_BOX_ID,
				button: {
					action: {
						type: "QuickView",
						parameters: {
							view: SELECT_TIME_QUICK_VIEW_REGISTRY_ID,
						},
					},
				},
			},
      footer: undefined
			// footer: {
			// 	componentName: "searchFooter",
			// 	title: strings.CardFooterTitle,
			// 	text: strings.CardFooterText,
			// },
		});
  }

  public get onCardSelection(): IQuickViewCardAction | IExternalLinkCardAction | undefined {
    return undefined;
  }
}
