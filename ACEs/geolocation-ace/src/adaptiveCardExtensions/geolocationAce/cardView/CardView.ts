import {
  BaseComponentsCardView,
  ComponentsCardViewParameters,
  BasicCardView
} from '@microsoft/sp-adaptive-card-extension-base';
import * as strings from 'GeolocationAceAdaptiveCardExtensionStrings';
import {
  IGeolocationAceAdaptiveCardExtensionProps,
  IGeolocationAceAdaptiveCardExtensionState,
	QUICK_VIEW_REGISTRY_ID
} from '../GeolocationAceAdaptiveCardExtension';

export class CardView extends BaseComponentsCardView<
  IGeolocationAceAdaptiveCardExtensionProps,
  IGeolocationAceAdaptiveCardExtensionState,
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
			footer: {
				componentName: "cardButton",
				title: strings.QuickViewButton,
				action: {
					type: "QuickView",
					parameters: {
						view: QUICK_VIEW_REGISTRY_ID,
					},
				},
			}
		});
  }
}
