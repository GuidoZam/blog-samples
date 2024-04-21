import * as React from 'react';
import * as ReactDom from 'react-dom';
import { Version } from '@microsoft/sp-core-library';
import { BaseClientSideWebPart } from '@microsoft/sp-webpart-base';
import {
	ThemeProvider,
	ThemeChangedEventArgs,
	IReadonlyTheme,
} from "@microsoft/sp-component-base";

import ThemeAware from './components/ThemeAware';
import { IThemeAwareProps } from './components/IThemeAwareProps';

export interface IThemeAwareWebPartProps {
}

export default class ThemeAwareWebPart extends BaseClientSideWebPart<IThemeAwareWebPartProps> {
	private _themeProvider: ThemeProvider;
	private _themeVariant: IReadonlyTheme | undefined;

	public render(): void {
		const element: React.ReactElement<IThemeAwareProps> = React.createElement(
			ThemeAware,
			{
				themeVariant: this._themeVariant,
			}
		);

		ReactDom.render(element, this.domElement);
	}

	protected onInit(): Promise<void> {
		// Consume the new ThemeProvider service
		this._themeProvider = this.context.serviceScope.consume(
			ThemeProvider.serviceKey
		);

		// If it exists, get the theme variant
		this._themeVariant = this._themeProvider.tryGetTheme();

		// Register a handler to be notified if the theme variant changes
		this._themeProvider.themeChangedEvent.add(
			this,
			this._handleThemeChangedEvent
		);
    
    return super.onInit();
	}

	private _handleThemeChangedEvent(args: ThemeChangedEventArgs): void {
		this._themeVariant = args.theme;
		this.render();
	}

	protected onThemeChanged(currentTheme: IReadonlyTheme | undefined): void {
		if (!currentTheme) {
			return;
		}

		const { semanticColors } = currentTheme;

		if (semanticColors) {
      this.domElement.style.setProperty(
				"--bodyText",
				semanticColors.bodyText || null
			);
		}
	}

	protected onDispose(): void {
		ReactDom.unmountComponentAtNode(this.domElement);
	}

	protected get dataVersion(): Version {
		return Version.parse("1.0");
	}
}
