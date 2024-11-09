import { ISPFxAdaptiveCard, BaseAdaptiveCardQuickView, IGetLocationActionArguments } from '@microsoft/sp-adaptive-card-extension-base';
import * as strings from 'GeolocationAceAdaptiveCardExtensionStrings';
import {
  IGeolocationAceAdaptiveCardExtensionProps,
  IGeolocationAceAdaptiveCardExtensionState
} from '../GeolocationAceAdaptiveCardExtension';

export interface IQuickViewData {
	latitude: string;
	longitude: string;
	chooseLocationOnMap: string;
	getMyLocation: string;
	customLocation: string;
  description: string;
}

export class QuickView extends BaseAdaptiveCardQuickView<
  IGeolocationAceAdaptiveCardExtensionProps,
  IGeolocationAceAdaptiveCardExtensionState,
  IQuickViewData
> {
  public get data(): IQuickViewData {
    return {
			latitude: `${strings.Latitude}: ${this.state.latitude}`,
			longitude: `${strings.Longitude}: ${this.state.longitude}`,
			chooseLocationOnMap: strings.QuickView.ChooseLocationOnMap,
			getMyLocation: strings.QuickView.GetMyLocation,
			customLocation: strings.QuickView.CustomLocation,
			description: strings.QuickView.Description,
		};
  }

  public get template(): ISPFxAdaptiveCard {
    return require('./template/QuickViewTemplate.json');
  }

  public onAction(action: IGetLocationActionArguments): void {
    if (action.type === 'VivaAction.GetLocation') {

      if (action.location && action.location.latitude && action.location.longitude) {
        this.setState({
          latitude: action.location.latitude.toString(),
          longitude: action.location.longitude.toString()
        });
      }
      else {
        this.setState({
          latitude: strings.TBD,
          longitude: strings.TBD
        });
      }
    }
  }
}
