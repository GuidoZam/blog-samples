import { BaseAdaptiveCardExtension } from '@microsoft/sp-adaptive-card-extension-base';
import { CardView } from './cardView/CardView';
import { QuickView } from './quickView/QuickView';
import * as strings from "GeolocationAceAdaptiveCardExtensionStrings";

export interface IGeolocationAceAdaptiveCardExtensionProps {
  title: string;
}

export interface IGeolocationAceAdaptiveCardExtensionState {
  latitude: string;
  longitude: string;
}

const CARD_VIEW_REGISTRY_ID: string = 'GeolocationAce_CARD_VIEW';
export const QUICK_VIEW_REGISTRY_ID: string = 'GeolocationAce_QUICK_VIEW';

export default class GeolocationAceAdaptiveCardExtension extends BaseAdaptiveCardExtension<
  IGeolocationAceAdaptiveCardExtensionProps,
  IGeolocationAceAdaptiveCardExtensionState
> {
  public onInit(): Promise<void> {
    this.state = {
			latitude: strings.TBD,
			longitude: strings.TBD,
		};

    // registers the card view to be shown in a dashboard
    this.cardNavigator.register(CARD_VIEW_REGISTRY_ID, () => new CardView());
    // registers the quick view to open via QuickView action
    this.quickViewNavigator.register(QUICK_VIEW_REGISTRY_ID, () => new QuickView());

    return Promise.resolve();
  }

  protected renderCard(): string | undefined {
    return CARD_VIEW_REGISTRY_ID;
  }
}
