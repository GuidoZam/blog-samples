import { ISPFxAdaptiveCard, BaseAdaptiveCardQuickView, IActionArguments, ISubmitActionArguments } from '@microsoft/sp-adaptive-card-extension-base';
import * as strings from 'FindMeetingTimeAdaptiveCardExtensionStrings';
import {
  ERROR_QUICK_VIEW_REGISTRY_ID,
  IFindMeetingTimeAdaptiveCardExtensionProps,
  IFindMeetingTimeAdaptiveCardExtensionState,
  SELECT_TIME_QUICK_VIEW_REGISTRY_ID
} from '../FindMeetingTimeAdaptiveCardExtension';

export interface IQuickViewData {
  subTitle: string;
  title: string;
}

export class SelectAttendeesQuickView extends BaseAdaptiveCardQuickView<
	IFindMeetingTimeAdaptiveCardExtensionProps,
	IFindMeetingTimeAdaptiveCardExtensionState,
	IQuickViewData
> {
	public get data(): IQuickViewData {
		return {
			subTitle: strings.SubTitle,
			title: strings.Title,
		};
	}

	public get template(): ISPFxAdaptiveCard {
		return require("./template/SelectAttendeesQuickViewTemplate.json");
	}

	public onAction(action: IActionArguments | any): void {
    console.log(action);
		if (action.type === "Submit") {
      try {
        this._selectAttendees(<ISubmitActionArguments>action);
        this.quickViewNavigator.push(SELECT_TIME_QUICK_VIEW_REGISTRY_ID);
      } catch (error) {
        this.quickViewNavigator.push(ERROR_QUICK_VIEW_REGISTRY_ID);
      }
		}
	}

  private _selectAttendees(action: ISubmitActionArguments): void {
    if (action && action.data) {

      const selectedAttendees = action.data.selectedAttendees;

      console.log(selectedAttendees);
      // Add your logic here
      // https://learn.microsoft.com/en-us/graph/api/user-findmeetingtimes?view=graph-rest-1.0&tabs=javascript
      //const graphClient = this.context.msGraphClientFactory.getClient("3");
    }
    
	}
}
