import { Log } from '@microsoft/sp-core-library';
import {
  BaseApplicationCustomizer,
  PlaceholderContent,
  PlaceholderName
} from '@microsoft/sp-application-base';
import { Dialog } from '@microsoft/sp-dialog';
import { ListSubscriptionFactory } from "@microsoft/sp-list-subscription";
import { Guid } from "@microsoft/sp-core-library";
import { spfi, SPFx } from "@pnp/sp";
import "@pnp/sp/webs";
import "@pnp/sp/lists";
import "@pnp/sp/items";
import * as React from "react";
import * as ReactDOM from "react-dom";
// import { Toast } from "./Toast";
import { INotifyChangeArgs } from "./INotifyChangeArgs";
import * as strings from 'NotificationApplicationCustomizerStrings';
import Sample from './components/sample';

const LOG_SOURCE: string = 'NotificationApplicationCustomizer';

/**
 * If your command set uses the ClientSideComponentProperties JSON input,
 * it will be deserialized into the BaseExtension.properties object.
 * You can define an interface to describe it.
 */
export interface INotificationApplicationCustomizerProperties {
  // This is an example; replace with your own property
  testMessage: string;
}

/** A Custom Action which can be run during execution of a Client Side Application */
export default class NotificationApplicationCustomizer extends BaseApplicationCustomizer<INotificationApplicationCustomizerProperties> {
	private _notificationPlaceholder: PlaceholderContent | undefined;
  
	public onInit(): Promise<void> {
		Log.info(LOG_SOURCE, `Initialized ${strings.Title}`);

		let message: string = this.properties.testMessage;
		if (!message) {
			message = "(No properties were provided.)";
		}

		Dialog.alert(`Hello from ${strings.Title}:\n\n${message}`).catch(() => {
			/* handle error */
		});

		this.createListSubscription().catch((error) => {
			console.error(`${LOG_SOURCE} Error creating list subscription:`, error);
		});

		return Promise.resolve();
	}

	private _listSubscriptionFactory: ListSubscriptionFactory;

	private async createListSubscription(): Promise<void> {
		this._listSubscriptionFactory = new ListSubscriptionFactory(this);
		console.log("Creating list subscription...");
		await this._listSubscriptionFactory.createSubscription({
			listId: Guid.parse("44c29d1b-e53d-42cb-9369-1a566db4373e"), //this.properties.listId),
			callbacks: {
				notification: this._notifyChange,
				connect: () => {
					console.log("List subscription connected.");
				},
				disconnect: () => {
					console.log("List subscription disconnected.");
				},
			},
		});
	}

	private async _notifyChange(changeEvent?: INotifyChangeArgs): Promise<void> {
		console.log("List has changed!");
		console.log(changeEvent);

		// Get the listId from the subscription event or use the hardcoded one
		const listId = "44c29d1b-e53d-42cb-9369-1a566db4373e";
		const sp = spfi().using(SPFx(this.context));
		try {
			// Get the latest item (ordered by Modified desc)
			const itemResult = await sp.web.lists
				.getById(listId)
				.items.orderBy("Modified", false)
				.top(1)();

			if (!itemResult || itemResult.length === 0) {
				console.warn("No items found in the list.");
				return;
			}

			const item = itemResult[0];
			console.log("Latest item:", item);

			// check if the application customizer has already been rendered
			if (!this._notificationPlaceholder) {
				this._notificationPlaceholder =
					this.context.placeholderProvider.tryCreateContent(
						PlaceholderName.Top
					);

				// if the top placeholder is not available, there is no place in the UI
				// for the app customizer to render, so quit.
				if (!this._notificationPlaceholder) {
					return;
				}

				if (this._notificationPlaceholder.domElement) {
					// create a DOM element in the top placeholder for the application customizer to render
					// const element = React.createElement(Toast, 
          //   { message: "test", onDismiss: () => { /* handle dismiss */ } });
          
          // TODO: not working, needs to be fixed
          const element = React.createElement(Sample, { });
					// render the UI using a React component
					ReactDOM.render(element, this._notificationPlaceholder.domElement);
				}
			}
		} catch (err) {
			console.error("Error fetching latest item:", err);
		}
	}
}
