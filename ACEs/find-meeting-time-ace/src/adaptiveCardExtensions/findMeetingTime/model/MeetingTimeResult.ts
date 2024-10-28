export interface MeetingTimeResult {
	"@odata.context": string;
	emptySuggestionsReason: string;
	meetingTimeSuggestions: MeetingTimeSuggestion[];
}

export interface MeetingTimeSuggestion {
	confidence: number;
	organizerAvailability: string;
	attendeeAvailability: AttendeeAvailability[];
	locations: any[];
	meetingTimeSlot: MeetingTimeSlot;
}

export interface AttendeeAvailability {
	availability: string;
	attendee: Attendee;
}

export interface Attendee {
	emailAddress: EmailAddress;
}

export interface EmailAddress {
	address: string;
}

export interface MeetingTimeSlot {
	start: Start;
	end: End;
}

export interface Start {
	dateTime: string;
	timeZone: string;
}

export interface End {
	dateTime: string;
	timeZone: string;
}
