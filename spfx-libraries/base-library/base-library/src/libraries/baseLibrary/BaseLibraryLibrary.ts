export class BaseLibraryLibrary {
	public getCurrentTime(): string {
    const currentTime = new Date().toLocaleTimeString();
		return (`The current time is: ${currentTime}`);
	}
}
