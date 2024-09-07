import { IPropertyPaneConfiguration } from '@microsoft/sp-property-pane';
import { BaseAdaptiveCardExtension } from '@microsoft/sp-adaptive-card-extension-base';
import { BarCardView } from './cardView/BarCardView';
import { PieCardView } from "./cardView/PieCardView";
import { LineCardView } from "./cardView/LineCardView";
import { GitHubChartPropertyPane } from './GitHubChartPropertyPane';
import { Octokit } from "@octokit/rest";
import { NeedsConfigurationCardView } from './cardView/NeedsConfigurationCardView';

export interface IGitHubChartAdaptiveCardExtensionProps {
	apiKey: string;
  chartType: "bar" | "pie" | "donut" | "line";
}

export interface IGitHubChartAdaptiveCardExtensionState {
	theme: string;
	//issues: any[];
}

const BAR_CARD_VIEW_REGISTRY_ID: string = 'GitHubChart_BAR_CARD_VIEW';
const PIE_CARD_VIEW_REGISTRY_ID: string = "GitHubChart_PIE_CARD_VIEW";
const LINE_CARD_VIEW_REGISTRY_ID: string = "GitHubChart_LINE_CARD_VIEW";
const NEEDS_CONFIGURATION_CARD_VIEW_REGISTRY_ID: string = 'GitHubChart_NEEDS_CONFIGURATION_CARD_VIEW';

export default class GitHubChartAdaptiveCardExtension extends BaseAdaptiveCardExtension<
  IGitHubChartAdaptiveCardExtensionProps,
  IGitHubChartAdaptiveCardExtensionState
> {
  private _deferredPropertyPane: GitHubChartPropertyPane;

  public async onInit(): Promise<void> {
		this.state = {
      theme: "light",
      //issues: []
    };
    
    // Get the current theme
    await this.context.sdks?.microsoftTeams?.teamsJs.app
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
		this.cardNavigator.register(BAR_CARD_VIEW_REGISTRY_ID, () => new BarCardView());
    this.cardNavigator.register(PIE_CARD_VIEW_REGISTRY_ID, () => new PieCardView(this.properties.chartType === "donut"));
    this.cardNavigator.register(LINE_CARD_VIEW_REGISTRY_ID, () => new LineCardView());
    this.cardNavigator.register(NEEDS_CONFIGURATION_CARD_VIEW_REGISTRY_ID, () => new NeedsConfigurationCardView());

		// If API Key is specified
		if (this.properties.apiKey) {
			// Create an instance of Octokit
			const octokit = new Octokit({
				auth: this.properties.apiKey,
			});

      const issues =
				await octokit.rest.issues.listForAuthenticatedUser({
					//groupBy: "state",
					headers: {
						"X-GitHub-Api-Version": "2022-11-28",
					},
				});

        console.log(issues.data);

        // this.setState({
        //   issues: issues.data,
        // });
		}

		return Promise.resolve();
	}

  protected loadPropertyPaneResources(): Promise<void> {
    return import(
      /* webpackChunkName: 'GitHubChart-property-pane'*/
      './GitHubChartPropertyPane'
    )
      .then(
        (component) => {
          this._deferredPropertyPane = new component.GitHubChartPropertyPane();
        }
      );
  }

  protected renderCard(): string | undefined {
    // If no API key is specified, show the Needs Configuration card
    if (!this.properties.apiKey || this.properties.apiKey.trim().length === 0) {
      return NEEDS_CONFIGURATION_CARD_VIEW_REGISTRY_ID;
    }

    // If API key is specified, show the appropriate card based on the chart type
    switch (this.properties.chartType) {
			case "bar":
				return BAR_CARD_VIEW_REGISTRY_ID;
			case "pie":
			case "donut":
				return PIE_CARD_VIEW_REGISTRY_ID;
			case "line":
				return LINE_CARD_VIEW_REGISTRY_ID;
      default:
        return NEEDS_CONFIGURATION_CARD_VIEW_REGISTRY_ID;
		}
  }

  protected getPropertyPaneConfiguration(): IPropertyPaneConfiguration {
    return this._deferredPropertyPane?.getPropertyPaneConfiguration();
  }
}
