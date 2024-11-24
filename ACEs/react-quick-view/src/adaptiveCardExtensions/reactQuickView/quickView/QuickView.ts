import { BaseWebQuickView } from "@microsoft/sp-adaptive-card-extension-base";
import * as strings from 'ReactQuickViewAdaptiveCardExtensionStrings';
import {
  IReactQuickViewAdaptiveCardExtensionProps,
  IReactQuickViewAdaptiveCardExtensionState
} from '../ReactQuickViewAdaptiveCardExtension';
import * as React from "react";
import * as ReactDOM from "react-dom";
import CustomComponent from './components/CustomComponent';

export class QuickView extends BaseWebQuickView<
	IReactQuickViewAdaptiveCardExtensionProps,
	IReactQuickViewAdaptiveCardExtensionState
> {
	render(): void {
		if (this.domElement) {
			const element = React.createElement(CustomComponent, {
				message: strings.Message,
			});

			ReactDOM.render(element, this.domElement);
		} else {
			console.error(strings.DomElementNotFound);
		}
	}

	public componentWillUnmount(): void {
		if (this.domElement) {
			ReactDOM.unmountComponentAtNode(this.domElement);
		}
	}
}
