import {
  BaseComponentsCardView,
  IDataVisualizationCardViewParameters,
  PieChartCardView,
  IPieDataPoint,
} from '@microsoft/sp-adaptive-card-extension-base';
import {
  IPieChartAceAdaptiveCardExtensionProps,
  IPieChartAceAdaptiveCardExtensionState
} from '../PieChartAceAdaptiveCardExtension';
import * as strings from "PieChartAceAdaptiveCardExtensionStrings";

// Sample Data
const seriesData: IPieDataPoint[] = [
	{ x: "A", y: 35, showLabel: true },
	{ x: "B", y: 20, color: "#999999" },
	// Strings longer than 3 characters are truncated to 3 characters
	{ x: "Category C", y: 45, showLabel: true },
	{ x: "D", y: 30, color: "#aaaaaa" },
	{ x: "E", y: 55, showLabel: true },
	{ x: "F", y: 25, color: "#cccccc" },
];

export class CardView extends BaseComponentsCardView<
  IPieChartAceAdaptiveCardExtensionProps,
  IPieChartAceAdaptiveCardExtensionState,
  IDataVisualizationCardViewParameters
> {
  public get cardViewParameters(): IDataVisualizationCardViewParameters {
    return PieChartCardView({
      cardBar: {
        componentName: 'cardBar',
        title: strings.Title,
      },
      body: {
        componentName: 'dataVisualization',
        dataVisualizationKind: 'pie',
        isDonut: this.properties.isDonut,
        series: [{
            data: seriesData
        }]
      }
    });
  }
}
