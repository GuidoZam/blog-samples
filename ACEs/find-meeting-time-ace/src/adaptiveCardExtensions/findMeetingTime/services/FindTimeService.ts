import { ServiceKey, ServiceScope } from "@microsoft/sp-core-library";
import { MSGraphClientFactory, MSGraphClientV3 } from "@microsoft/sp-http";

import { IFindTimeService } from "./IFindTimeService";
import { MeetingTimeResult, MeetingTimeSuggestion } from "../model/MeetingTimeResult";

export class FindTimeService implements IFindTimeService {
	// Create a ServiceKey to register in the Service Scope
	public static readonly serviceKey: ServiceKey<IFindTimeService> =
		ServiceKey.create<IFindTimeService>(
			"FineMeetingTimeACE:FindTimeService",
			FindTimeService
		);

	private _msGraphClientFactory: MSGraphClientFactory;

	public constructor(serviceScope: ServiceScope) {
		serviceScope.whenFinished(() => {
			// Get the MSGraphClientFactory service instance from the service scope
			this._msGraphClientFactory = serviceScope.consume(
				MSGraphClientFactory.serviceKey
			);
		});
	}

	public findTime(username: string): Promise<MeetingTimeSuggestion[]> {
		return this._msGraphClientFactory
			.getClient("3")
			.then((client: MSGraphClientV3) => {
				// search for people, order by display name, return persons only (no groups, etc.), return top 25 results
				return client
					.api(
						//`/me/people?$search="${queryString}"&orderBy=displayName&$filter=personType/class eq 'Person'&$top=25`
						`/me/findMeetingTimes`
					)
					.version("v1.0")
					.post({
						attendees: [
							{ emailAddress: { address: username }, type: "required" },
						],
					});
			})
			.then((result: MeetingTimeResult) => {
				if (result && result.meetingTimeSuggestions) {
          return result.meetingTimeSuggestions;
        }

        return [];
			})
			.catch((err) => {
				console.log(err);
				throw new Error("Error searching for meeting times.");
			});
	}

  public async addMeetingToCalendar(meetingTime: MeetingTimeSuggestion): Promise<void> {
    const graphClient: MSGraphClientV3 = await this._msGraphClientFactory.getClient("3");

    const postBody = {
			subject: "Test Meeting",
			start: meetingTime.meetingTimeSlot.start,
			end: meetingTime.meetingTimeSlot.end,
			attendees: [
				{
					emailAddress: {
						address:
							meetingTime.attendeeAvailability[0].attendee.emailAddress.address,
					},
					type: "required",
				},
			],
			IsOnlineMeeting: true,
		};
console.log(postBody);
    await graphClient.api("/me/events").post(postBody);
  }

  public async getUserTimeZone(): Promise<string> {
    const graphClient: MSGraphClientV3 = await this._msGraphClientFactory.getClient("3");

    // Get user time zone
    const timeZone = await graphClient.api("/me/mailboxSettings/timeZone").get();

    return timeZone.value;
  }
}
