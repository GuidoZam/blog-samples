import { ServiceKey, ServiceScope } from "@microsoft/sp-core-library";
import { MSGraphClientFactory, MSGraphClientV3 } from "@microsoft/sp-http";

import { IFindTimeService } from "./IFindTimeService";
import { MeetingTimeResult, MeetingTimeSuggestion } from "../model/MeetingTimeResult";
//import { IPerson } from "../model/IPerson";
/**
 * type of result returned by the Microsoft Graph /people API
 */
// interface IGraphPerson {
// 	id: string;
// 	displayName: string;
// 	jobTitle?: string;
// 	officeLocation?: string;
// 	imAddress?: string;
// 	scoredEmailAddresses?: [
// 		{
// 			address: string;
// 			relevanceScore: number;
// 		}
// 	];
// 	phones?: [
// 		{
// 			type: string;
// 			number: string;
// 		}
// 	];
// }

// /**
//  * type of result returned by the Microsoft Graph /me API
//  */
// interface IGraphUser {
// 	id: string;
// 	displayName: string;
// 	jobTitle?: string;
// 	mail: string;
// 	officeLocation?: string;
// 	userPrincipalName: string;
// 	businessPhones?: string[];
// }

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
}
