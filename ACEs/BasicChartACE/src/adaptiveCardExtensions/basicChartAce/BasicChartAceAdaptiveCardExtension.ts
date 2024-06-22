import type { IPropertyPaneConfiguration } from '@microsoft/sp-property-pane';
import {
	BaseAdaptiveCardExtension,
	IDataPoint,
} from "@microsoft/sp-adaptive-card-extension-base";
import { CardView } from './cardView/CardView';
import { BasicChartAcePropertyPane } from './BasicChartAcePropertyPane';

const apiUrl =
	"https://www.alphavantage.co/query?function=TIME_SERIES_INTRADAY&symbol={0}&interval={1}min&outputsize=compact&apikey={2}";

export interface IBasicChartAceAdaptiveCardExtensionProps {
	apiKey: string;
	symbols: string;
	interval: number;
	valueToShow: string;
}

export interface IBasicChartAceAdaptiveCardExtensionState {
	data: { [id: string]: IDataPoint<Date>[] };
	error: string;
	hasError: boolean;
	rateLimitReached: boolean;
}

const CARD_VIEW_REGISTRY_ID: string = 'BasicChartAce_CARD_VIEW';
export const QUICK_VIEW_REGISTRY_ID: string = 'BasicChartAce_QUICK_VIEW';

export default class BasicChartAceAdaptiveCardExtension extends BaseAdaptiveCardExtension<
  IBasicChartAceAdaptiveCardExtensionProps,
  IBasicChartAceAdaptiveCardExtensionState
> {
  private _deferredPropertyPane: BasicChartAcePropertyPane;

  public async onInit(): Promise<void> {
    this.state = {
      data: {},
      rateLimitReached: false,
      error: "",
      hasError: false,
    };

    // registers the card view to be shown in a dashboard
    this.cardNavigator.register(CARD_VIEW_REGISTRY_ID, () => new CardView());

    await this._fetchData();

    return Promise.resolve();
  }

  protected loadPropertyPaneResources(): Promise<void> {
    return import(
      /* webpackChunkName: 'BasicChartAce-property-pane'*/
      './BasicChartAcePropertyPane'
    )
      .then(
        (component) => {
          this._deferredPropertyPane = new component.BasicChartAcePropertyPane();
        }
      );
  }

  private async _fetchData(): Promise<void> {
    try {
      if (
        !this.properties.apiKey ||
        this.properties.apiKey.length === 0 ||
        !this.properties.symbols ||
        this.properties.symbols.length === 0) {
        return;
      }

      const tempData: { [id: string]: IDataPoint<Date>[] } = {};
      const symbols = this.properties.symbols.split(",");
      const interval = this.properties.interval ?? 5;
      const valueToShow = this.properties.valueToShow ?? "4. close";

      for await (const symbol of symbols) {
        const targetUrl = apiUrl
          .replace("{0}", symbol)
          .replace("{1}", interval.toString())
          .replace("{2}", this.properties.apiKey);

        const response = await fetch(targetUrl);
        const responseData = await response.json();

        if (Object.keys(responseData).length === 0) {
          continue;
        }

        // If the API rate limit has been reached
        if (responseData["Information"] && responseData["Information"].length > 0){
          this.setState({
            data: undefined,
            rateLimitReached: true
          });
          return;
        }

        if (responseData["Error Message"] && responseData["Error Message"].length > 0) {
          throw new Error(responseData["Error Message"]);
        }
        
        const seriesData: IDataPoint<Date>[] = [];
        const dataKey = `Time Series (${interval}min)`;

        // For sample purpose only, we are limiting the data to 10 entries
        for (let entryCount = 0; entryCount < 10; entryCount++) {
          const key = Object.keys(responseData[dataKey])[entryCount];
          seriesData.push({
            x: new Date(key),
            y: parseFloat(responseData[dataKey][key][valueToShow]),
          });
        }

        tempData[symbol] = seriesData;
      }

      this.setState({
				data: tempData,
				error: undefined,
				hasError: false,
			});
    } catch (error) {
      this.setState({
				error: error,
        hasError: true,
        data: {}
			});
    }
  }

  protected renderCard(): string | undefined {
    return CARD_VIEW_REGISTRY_ID;
  }

  protected getPropertyPaneConfiguration(): IPropertyPaneConfiguration {
    return this._deferredPropertyPane?.getPropertyPaneConfiguration();
  }
}
