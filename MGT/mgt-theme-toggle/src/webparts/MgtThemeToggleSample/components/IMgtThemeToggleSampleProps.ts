import { IReadonlyTheme } from "@microsoft/sp-component-base";

export interface IMgtThemeToggleSampleProps {
	description: string;
	onThemeChanged: (currentTheme: IReadonlyTheme | undefined) => void;
}
