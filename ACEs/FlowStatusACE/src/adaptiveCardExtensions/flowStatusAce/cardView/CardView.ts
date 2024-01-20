import {
  BaseComponentsCardView,
  ComponentsCardViewParameters,
  BasicCardView,
  IExternalLinkCardAction,
  IQuickViewCardAction
} from '@microsoft/sp-adaptive-card-extension-base';
import * as strings from 'FlowStatusAceAdaptiveCardExtensionStrings';
import {
  IFlowStatusAceAdaptiveCardExtensionProps,
  IFlowStatusAceAdaptiveCardExtensionState,
  QUICK_VIEW_REGISTRY_ID
} from '../FlowStatusAceAdaptiveCardExtension';

export class CardView extends BaseComponentsCardView<
  IFlowStatusAceAdaptiveCardExtensionProps,
  IFlowStatusAceAdaptiveCardExtensionState,
  ComponentsCardViewParameters
> {
  public get cardViewParameters(): ComponentsCardViewParameters {
    return BasicCardView({
      cardBar: {
        componentName: 'cardBar',
        title: this.properties.title
      },
      header: {
        componentName: 'text',
        text: strings.PrimaryText
      },
      footer: {
        componentName: 'cardButton',
        title: strings.QuickViewButton,
        action: {
          type: 'QuickView',
          parameters: {
            view: QUICK_VIEW_REGISTRY_ID
          }
        }
      }
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
