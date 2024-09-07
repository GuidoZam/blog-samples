import {
	BaseComponentsCardView,
	IDataVisualizationCardViewParameters,
	IExternalLinkCardAction,
	IQuickViewCardAction
} from "@microsoft/sp-adaptive-card-extension-base";
import {
  IGitHubChartAdaptiveCardExtensionProps,
  IGitHubChartAdaptiveCardExtensionState
} from '../GitHubChartAdaptiveCardExtension';

export abstract class BaseChartCardView extends BaseComponentsCardView<
	IGitHubChartAdaptiveCardExtensionProps,
	IGitHubChartAdaptiveCardExtensionState,
	IDataVisualizationCardViewParameters
> {
	public get cardViewParameters(): IDataVisualizationCardViewParameters {
		return this.getChart();
	}

	protected abstract getChart(): IDataVisualizationCardViewParameters;

	protected get isDarkTheme(): boolean {
		return this.state.theme === "dark" ? true : false;
	}

	public get onCardSelection():
		| IQuickViewCardAction
		| IExternalLinkCardAction
		| undefined {
		return {
			type: "ExternalLink",
			parameters: {
				target: "https://github.com",
			},
		};
	}
}
