import {
	BaseComponentsCardView,
	ComponentsCardViewParameters,
	ImageCardView,
} from "@microsoft/sp-adaptive-card-extension-base";
import {
	IGitHubChartAdaptiveCardExtensionProps,
	IGitHubChartAdaptiveCardExtensionState,
} from "../GitHubChartAdaptiveCardExtension";
import * as strings from "GitHubChartAdaptiveCardExtensionStrings";

export class NeedsConfigurationCardView extends BaseComponentsCardView<
	IGitHubChartAdaptiveCardExtensionProps,
	IGitHubChartAdaptiveCardExtensionState,
	ComponentsCardViewParameters
> {
	public get cardViewParameters(): ComponentsCardViewParameters {
		const isDarkTheme = this.state.theme === "dark" ? true : false;

		// TODO: add support for other themes

		const imageUrl = isDarkTheme
			? require("../assets/dark/configuration.png")
			: require("../assets/light/configuration.png");

		return ImageCardView({
			cardBar: {
				componentName: "cardBar",
				title: strings.NeedsConfiguration.Title,
			},
			header: {
				componentName: "text",
				text: strings.NeedsConfiguration.Header,
			},
			image: {
				url: imageUrl,
				altText: strings.NeedsConfiguration.Header,
			},
			footer: undefined,
		});
	}
}
