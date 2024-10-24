import type { IPropertyPaneConfiguration } from '@microsoft/sp-property-pane';
import { BaseAdaptiveCardExtension } from '@microsoft/sp-adaptive-card-extension-base';
import { CardView } from './cardView/CardView';
import { SelectAttendeesQuickView } from "./quickView/SelectAttendeesQuickView";
import { FindMeetingTimePropertyPane } from './FindMeetingTimePropertyPane';

export interface IFindMeetingTimeAdaptiveCardExtensionProps {
  title: string;
}

export interface IFindMeetingTimeAdaptiveCardExtensionState {
}

const CARD_VIEW_REGISTRY_ID: string = 'FindMeetingTime_CARD_VIEW';
export const SELECT_ATTENDEES_QUICK_VIEW_REGISTRY_ID: string =
	"FindMeetingTime_SelectAttendees_QUICK_VIEW";
export const SELECT_TIME_QUICK_VIEW_REGISTRY_ID: string =
  "FindMeetingTime_SelectTime_QUICK_VIEW";
export const CONFIRM_QUICK_VIEW_REGISTRY_ID = "Confirm_QUICK_VIEW";
export const ERROR_QUICK_VIEW_REGISTRY_ID = "Error_QUICK_VIEW";

export default class FindMeetingTimeAdaptiveCardExtension extends BaseAdaptiveCardExtension<
  IFindMeetingTimeAdaptiveCardExtensionProps,
  IFindMeetingTimeAdaptiveCardExtensionState
> {
  private _deferredPropertyPane: FindMeetingTimePropertyPane;

  public onInit(): Promise<void> {
    this.state = { };

    // registers the card view to be shown in a dashboard
    this.cardNavigator.register(CARD_VIEW_REGISTRY_ID, () => new CardView());
    // registers the quick view to open via QuickView action
    this.quickViewNavigator.register(
			SELECT_ATTENDEES_QUICK_VIEW_REGISTRY_ID,
			() => new SelectAttendeesQuickView()
		);

    return Promise.resolve();
  }

  protected loadPropertyPaneResources(): Promise<void> {
    return import(
      /* webpackChunkName: 'FindMeetingTime-property-pane'*/
      './FindMeetingTimePropertyPane'
    )
      .then(
        (component) => {
          this._deferredPropertyPane = new component.FindMeetingTimePropertyPane();
        }
      );
  }

  protected renderCard(): string | undefined {
    return CARD_VIEW_REGISTRY_ID;
  }

  protected getPropertyPaneConfiguration(): IPropertyPaneConfiguration {
    return this._deferredPropertyPane?.getPropertyPaneConfiguration();
  }
}
