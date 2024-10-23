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

export interface IBasicApplicationCustomizerProperties {
}

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
		// check if the application customizer has already been rendered
		if (!this._topPlaceholder) {
			this._topPlaceholder = this.context.placeholderProvider.tryCreateContent(
				PlaceholderName.Top,
				{ onDispose: this._handleDispose }
			);

			// if the top placeholder is not available, there is no place in the UI
			// for the app customizer to render, so quit.
			if (!this._topPlaceholder) {
				return;
			}

			if (this._topPlaceholder.domElement) {
				// create a DOM element in the top placeholder for the application customizer to render
				const element = React.createElement(TopComponent, {});
				// render the UI using a React component
				ReactDom.render(element, this._topPlaceholder.domElement);
			}
		}
	}

	private _renderBottomPlaceHolder(): void {
		// check if the application customizer has already been rendered
		if (!this._bottomPlaceholder) {
			this._bottomPlaceholder =
				this.context.placeholderProvider.tryCreateContent(
					PlaceholderName.Bottom,
					{ onDispose: this._handleDispose }
				);
		}
		// if the bottom placeholder is not available, there is no place in the UI
		// for the app customizer to render, so quit.
		if (!this._bottomPlaceholder) {
			return;
		}

		if (this._bottomPlaceholder.domElement) {
			// create a DOM element in the bottom placeholder for the application customizer to render
			const element = React.createElement(BottomComponent, {});
			// render the UI using a React component
			ReactDom.render(element, this._bottomPlaceholder.domElement);
		}
	}

	private _handleDispose(): void {
		console.log(
			"[BasicApplicationCustomizer._onDispose] Disposed custom top and bottom placeholders."
		);
	}
}
