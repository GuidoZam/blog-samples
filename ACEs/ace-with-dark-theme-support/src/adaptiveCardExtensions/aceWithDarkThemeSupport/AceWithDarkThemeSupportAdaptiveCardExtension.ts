import { BaseAdaptiveCardExtension } from '@microsoft/sp-adaptive-card-extension-base';
import { CardView } from './cardView/CardView';
import { QuickView } from './quickView/QuickView';

export interface IAceWithDarkThemeSupportAdaptiveCardExtensionProps {
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

  protected renderCard(): string | undefined {
    return CARD_VIEW_REGISTRY_ID;
  }
}
