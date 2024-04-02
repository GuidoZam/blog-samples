import { IReadonlyTheme } from "@microsoft/sp-component-base";

export interface IThemeAwareProps {
	themeVariant: IReadonlyTheme | undefined;
}
