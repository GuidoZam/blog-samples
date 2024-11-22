import { IPropertyPaneConfiguration } from '@microsoft/sp-property-pane';
import { BaseAdaptiveCardExtension } from '@microsoft/sp-adaptive-card-extension-base';
import { CardView } from './cardView/CardView';
import { LineChartAcePropertyPane } from './LineChartAcePropertyPane';

export interface ILineChartAceAdaptiveCardExtensionProps {
  title: string;
  showMultipleData: boolean;
}

export interface ILineChartAceAdaptiveCardExtensionState {
}

const CARD_VIEW_REGISTRY_ID: string = 'LineChartAce_CARD_VIEW';


export default class LineChartAceAdaptiveCardExtension extends BaseAdaptiveCardExtension<
  ILineChartAceAdaptiveCardExtensionProps,
  ILineChartAceAdaptiveCardExtensionState
> {
  private _deferredPropertyPane: LineChartAcePropertyPane;

  public onInit(): Promise<void> {
    this.state = { };

    // registers the card view to be shown in a dashboard
    this.cardNavigator.register(CARD_VIEW_REGISTRY_ID, () => new CardView());

    return Promise.resolve();
  }

  protected loadPropertyPaneResources(): Promise<void> {
    return import(
      /* webpackChunkName: 'LineChartAce-property-pane'*/
      './LineChartAcePropertyPane'
    )
      .then(
        (component) => {
          this._deferredPropertyPane = new component.LineChartAcePropertyPane();
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
