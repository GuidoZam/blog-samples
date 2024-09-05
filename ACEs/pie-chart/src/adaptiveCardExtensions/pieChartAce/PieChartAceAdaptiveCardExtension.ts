import { IPropertyPaneConfiguration } from '@microsoft/sp-property-pane';
import { BaseAdaptiveCardExtension } from '@microsoft/sp-adaptive-card-extension-base';
import { CardView } from './cardView/CardView';
import { PieChartAcePropertyPane } from './PieChartAcePropertyPane';

export interface IPieChartAceAdaptiveCardExtensionProps {
	isDonut: boolean;
}

export interface IPieChartAceAdaptiveCardExtensionState {
}

const CARD_VIEW_REGISTRY_ID: string = 'PieChartAce_CARD_VIEW';


export default class PieChartAceAdaptiveCardExtension extends BaseAdaptiveCardExtension<
  IPieChartAceAdaptiveCardExtensionProps,
  IPieChartAceAdaptiveCardExtensionState
> {
  private _deferredPropertyPane: PieChartAcePropertyPane;

  public onInit(): Promise<void> {
    this.state = { };

    // registers the card view to be shown in a dashboard
    this.cardNavigator.register(CARD_VIEW_REGISTRY_ID, () => new CardView());

    return Promise.resolve();
  }

  protected loadPropertyPaneResources(): Promise<void> {
    return import(
      /* webpackChunkName: 'PieChartAce-property-pane'*/
      './PieChartAcePropertyPane'
    )
      .then(
        (component) => {
          this._deferredPropertyPane = new component.PieChartAcePropertyPane();
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
