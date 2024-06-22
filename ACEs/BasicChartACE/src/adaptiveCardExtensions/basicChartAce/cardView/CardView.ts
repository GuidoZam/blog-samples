import {
	BaseComponentsCardView,
	IDataVisualizationCardViewParameters,
	LineChartCardView,
	ILineChartSeries,
	MaxThreeTuple,
	ComponentsCardViewParameters,
	BasicCardView,
} from "@microsoft/sp-adaptive-card-extension-base";
import * as strings from "BasicChartAceAdaptiveCardExtensionStrings";
import {
	IBasicChartAceAdaptiveCardExtensionProps,
	IBasicChartAceAdaptiveCardExtensionState,
} from "../BasicChartAceAdaptiveCardExtension";

export class CardView extends BaseComponentsCardView<
	IBasicChartAceAdaptiveCardExtensionProps,
	IBasicChartAceAdaptiveCardExtensionState,
	IDataVisualizationCardViewParameters | ComponentsCardViewParameters
> {
	public get cardViewParameters(): IDataVisualizationCardViewParameters | ComponentsCardViewParameters {
		// If no data is available, show a basic card with a message
		if (
			this.state.data === undefined ||
			this.state.data === null ||
			Object.keys(this.state.data).length === 0
		) {
			return BasicCardView({
				cardBar: {
					componentName: "cardBar",
					title: strings.ConfigureYourACE.Title,
				},
				header: {
					componentName: "text",
					text:
						this.state.rateLimitReached === true
							? strings.ConfigureYourACE.RateLimitReached
							: this.state.hasError
							? this.state.error && this.state.error.length > 0
								? `${strings.ConfigureYourACE.ErrorOccurred} ${this.state.error}`
									: strings.ConfigureYourACE.ErrorOccurred
							: strings.ConfigureYourACE.MissingConfiguration,
				},
				footer: undefined,
			});
		}

		const seriesData: ILineChartSeries<Date>[] = [];
		for (const key in this.state.data) {
			seriesData.push({
				data: this.state.data[key],
				lastDataPointLabel: key,
			});
		}

		return LineChartCardView({
			cardBar: {
				componentName: "cardBar",
				title: strings.Title,
			},
			body: {
				componentName: "dataVisualization",
				dataVisualizationKind: "line",
				series: this._getTupleFromArray(seriesData),
			},
		});
	}

	private _getTupleFromArray(
		arr: ILineChartSeries<Date>[]
	): MaxThreeTuple<ILineChartSeries<Date>> {
		switch (arr.length) {
			case 1:
        return [arr[0]];
			case 2:
				return [arr[0], arr[1]];
			case 3:
				return [arr[0], arr[1], arr[2]];
			default:
				throw new Error("Array length must be 1, 2 or 3");
		}
	}
}
