import { IPropertyPaneConfiguration } from '@microsoft/sp-property-pane';
import { BaseAdaptiveCardExtension } from '@microsoft/sp-adaptive-card-extension-base';
import { CardView } from './cardView/CardView';
import { BarChartAcePropertyPane } from './BarChartAcePropertyPane';

export interface IBarChartAceAdaptiveCardExtensionProps {
  title: string;
}

export interface IBarChartAceAdaptiveCardExtensionState {
}

const CARD_VIEW_REGISTRY_ID: string = 'BarChartAce_CARD_VIEW';


export default class BarChartAceAdaptiveCardExtension extends BaseAdaptiveCardExtension<
  IBarChartAceAdaptiveCardExtensionProps,
  IBarChartAceAdaptiveCardExtensionState
> {
  private _deferredPropertyPane: BarChartAcePropertyPane;

  public onInit(): Promise<void> {
    this.state = { };

    // registers the card view to be shown in a dashboard
    this.cardNavigator.register(CARD_VIEW_REGISTRY_ID, () => new CardView());

    return Promise.resolve();
  }

  protected loadPropertyPaneResources(): Promise<void> {
    return import(
      /* webpackChunkName: 'BarChartAce-property-pane'*/
      './BarChartAcePropertyPane'
    )
      .then(
        (component) => {
          this._deferredPropertyPane = new component.BarChartAcePropertyPane();
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
