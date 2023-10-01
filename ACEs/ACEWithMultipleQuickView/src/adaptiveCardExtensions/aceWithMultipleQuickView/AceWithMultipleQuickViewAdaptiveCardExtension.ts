import type { IPropertyPaneConfiguration } from '@microsoft/sp-property-pane';
import { BaseAdaptiveCardExtension } from '@microsoft/sp-adaptive-card-extension-base';
import { CardView } from './cardView/CardView';
import { FirstQuickView } from './quickView/FirstQuickView';
import { SecondQuickView } from "./quickView/SecondQuickView";
import { AceWithMultipleQuickViewPropertyPane } from './AceWithMultipleQuickViewPropertyPane';

export interface IAceWithMultipleQuickViewAdaptiveCardExtensionProps {
  title: string;
}

export interface IAceWithMultipleQuickViewAdaptiveCardExtensionState {
}

const CARD_VIEW_REGISTRY_ID: string = 'AceWithMultipleQuickView_CARD_VIEW';
export const FIRST_QUICK_VIEW_REGISTRY_ID: string = 'AceWithMultipleQuickView_FIRST_QUICK_VIEW';
export const SECOND_QUICK_VIEW_REGISTRY_ID: string = 'AceWithMultipleQuickView_SECOND_QUICK_VIEW';

export default class AceWithMultipleQuickViewAdaptiveCardExtension extends BaseAdaptiveCardExtension<
  IAceWithMultipleQuickViewAdaptiveCardExtensionProps,
  IAceWithMultipleQuickViewAdaptiveCardExtensionState
> {
  private _deferredPropertyPane: AceWithMultipleQuickViewPropertyPane;

  public onInit(): Promise<void> {
		this.state = {};

		// registers the card view to be shown in a dashboard
		this.cardNavigator.register(CARD_VIEW_REGISTRY_ID, () => new CardView());
		// registers the first quick view to open via QuickView action
		this.quickViewNavigator.register(
			FIRST_QUICK_VIEW_REGISTRY_ID,
			() => new FirstQuickView()
		);
		// registers the second quick view to open via QuickView action
		this.quickViewNavigator.register(
			SECOND_QUICK_VIEW_REGISTRY_ID,
			() => new SecondQuickView()
		);

		return Promise.resolve();
	}

  protected loadPropertyPaneResources(): Promise<void> {
    return import(
      /* webpackChunkName: 'AceWithMultipleQuickView-property-pane'*/
      './AceWithMultipleQuickViewPropertyPane'
    )
      .then(
        (component) => {
          this._deferredPropertyPane = new component.AceWithMultipleQuickViewPropertyPane();
        }
      );
  }

  protected renderCard(): string | undefined {
    return CARD_VIEW_REGISTRY_ID;
  }

  protected getPropertyPaneConfiguration(): IPropertyPaneConfiguration {
    return this._deferredPropertyPane?.getPropertyPaneConfiguration();
  }
}
