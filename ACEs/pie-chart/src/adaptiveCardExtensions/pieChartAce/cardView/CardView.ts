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
	{ x: "A", y: 35 },
	{ x: "B", y: 20, color: "#ff9999", showLabel: true },
  // Strings longer than 3 characters are truncated to 3 characters
	{ x: "Category C", y: 45 },
	{ x: "D", y: 30, color: "#ffaaaa", showLabel: true },
	{ x: "E", y: 55 },
	{ x: "F", y: 25, color: "#ffcccc", showLabel: true },
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
