import { IPropertyPaneConfiguration } from '@microsoft/sp-property-pane';
import {
  BaseAdaptiveCardExtension,
  type IOnBeforeActionArguments,
  type IQuickViewActionArguments
} from '@microsoft/sp-adaptive-card-extension-base';
import { CardView } from './cardView/CardView';
import { AceSearchPropertyPane } from './AceSearchPropertyPane';

export interface IAceSearchAdaptiveCardExtensionProps {
  title: string;
}

export interface IAceSearchAdaptiveCardExtensionState {
  queryString?: string;
}

const CARD_VIEW_REGISTRY_ID: string = 'AceSearch_CARD_VIEW';
export const SEARCH_RESULTS_QUICK_VIEW_REGISTRY_ID: string = 'AceSearch_SEARCH_RESULTS_QUICK_VIEW';
export const ITEM_QUICK_VIEW_REGISTRY_ID: string = 'AceSearch_ITEM_QUICK_VIEW';
export const SEARCH_BOX_ID: string = 'searchBox';


export default class AceSearchAdaptiveCardExtension extends BaseAdaptiveCardExtension<
  IAceSearchAdaptiveCardExtensionProps,
  IAceSearchAdaptiveCardExtensionState
> {
  private _deferredPropertyPane: AceSearchPropertyPane;

  public onInit(): Promise<void> {
    this.state = { };

    // registers the card view to be shown in a dashboard
    this.cardNavigator.register(CARD_VIEW_REGISTRY_ID, () => new CardView());
    // registers the defer-loaded quick view to show search results
    this.quickViewNavigator.register(SEARCH_RESULTS_QUICK_VIEW_REGISTRY_ID, () => {
      return import(/* webpackChunkName: 'AceSearch-search-results-qv'*/ './quickView/SearchResultsQuickView')
      .then(module => new module.SearchResultsQuickView());
    });
    // registers the defer-loaded quick view to show single search item details
    this.quickViewNavigator.register(ITEM_QUICK_VIEW_REGISTRY_ID, () => {
      return import(/* webpackChunkName: 'AceSearch-item-qv'*/ './quickView/ItemQuickView')
      .then(module => new module.ItemQuickView());
    });

    return Promise.resolve();
  }

  public onBeforeAction(action: IOnBeforeActionArguments): void {
    if (action.type === 'QuickView') {
      //
      // for the QuickView action we can get search query from the data property.
      // it allows to display the same query string in the quick view's text input.
      //
      const quickViewActionArguments: IQuickViewActionArguments = action as IQuickViewActionArguments;
      if (quickViewActionArguments.viewId === SEARCH_RESULTS_QUICK_VIEW_REGISTRY_ID) {
        this.setState({
          queryString: quickViewActionArguments.data && quickViewActionArguments.data[SEARCH_BOX_ID]
        });
      }
    }
  }

  protected loadPropertyPaneResources(): Promise<void> {
    return import(
      /* webpackChunkName: 'AceSearch-property-pane'*/
      './AceSearchPropertyPane'
    )
      .then(
        (component) => {
          this._deferredPropertyPane = new component.AceSearchPropertyPane();
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
