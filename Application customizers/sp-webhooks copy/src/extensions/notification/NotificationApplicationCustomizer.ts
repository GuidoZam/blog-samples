import { Log } from '@microsoft/sp-core-library';
import {
  BaseApplicationCustomizer
} from '@microsoft/sp-application-base';
import {
	ListSubscriptionFactory
} from "@microsoft/sp-list-subscription";
import { Guid } from "@microsoft/sp-core-library";
import { spfi, SPFx } from "@pnp/sp";
import "@pnp/sp/webs";
import "@pnp/sp/lists";
import "@pnp/sp/items";
import * as React from "react";
import * as ReactDOM from "react-dom";
import { Toast } from "./Toast";

import * as strings from 'NotificationApplicationCustomizerStrings';
import { INotifyChangeArgs } from './INotifyChangeArgs';

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
	public onInit(): Promise<void> {
		Log.info(LOG_SOURCE, `Initialized ${strings.Title}`);
		console.log(`${LOG_SOURCE} Initialized ${strings.Title}`);

		let message: string = this.properties.testMessage;
		if (!message) {
			message = "(No properties were provided.)";
		}

    this.createListSubscription()
      .catch((error) => {
        console.error(`${LOG_SOURCE} Error creating list subscription:`, error);
      });

		return Promise.resolve();
	}

	private _listSubscriptionFactory: ListSubscriptionFactory;

	private async createListSubscription(): Promise<void> {
		this._listSubscriptionFactory = new ListSubscriptionFactory(this);
		await this._listSubscriptionFactory.createSubscription({
      listId: Guid.parse("44c29d1b-e53d-42cb-9369-1a566db4373e"),//this.properties.listId),
      callbacks: {
        notification: this._notifyChange.bind(this),
        connect: () => {
          console.log("List subscription connected.");
        },
        disconnect: () => {
          console.log("List subscription disconnected.");
        }
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
      const itemResult = await sp.web.lists.getById(listId).items.orderBy("Modified", false).top(1)();
      
      if (!itemResult || itemResult.length === 0) {
        console.warn("No items found in the list.");
        return;
      }

      const item = itemResult[0];
      console.log("Latest item:", item);

      // Show Fluent UI toast notification in bottom right
      const toastId = "spfx-fluent-toast-root";
      let toastRoot = document.getElementById(toastId);
      if (!toastRoot) {
        console.log("Creating toast root element");
        toastRoot = document.createElement("div");
        toastRoot.id = toastId;
        document.body.appendChild(toastRoot);
      }

      console.log("Rendering toast notification");
      ReactDOM.render(
        React.createElement(Toast, {
          message: `${item.Title} updated!`,
          onDismiss: () => {
            ReactDOM.unmountComponentAtNode(toastRoot!);
          }
        }),
        toastRoot
      );
    } catch (err) {
      console.error("Error fetching latest item:", err);
    }
  }
}
