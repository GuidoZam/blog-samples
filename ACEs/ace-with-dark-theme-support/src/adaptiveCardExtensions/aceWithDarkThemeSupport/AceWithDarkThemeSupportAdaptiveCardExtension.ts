import type { IPropertyPaneConfiguration } from '@microsoft/sp-property-pane';
import { BaseAdaptiveCardExtension } from '@microsoft/sp-adaptive-card-extension-base';
import { CardView } from './cardView/CardView';
import { QuickView } from './quickView/QuickView';
import { AceWithDarkThemeSupportPropertyPane } from './AceWithDarkThemeSupportPropertyPane';

export interface IAceWithDarkThemeSupportAdaptiveCardExtensionProps {
  title: string;
}

export interface IAceWithDarkThemeSupportAdaptiveCardExtensionState {
	theme: string;
}

const CARD_VIEW_REGISTRY_ID: string = 'AceWithDarkThemeSupport_CARD_VIEW';
export const QUICK_VIEW_REGISTRY_ID: string = 'AceWithDarkThemeSupport_QUICK_VIEW';

export default class AceWithDarkThemeSupportAdaptiveCardExtension extends BaseAdaptiveCardExtension<
  IAceWithDarkThemeSupportAdaptiveCardExtensionProps,
  IAceWithDarkThemeSupportAdaptiveCardExtensionState
> {
  private _deferredPropertyPane: AceWithDarkThemeSupportPropertyPane;

  public async onInit(): Promise<void> {
    this.state = {
			theme: "light"
		};

    this.context.sdks?.microsoftTeams?.teamsJs.app
			.getContext()
			.then((context) => {
				this.setState({
					theme: context.app.appInfo.theme,
				});
			})
      .catch((error) => {
        console.error(error);
      });

    // registers the card view to be shown in a dashboard
    this.cardNavigator.register(CARD_VIEW_REGISTRY_ID, () => new CardView());
    // registers the quick view to open via QuickView action
    this.quickViewNavigator.register(QUICK_VIEW_REGISTRY_ID, () => new QuickView());

    return Promise.resolve();
  }

  protected loadPropertyPaneResources(): Promise<void> {
    return import(
      /* webpackChunkName: 'AceWithDarkThemeSupport-property-pane'*/
      './AceWithDarkThemeSupportPropertyPane'
    )
      .then(
        (component) => {
          this._deferredPropertyPane = new component.AceWithDarkThemeSupportPropertyPane();
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
