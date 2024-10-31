import { MeetingTimeSuggestion } from "../model/MeetingTimeResult";

export interface IFindTimeService {
	findTime: (username: string) => Promise<MeetingTimeSuggestion[]>;
	addMeetingToCalendar: (meetingTime: MeetingTimeSuggestion) => Promise<void>;
	getUserTimeZone: () => Promise<string>;
}
