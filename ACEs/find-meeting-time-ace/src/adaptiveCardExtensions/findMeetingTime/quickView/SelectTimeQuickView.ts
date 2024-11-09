import { ISPFxAdaptiveCard, BaseAdaptiveCardQuickView, IActionArguments, ISubmitActionArguments } from '@microsoft/sp-adaptive-card-extension-base';
import * as strings from 'FindMeetingTimeAdaptiveCardExtensionStrings';
import {
	CONFIRM_QUICK_VIEW_REGISTRY_ID,
  ERROR_QUICK_VIEW_REGISTRY_ID,
  IFindMeetingTimeAdaptiveCardExtensionProps,
  IFindMeetingTimeAdaptiveCardExtensionState
} from '../FindMeetingTimeAdaptiveCardExtension';
import { FindTimeService } from '../services/FindTimeService';
import { MeetingTimeSuggestion } from "../model/MeetingTimeResult";

export interface IQuickViewData {
	subTitle: string;
	title: string;
	meetingTimes: MeetingTimeSuggestion[];
	noMeetingTimeFound: string;
	userTimeZone: string;
}

export class SelectTimeQuickView extends BaseAdaptiveCardQuickView<
	IFindMeetingTimeAdaptiveCardExtensionProps,
	IFindMeetingTimeAdaptiveCardExtensionState,
	IQuickViewData
> {
	private _oldUsername: string;

	public get data(): IQuickViewData {
		// Retrieve the meeting time from the Graph API
		this._findMeetingTimes();

		const { meetingTimes } = this.state;

		const data = {
			subTitle: strings.SelectTimeSubTitle,
			title: strings.SelectTimeTitle,
			meetingTimes: meetingTimes,
			noMeetingTimeFound: strings.NoMeetingTimeFound,
			userTimeZone: this.state.userTimeZone,
		};

		return data;
	}

	private _findMeetingTimes(): void {
		const { username } = this.state;

		if (!username || username.length === 0) {
			return;
		}

		// If the username has not changed, do not initiate a new search
		if (this._oldUsername === username) {
			return;
		}

		this._oldUsername = username;

		// Perform the search
		this.context.serviceScope
			.consume(FindTimeService.serviceKey)
			.findTime(username)
			.then((result: MeetingTimeSuggestion[]) => {
				this.setState({
					meetingTimes: result,
				});
			})
			.catch((err) => {
				console.error(err);
				this.setState({
					error: err.message,
				});
			});
	}

	public get template(): ISPFxAdaptiveCard {
		return require("./template/SelectTimeQuickViewTemplate.json");
	}

	public onAction(action: IActionArguments | any): void {
		if (action.type === "Submit") {
			if (action.id === "addToCalendar") {
				try {
					console.log(action);
					this._addToCalendar(action)
					.then(() => {
						this.quickViewNavigator.push(CONFIRM_QUICK_VIEW_REGISTRY_ID);
					})
					.catch((err) => {
						this.quickViewNavigator.push(ERROR_QUICK_VIEW_REGISTRY_ID);
					});
				} catch (error) {
					this.quickViewNavigator.push(ERROR_QUICK_VIEW_REGISTRY_ID);
				}
			}
		}
	}

	private async _addToCalendar(action: ISubmitActionArguments): Promise<void> {
		const itemIndex = action.data.itemIndex;
		const meetingTime = this.state.meetingTimes[itemIndex];
console.log(meetingTime);
		// Perform the search
		await this.context.serviceScope
			.consume(FindTimeService.serviceKey)
			.addMeetingToCalendar(meetingTime);
	}
}
