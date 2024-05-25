import * as React from "react";  
import * as ReactDom from "react-dom";
import { override } from "@microsoft/decorators";
import { Log } from '@microsoft/sp-core-library';
import {
	BaseApplicationCustomizer,
	PlaceholderContent,
	PlaceholderName,
} from "@microsoft/sp-application-base";

//import * as strings from 'BasicApplicationCustomizerApplicationCustomizerStrings';
import TopComponent from "./components/TopComponent";
import BottomComponent from './components/BottomComponent';

const LOG_SOURCE: string = 'BasicApplicationCustomizerApplicationCustomizer';

/**
 * If your command set uses the ClientSideComponentProperties JSON input,
 * it will be deserialized into the BaseExtension.properties object.
 * You can define an interface to describe it.
 */
export interface IBasicApplicationCustomizerApplicationCustomizerProperties {
}

/** A Custom Action which can be run during execution of a Client Side Application */
export default class BasicApplicationCustomizerApplicationCustomizer extends BaseApplicationCustomizer<IBasicApplicationCustomizerApplicationCustomizerProperties> {
	private _topPlaceholder: PlaceholderContent | undefined;
	private _bottomPlaceholder: PlaceholderContent | undefined;

	@override
	protected async onInit(): Promise<void> {
		await super.onInit();

		Log.info(
			LOG_SOURCE,
			"Initialized BasicApplicationCustomizerApplicationCustomizer"
		);
		console.log("Initialized!");

		// // Added to handle possible changes on the existence of placeholders
		// this.context.placeholderProvider.changedEvent.add(
		// 	this,
		// 	this._renderPlaceHolders
		// );

		await this._renderPlaceHolders();

		return Promise.resolve();
	}

	private async _renderPlaceHolders(): Promise<void> {
		// Handling the top placeholder
		await this._renderTopPlaceHolder();

		// Handling the bottom placeholder
		await this._renderBottomPlaceHolder();
	}

	private async _renderTopPlaceHolder(): Promise<void> {
		console.log("Rendering top placeholder");
		console.log(this.context.placeholderProvider.placeholderNames);
		if (!this._topPlaceholder) {
			this._topPlaceholder = this.context.placeholderProvider.tryCreateContent(
				PlaceholderName.Top,
				{ onDispose: this._handleDispose }
			);

			// The extension should not assume that the expected placeholder is available.
			if (!this._topPlaceholder) {
				console.error("The expected placeholder (Top) was not found.");
				return;
			}

			if (this._topPlaceholder.domElement) {
				const element = React.createElement(TopComponent, {});
				ReactDom.render(element, this._topPlaceholder.domElement);
			}
		}
	}

	private async _renderBottomPlaceHolder(): Promise<void> {
		console.log("Rendering bottom placeholder");

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
