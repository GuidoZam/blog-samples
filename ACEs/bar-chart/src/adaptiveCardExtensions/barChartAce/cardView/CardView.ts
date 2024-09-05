import {
  BaseComponentsCardView,
  IDataVisualizationCardViewParameters,
  IExternalLinkCardAction,
  IQuickViewCardAction,
  IDataPoint,
  BarChartCardView,
} from '@microsoft/sp-adaptive-card-extension-base';
import {
  IBarChartAceAdaptiveCardExtensionProps,
  IBarChartAceAdaptiveCardExtensionState,
  QUICK_VIEW_REGISTRY_ID,
} from '../BarChartAceAdaptiveCardExtension';

// Sample Data
const seriesData1: IDataPoint<string>[] = [
  { x: "C#", y: 12500 },
  { x: "TypeScript", y: 19800 },
  { x: "Go", y: 9000 },
  { x: "Rust", y: 10900 }
];

const seriesData2: IDataPoint<string>[] = [
  { x: "C#", y: 16300 },
  { x: "TypeScript", y: 16000 },
  { x: "Go", y: 13000 },
  { x: "Rust", y: 11900 }
];

const seriesData3: IDataPoint<string>[] = [
  { x: "C#", y: 23500 },
  { x: "TypeScript", y: 24800 },
  { x: "Go", y: 19000 },
  { x: "Rust", y: 15900 }
];

export class CardView extends BaseComponentsCardView<
  IBarChartAceAdaptiveCardExtensionProps,
  IBarChartAceAdaptiveCardExtensionState,
  IDataVisualizationCardViewParameters
> {
  public get cardViewParameters(): IDataVisualizationCardViewParameters {
    return BarChartCardView({
			cardBar: {
				componentName: "cardBar",
				title: this.properties.title,
			},
			body: {
				componentName: "dataVisualization",
				dataVisualizationKind: "bar",
				series: [
					{
						data: seriesData1,
						name: "2020",
					},
					{
						data: seriesData2,
						name: "2021",
					},
					{
						data: seriesData3,
						name: "2022",
					},
				],
			},
		});
  }

  public get onCardSelection(): IQuickViewCardAction | IExternalLinkCardAction | undefined {
    return {
      type: 'QuickView',
      parameters: {
        view: QUICK_VIEW_REGISTRY_ID
      }
    };
  }
}
