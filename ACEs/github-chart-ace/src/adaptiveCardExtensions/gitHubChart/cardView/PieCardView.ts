import {
	IDataVisualizationCardViewParameters,
	PieChartCardView,
  IPieDataPoint,
} from "@microsoft/sp-adaptive-card-extension-base";
import { BaseChartCardView } from "./BaseChartCardView";
import * as strings from "GitHubChartAdaptiveCardExtensionStrings";

export class PieCardView extends BaseChartCardView {
	constructor(private isDonut?: boolean) {
		super();
	}

	protected getChart(): IDataVisualizationCardViewParameters {
		return PieChartCardView({
			cardBar: {
				componentName: "cardBar",
				title: strings.Title,
			},
			body: {
				componentName: "dataVisualization",
				dataVisualizationKind: "pie",
				isDonut: this.isDonut,
				series: [
					{
						data: this.getPieData(),
					},
				],
			},
		});
	}

	private getPieData(): IPieDataPoint[] {
		const data: IPieDataPoint[] = [
			{ x: "A", y: 35, showLabel: true },
			{ x: "B", y: 20, color: "#999999" },
			// Strings longer than 3 characters are truncated to 3 characters
			{ x: "Category C", y: 45, showLabel: true },
			{ x: "D", y: 30, color: "#aaaaaa" },
			{ x: "E", y: 55, showLabel: true },
			{ x: "F", y: 25, color: "#cccccc" },
		];

		return data;
	}
}
