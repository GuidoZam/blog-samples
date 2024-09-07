import {
	IDataVisualizationCardViewParameters,
	BarChartCardView,
	IDataPoint,
} from "@microsoft/sp-adaptive-card-extension-base";
import { BaseChartCardView } from "./BaseChartCardView";
import * as strings from "GitHubChartAdaptiveCardExtensionStrings";

export class BarCardView extends BaseChartCardView {
	getChart(): IDataVisualizationCardViewParameters {
		return BarChartCardView({
			cardBar: {
				componentName: "cardBar",
				title: strings.Title,
			},
			body: {
				componentName: "dataVisualization",
				dataVisualizationKind: "bar",
				series: [
					{
						data: this.getData(new Date()),
						name: "Languages"
					},
				],
			},
		});
	}

  private getData(targetDate: Date): IDataPoint<string>[] {
    const data: IDataPoint<string>[] = [
      { x: "C#", y: 12500 },
      { x: "TypeScript", y: 19800 },
      { x: "Go", y: 9000 },
      { x: "Rust", y: 10900 }
    ];

    return data;
	}
}
