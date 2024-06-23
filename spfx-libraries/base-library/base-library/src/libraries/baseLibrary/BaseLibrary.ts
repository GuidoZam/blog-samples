export class BaseLibrary {
	public getPirateGreeting(): string {
		return "Ahoy matey! Welcome aboard! 🏴‍☠️";
	}

	public getDayOfWeek(date: Date): string {
		if (!date) return "Invalid date.";

		const dayNames = [
			"Sunday",
			"Monday",
			"Tuesday",
			"Wednesday",
			"Thursday",
			"Friday",
			"Saturday",
		];
		const dayOfWeek = dayNames[date.getDay()];
		return `Today is ${dayOfWeek}.`;
	}

	public isLeapYearMessage(date: Date): string {
		if (!date) return "Invalid date.";

		const year = date.getFullYear();
		const isLeap = (year % 4 === 0 && year % 100 !== 0) || year % 400 === 0;
		return isLeap ? `${year} is a leap year.` : `${year} is not a leap year.`;
	}
}
