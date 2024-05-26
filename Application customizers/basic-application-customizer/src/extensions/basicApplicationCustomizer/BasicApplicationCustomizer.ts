import * as React from "react";  
import * as ReactDom from "react-dom";
import { Log } from '@microsoft/sp-core-library';
import {
	BaseApplicationCustomizer,
	PlaceholderContent,
	PlaceholderName,
} from "@microsoft/sp-application-base";

import TopComponent from "./components/TopComponent";
import BottomComponent from './components/BottomComponent';

const LOG_SOURCE: string = 'BasicApplicationCustomizer';

/**
 * If your command set uses the ClientSideComponentProperties JSON input,
 * it will be deserialized into the BaseExtension.properties object.
 * You can define an interface to describe it.
 */
export interface IBasicApplicationCustomizerProperties {
}

/** A Custom Action which can be run during execution of a Client Side Application */
export default class BasicApplicationCustomizer extends BaseApplicationCustomizer<IBasicApplicationCustomizerProperties> {
	private _topPlaceholder: PlaceholderContent | undefined;
	private _bottomPlaceholder: PlaceholderContent | undefined;

	protected onInit(): Promise<void> {
		Log.info(LOG_SOURCE, "Initialized BasicApplicationCustomizer");

		// Handling the top placeholder
		this._renderTopPlaceHolder();

		// Handling the bottom placeholder
		this._renderBottomPlaceHolder();

		return Promise.resolve();
	}

	private _renderTopPlaceHolder(): void {
		console.log(this.context.placeholderProvider.placeholderNames);
		if (!this._topPlaceholder) {
			this._topPlaceholder = this.context.placeholderProvider.tryCreateContent(
				PlaceholderName.Top,
				{ onDispose: this._handleDispose }
			);

			// The extension should not assume that the expected placeholder is available.
			if (!this._topPlaceholder) {
				return;
			}

			if (this._topPlaceholder.domElement) {
				const element = React.createElement(TopComponent, {});
				ReactDom.render(element, this._topPlaceholder.domElement);
			}
		}
	}

	private _renderBottomPlaceHolder(): void {
		// check if the application customizer has already been rendered
		if (!this._bottomPlaceholder) {
			// create a DOM element in the top placeholder for the application customizer to render
			this._bottomPlaceholder =
				this.context.placeholderProvider.tryCreateContent(
					PlaceholderName.Bottom,
					{ onDispose: this._handleDispose }
				);
		}
		// if the top placeholder is not available, there is no place in the UI
		// for the app customizer to render, so quit.
		if (!this._bottomPlaceholder) {
			return;
		}

		const element: React.ReactElement<{}> = React.createElement(
			BottomComponent,
			{}
		);

		// render the UI using a React component
		ReactDom.render(element, this._bottomPlaceholder.domElement);
	}

	private _handleDispose(): void {
		console.log(
			"[BasicApplicationCustomizer._onDispose] Disposed custom top and bottom placeholders."
		);
	}
}
