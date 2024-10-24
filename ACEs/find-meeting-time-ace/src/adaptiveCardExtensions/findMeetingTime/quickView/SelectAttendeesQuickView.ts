import { ISPFxAdaptiveCard, BaseAdaptiveCardQuickView, IActionArguments } from '@microsoft/sp-adaptive-card-extension-base';
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
		if (action.type === "Submit") {
      try {
        this._selectAttendees(action);
        this.quickViewNavigator.push(SELECT_TIME_QUICK_VIEW_REGISTRY_ID);
      } catch (error) {
        this.quickViewNavigator.push(ERROR_QUICK_VIEW_REGISTRY_ID);
      }
		}
	}

  private _selectAttendees(action: IActionArguments): void {
		// Add your logic here
		// https://learn.microsoft.com/en-us/graph/api/user-findmeetingtimes?view=graph-rest-1.0&tabs=javascript
	}
}
