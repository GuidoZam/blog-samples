import type { IPropertyPaneConfiguration } from '@microsoft/sp-property-pane';
import { BaseAdaptiveCardExtension, IOnBeforeActionArguments, IQuickViewActionArguments } from '@microsoft/sp-adaptive-card-extension-base';
import { CardView } from './cardView/CardView';
import { FindMeetingTimePropertyPane } from './FindMeetingTimePropertyPane';
import { ConfirmQuickView } from './quickView/ConfirmQuickView';
import { ErrorQuickView } from './quickView/ErrorQuickView';
import { SelectTimeQuickView } from './quickView/SelectTimeQuickView';
import { MeetingTimeSuggestion } from './model/MeetingTimeResult';

export interface IFindMeetingTimeAdaptiveCardExtensionProps {
  title: string;
}

export interface IFindMeetingTimeAdaptiveCardExtensionState {
	username?: string;
  meetingTimes: MeetingTimeSuggestion[];
	error?: string;
}

const CARD_VIEW_REGISTRY_ID: string = 'FindMeetingTime_CARD_VIEW';
export const SELECT_TIME_QUICK_VIEW_REGISTRY_ID: string =
  "FindMeetingTime_SelectTime_QUICK_VIEW";
export const CONFIRM_QUICK_VIEW_REGISTRY_ID = "Confirm_QUICK_VIEW";
export const ERROR_QUICK_VIEW_REGISTRY_ID = "Error_QUICK_VIEW";
export const SEARCH_BOX_ID = "attendeeSearch";

export default class FindMeetingTimeAdaptiveCardExtension extends BaseAdaptiveCardExtension<
	IFindMeetingTimeAdaptiveCardExtensionProps,
	IFindMeetingTimeAdaptiveCardExtensionState
> {
	private _deferredPropertyPane: FindMeetingTimePropertyPane;

	public onInit(): Promise<void> {
		this.state = {
      meetingTimes: []
    };

		// registers the card view to be shown in a dashboard
		this.cardNavigator.register(CARD_VIEW_REGISTRY_ID, () => new CardView());
    this.quickViewNavigator.register(
			SELECT_TIME_QUICK_VIEW_REGISTRY_ID,
			() => new SelectTimeQuickView()
		);
		this.quickViewNavigator.register(
			CONFIRM_QUICK_VIEW_REGISTRY_ID,
			() => new ConfirmQuickView()
		);
		this.quickViewNavigator.register(
			ERROR_QUICK_VIEW_REGISTRY_ID,
			() => new ErrorQuickView()
		);

		return Promise.resolve();
	}

	protected loadPropertyPaneResources(): Promise<void> {
		return import(
			/* webpackChunkName: 'FindMeetingTime-property-pane'*/
			"./FindMeetingTimePropertyPane"
		).then((component) => {
			this._deferredPropertyPane = new component.FindMeetingTimePropertyPane();
		});
	}

	public onBeforeAction(action: IOnBeforeActionArguments): void {
		if (action.type === "QuickView") {
			//
			// for the QuickView action we can get search query from the data property.
			// it allows to display the same query string in the Quick View's text input.
			//
			const quickViewActionArguments: IQuickViewActionArguments =
				action as IQuickViewActionArguments;
			if (
				quickViewActionArguments.viewId === SELECT_TIME_QUICK_VIEW_REGISTRY_ID
			) {
				this.setState({
					username:
						quickViewActionArguments.data &&
						quickViewActionArguments.data[SEARCH_BOX_ID],
				});
			}
		}
	}

	protected renderCard(): string | undefined {
		return CARD_VIEW_REGISTRY_ID;
	}

	protected getPropertyPaneConfiguration(): IPropertyPaneConfiguration {
		return this._deferredPropertyPane?.getPropertyPaneConfiguration();
	}
}
