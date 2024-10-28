import { MeetingTimeSuggestion } from "../model/MeetingTimeResult";

export interface IFindTimeService {
	findTime: (username: string) => Promise<MeetingTimeSuggestion[]>;
}
