import type { IPropertyPaneConfiguration } from '@microsoft/sp-property-pane';
import { BaseAdaptiveCardExtension } from '@microsoft/sp-adaptive-card-extension-base';
import { CardView } from './cardView/CardView';
import { FirstQuickView } from './quickView/FirstStepQuickView';
import { SecondQuickView } from './quickView/SecondStepQuickView';
import { ThirdQuickView } from './quickView/ThirdStepQuickView';
import { QuickViewNavigationPropertyPane } from './QuickViewNavigationPropertyPane';

export interface IQuickViewNavigationAdaptiveCardExtensionProps {
  title: string;
}

export interface IQuickViewNavigationAdaptiveCardExtensionState {
}

const CARD_VIEW_REGISTRY_ID: string = 'QuickViewNavigation_CARD_VIEW';
// The following are the constants to register the quick views
export const FIRST_QUICK_VIEW_REGISTRY_ID: string = "FirstQuickViewNavigation_QUICK_VIEW";
export const SECOND_QUICK_VIEW_REGISTRY_ID: string = "SecondQuickViewNavigation_QUICK_VIEW";
export const THIRD_QUICK_VIEW_REGISTRY_ID: string = "ThirdQuickViewNavigation_QUICK_VIEW";

export default class QuickViewNavigationAdaptiveCardExtension extends BaseAdaptiveCardExtension<
  IQuickViewNavigationAdaptiveCardExtensionProps,
  IQuickViewNavigationAdaptiveCardExtensionState
> {
  private _deferredPropertyPane: QuickViewNavigationPropertyPane;

  public onInit(): Promise<void> {
    this.state = { };

    // registers the card view to be shown in a dashboard
    this.cardNavigator.register(CARD_VIEW_REGISTRY_ID, () => new CardView());
    
    // Register the quick views for the navigation
    this.quickViewNavigator.register(
			FIRST_QUICK_VIEW_REGISTRY_ID,
			() => new FirstQuickView()
		);
    this.quickViewNavigator.register(
			SECOND_QUICK_VIEW_REGISTRY_ID,
			() => new SecondQuickView()
		);
    this.quickViewNavigator.register(
			THIRD_QUICK_VIEW_REGISTRY_ID,
			() => new ThirdQuickView()
		);

    return Promise.resolve();
  }

  protected loadPropertyPaneResources(): Promise<void> {
    return import(
      /* webpackChunkName: 'QuickViewNavigation-property-pane'*/
      './QuickViewNavigationPropertyPane'
    )
      .then(
        (component) => {
          this._deferredPropertyPane = new component.QuickViewNavigationPropertyPane();
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
