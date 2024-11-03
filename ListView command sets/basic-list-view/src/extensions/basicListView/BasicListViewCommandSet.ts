import {
  BaseListViewCommandSet,
  type Command,
  type IListViewCommandSetExecuteEventParameters,
  type ListViewStateChangedEventArgs
} from '@microsoft/sp-listview-extensibility';
import { Dialog } from '@microsoft/sp-dialog';

/**
 * If your command set uses the ClientSideComponentProperties JSON input,
 * it will be deserialized into the BaseExtension.properties object.
 * You can define an interface to describe it.
 */
export interface IBasicListViewCommandSetProperties {
  AddToFavoritesText: string;
  ListFavoritesText: string;
}

const ADD_TO_FAVORITES: string = "ADD_TO_FAVORITES";
const LIST_FAVORITES: string = "LIST_FAVORITES";

export default class BasicListViewCommandSet extends BaseListViewCommandSet<IBasicListViewCommandSetProperties> {

  public onInit(): Promise<void> {
    // initial state of the command's visibility
    const addToFavoritesCommand: Command = this.tryGetCommand(ADD_TO_FAVORITES);
    addToFavoritesCommand.visible = false;

    this.context.listView.listViewStateChangedEvent.add(this, this._onListViewStateChanged);

    return Promise.resolve();
  }

  public onExecute(event: IListViewCommandSetExecuteEventParameters): void {
    switch (event.itemId) {
			case ADD_TO_FAVORITES:
				Dialog.alert(`${this.properties.AddToFavoritesText}`).catch(() => {
					/* handle error */
				});
				break;
			case LIST_FAVORITES:
				Dialog.alert(`${this.properties.ListFavoritesText}`).catch(() => {
					/* handle error */
				});
				break;
			default:
				throw new Error("Unknown command");
		}
  }

  private _onListViewStateChanged = (args: ListViewStateChangedEventArgs): void => {

    const addToFavoritesCommand: Command = this.tryGetCommand(ADD_TO_FAVORITES);
    if (addToFavoritesCommand) {
			// This command should be hidden unless exactly one row is selected.
			addToFavoritesCommand.visible =
				this.context.listView.selectedRows?.length === 1;
		}

    // You should call this.raiseOnChage() to update the command bar
    this.raiseOnChange();
  }
}
