import type { IPropertyPaneConfiguration } from '@microsoft/sp-property-pane';
import { BaseAdaptiveCardExtension, ISelectMediaAttachment } from '@microsoft/sp-adaptive-card-extension-base';
import { CardView } from './cardView/CardView';
import { AceWithMediaActionPropertyPane } from './AceWithMediaActionPropertyPane';

export interface IAceWithMediaActionAdaptiveCardExtensionProps {
	title: string;
	mediaType: string;
}

export interface IAceWithMediaActionAdaptiveCardExtensionState {
	filesUploaded: ISelectMediaAttachment[];
}

const CARD_VIEW_REGISTRY_ID: string = 'AceWithMediaAction_CARD_VIEW';

export default class AceWithMediaActionAdaptiveCardExtension extends BaseAdaptiveCardExtension<
  IAceWithMediaActionAdaptiveCardExtensionProps,
  IAceWithMediaActionAdaptiveCardExtensionState
> {
  private _deferredPropertyPane: AceWithMediaActionPropertyPane;

  public onInit(): Promise<void> {
    this.state = { filesUploaded: [] };

    // registers the card view to be shown in a dashboard
    this.cardNavigator.register(CARD_VIEW_REGISTRY_ID, () => new CardView());

    return Promise.resolve();
  }

  protected loadPropertyPaneResources(): Promise<void> {
    return import(
      /* webpackChunkName: 'AceWithMediaAction-property-pane'*/
      './AceWithMediaActionPropertyPane'
    )
      .then(
        (component) => {
          this._deferredPropertyPane = new component.AceWithMediaActionPropertyPane();
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
