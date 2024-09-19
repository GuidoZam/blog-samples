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
	{ x: "B", y: 20 },
	// Strings longer than 3 characters are truncated to 3 characters
	{ x: "Category C", y: 45 },
	{ x: "D", y: 30 },
	{ x: "E", y: 75 },
	{ x: "F", y: 25 },
];

export class CardView extends BaseComponentsCardView<
  IPieChartAceAdaptiveCardExtensionProps,
  IPieChartAceAdaptiveCardExtensionState,
  IDataVisualizationCardViewParameters
> {
  public get cardViewParameters(): IDataVisualizationCardViewParameters {
    const data = seriesData;

    if (this.properties.highlightTopThree === true) {
      // Sort the data by y value and change the color of the the data points after the top 3 to a gray scale
      // Show the label for the first 3 data points
      data.sort((a, b) => b.y - a.y);
      data.forEach((dataPoint, index) => {
        if (index > 2) {
          dataPoint.color = `#${(Math.floor(0xcccccc * (index - 2) / (data.length - 3))).toString(16)}`;
        }
        else {
          dataPoint.showLabel = true;
        }
      });
    }

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
            data: data
        }]
      }
    });
  }
}
