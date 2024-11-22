import {
  BaseComponentsCardView,
  IDataVisualizationCardViewParameters,
  LineChartCardView,
  IDataPoint,
} from '@microsoft/sp-adaptive-card-extension-base';
import {
  ILineChartAceAdaptiveCardExtensionProps,
  ILineChartAceAdaptiveCardExtensionState,
} from '../LineChartAceAdaptiveCardExtension';

// Sample Data
const seriesData2023: IDataPoint<Date>[] = [
  { x: new Date(2023, 0, 1), y: Math.floor(Math.random() * 1000) },
  { x: new Date(2023, 1, 1), y: Math.floor(Math.random() * 1000) },
  { x: new Date(2023, 2, 1), y: Math.floor(Math.random() * 1000) },
  { x: new Date(2023, 3, 1), y: Math.floor(Math.random() * 1000) },
  { x: new Date(2023, 4, 1), y: Math.floor(Math.random() * 1000) },
  { x: new Date(2023, 5, 1), y: Math.floor(Math.random() * 1000) },
  { x: new Date(2023, 6, 1), y: Math.floor(Math.random() * 1000) },
  { x: new Date(2023, 7, 1), y: Math.floor(Math.random() * 1000) },
  { x: new Date(2023, 8, 1), y: Math.floor(Math.random() * 1000) },
  { x: new Date(2023, 9, 1), y: Math.floor(Math.random() * 1000) },
  { x: new Date(2023, 10, 1), y: Math.floor(Math.random() * 1000) },
  { x: new Date(2023, 11, 1), y: Math.floor(Math.random() * 1000) }
];

const seriesData2024: IDataPoint<Date>[] = [
	{ x: new Date(2024, 0, 1), y: Math.floor(Math.random() * 1000) },
	{ x: new Date(2024, 1, 1), y: Math.floor(Math.random() * 1000) },
	{ x: new Date(2024, 2, 1), y: Math.floor(Math.random() * 1000) },
	{ x: new Date(2024, 3, 1), y: Math.floor(Math.random() * 1000) },
	{ x: new Date(2024, 4, 1), y: Math.floor(Math.random() * 1000) },
	{ x: new Date(2024, 5, 1), y: Math.floor(Math.random() * 1000) },
	{ x: new Date(2024, 6, 1), y: Math.floor(Math.random() * 1000) },
	{ x: new Date(2024, 7, 1), y: Math.floor(Math.random() * 1000) },
	{ x: new Date(2024, 8, 1), y: Math.floor(Math.random() * 1000) },
	{ x: new Date(2024, 9, 1), y: Math.floor(Math.random() * 1000) },
	{ x: new Date(2024, 10, 1), y: Math.floor(Math.random() * 1000) },
	{ x: new Date(2024, 11, 1), y: Math.floor(Math.random() * 1000) }
];

const seriesDataLifetime: IDataPoint<Date>[] = [
	{ x: new Date(2023, 0, 1), y: Math.floor(Math.random() * 3000) },
	{ x: new Date(2023, 1, 1), y: Math.floor(Math.random() * 3000) },
	{ x: new Date(2023, 2, 1), y: Math.floor(Math.random() * 3000) },
	{ x: new Date(2023, 3, 1), y: Math.floor(Math.random() * 3000) },
	{ x: new Date(2023, 4, 1), y: Math.floor(Math.random() * 3000) },
	{ x: new Date(2023, 5, 1), y: Math.floor(Math.random() * 3000) },
	{ x: new Date(2023, 6, 1), y: Math.floor(Math.random() * 3000) },
	{ x: new Date(2023, 7, 1), y: Math.floor(Math.random() * 3000) },
	{ x: new Date(2023, 8, 1), y: Math.floor(Math.random() * 3000) },
	{ x: new Date(2023, 9, 1), y: Math.floor(Math.random() * 3000) },
	{ x: new Date(2023, 10, 1), y: Math.floor(Math.random() * 3000) },
	{ x: new Date(2023, 11, 1), y: Math.floor(Math.random() * 3000) },
	{ x: new Date(2024, 0, 1), y: Math.floor(Math.random() * 3000) },
	{ x: new Date(2024, 1, 1), y: Math.floor(Math.random() * 3000) },
	{ x: new Date(2024, 2, 1), y: Math.floor(Math.random() * 3000) },
	{ x: new Date(2024, 3, 1), y: Math.floor(Math.random() * 3000) },
	{ x: new Date(2024, 4, 1), y: Math.floor(Math.random() * 3000) },
	{ x: new Date(2024, 5, 1), y: Math.floor(Math.random() * 3000) },
	{ x: new Date(2024, 6, 1), y: Math.floor(Math.random() * 3000) },
	{ x: new Date(2024, 7, 1), y: Math.floor(Math.random() * 3000) },
	{ x: new Date(2024, 8, 1), y: Math.floor(Math.random() * 3000) },
	{ x: new Date(2024, 9, 1), y: Math.floor(Math.random() * 3000) },
	{ x: new Date(2024, 10, 1), y: Math.floor(Math.random() * 3000) },
	{ x: new Date(2024, 11, 1), y: Math.floor(Math.random() * 3000) },
];


export class CardView extends BaseComponentsCardView<
  ILineChartAceAdaptiveCardExtensionProps,
  ILineChartAceAdaptiveCardExtensionState,
  IDataVisualizationCardViewParameters
> {
  public get cardViewParameters(): IDataVisualizationCardViewParameters {
    return LineChartCardView({
			cardBar: {
				componentName: "cardBar",
				title: this.properties.title,
			},
			body: {
				componentName: "dataVisualization",
				dataVisualizationKind: "line",
				series:
					this.properties.showMultipleData === true
						? [
								{
									data: seriesData2023,
									lastDataPointLabel:
										seriesData2023[seriesData2023.length - 1].y.toString(),
								},
								{
									data: seriesData2024,
									lastDataPointLabel:
										seriesData2024[seriesData2024.length - 1].y.toString(),
								},
								{
									data: seriesDataLifetime,
									lastDataPointLabel:
										seriesDataLifetime[seriesDataLifetime.length - 1].y.toString(),
								},
              ]
						: [
								{
									data: seriesData2024,
									lastDataPointLabel:
										seriesData2024[seriesData2024.length - 1].y.toString(),
								},
              ],
			},
		});
  }
}
