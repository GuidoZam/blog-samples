import {
	IDataVisualizationCardViewParameters,
	LineChartCardView,
	IDataPoint,
} from "@microsoft/sp-adaptive-card-extension-base";
import { BaseChartCardView } from "./BaseChartCardView";
import * as strings from "GitHubChartAdaptiveCardExtensionStrings";

export class LineCardView extends BaseChartCardView {
	getChart(): IDataVisualizationCardViewParameters {
		return LineChartCardView({
			cardBar: {
				componentName: "cardBar",
				title: strings.Title,
			},
			body: {
				componentName: "dataVisualization",
				dataVisualizationKind: "line",
				series: [
					{
						data: this.getData(),
						lastDataPointLabel: "3.1K",
					},
				],
			},
		});
	}

  private getData(): IDataPoint<Date>[] {
    const data: IDataPoint<Date>[] = [
      {
        x: new Date(2024, 1, 1),
        y: 1000
      },
      {
        x: new Date(2024, 2, 1),
        y: 2400
      },
      {
        x: new Date(2024, 3, 1),
        y: 2000
      },
      {
        x: new Date(2024, 4, 1),
        y: 2900
      },
      {
        x: new Date(2024, 5, 1),
        y: 3000
      },
      {
        x: new Date(2024, 6, 1),
        y: 3100
      }
    ];

    return data;
  }
}
