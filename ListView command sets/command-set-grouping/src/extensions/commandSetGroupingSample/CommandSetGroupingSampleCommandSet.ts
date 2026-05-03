import { Log } from '@microsoft/sp-core-library';
import {
  BaseListViewCommandSet,
  type Command,
  type IListViewCommandSetExecuteEventParameters,
  type ListViewStateChangedEventArgs
} from '@microsoft/sp-listview-extensibility';
import { Dialog } from '@microsoft/sp-dialog';
import * as strings from 'CommandSetGroupingSampleCommandSetStrings';

/**
 * If your command set uses the ClientSideComponentProperties JSON input,
 * it will be deserialized into the BaseExtension.properties object.
 * You can define an interface to describe it.
 */
export interface ICommandSetGroupingSampleCommandSetProperties {
  // IT Office configuration properties
  itHelpDeskEmail: string;
  assetManagementSystem: string;
  supportTicketUrl: string;
}

const LOG_SOURCE: string = 'CommandSetGroupingSampleCommandSet';

export default class CommandSetGroupingSampleCommandSet extends BaseListViewCommandSet<ICommandSetGroupingSampleCommandSetProperties> {

  public onInit(): Promise<void> {
    Log.info(LOG_SOURCE, 'Initialized CommandSetGroupingSampleCommandSet');

    // Configure initial visibility state for IT commands
    const retireHardwareCommand: Command = this.tryGetCommand('RETIRE_HARDWARE');
    const repairRequestCommand: Command = this.tryGetCommand('REPAIR_REQUEST');
    const updateSoftwareCommand: Command = this.tryGetCommand('UPDATE_SOFTWARE');
    const remoteAssistCommand: Command = this.tryGetCommand('REMOTE_ASSIST');

    // Initially hide commands that require selection
    if (retireHardwareCommand) {
      retireHardwareCommand.visible = false;
    }
    if (repairRequestCommand) {
      repairRequestCommand.visible = false;
    }
    if (updateSoftwareCommand) {
      updateSoftwareCommand.visible = false;
    }
    if (remoteAssistCommand) {
      remoteAssistCommand.visible = false;
    }

    this.context.listView.listViewStateChangedEvent.add(this, this._onListViewStateChanged);

    return Promise.resolve();
  }

  public onExecute(event: IListViewCommandSetExecuteEventParameters): void {
    const selectedItems = this.context.listView.selectedRows || [];
    
    switch (event.itemId) {
      case 'INSTALL_HARDWARE':
        this._handleInstallHardware();
        break;
      case 'RETIRE_HARDWARE':
        this._handleRetireHardware(selectedItems);
        break;
      case 'REPAIR_REQUEST':
        this._handleRepairRequest(selectedItems);
        break;
      case 'INSTALL_SOFTWARE':
        this._handleInstallSoftware();
        break;
      case 'UPDATE_SOFTWARE':
        this._handleUpdateSoftware(selectedItems);
        break;
      case 'CREATE_TICKET':
        this._handleCreateTicket();
        break;
      case 'REMOTE_ASSIST':
        this._handleRemoteAssist(selectedItems);
        break;
      default:
        throw new Error('Unknown command');
    }
  }

  private _handleInstallHardware(): void {
    Dialog.alert(`${strings.InstallHardware}: Initiating hardware installation workflow. Please prepare asset tags and installation documentation.`).catch(() => {
      /* handle error */
    });
  }

  private _handleRetireHardware(selectedItems: readonly any[]): void {
    const itemCount = selectedItems?.length || 0;
    Dialog.alert(`${strings.RetireHardware}: Processing retirement for ${itemCount} hardware item(s). Data wiping and asset disposal procedures will be initiated.`).catch(() => {
      /* handle error */
    });
  }

  private _handleRepairRequest(selectedItems: readonly any[]): void {
    const itemCount = selectedItems?.length || 0;
    Dialog.alert(`${strings.RepairRequest}: Creating repair request for ${itemCount} hardware item(s). Maintenance team will be notified.`).catch(() => {
      /* handle error */
    });
  }

  private _handleInstallSoftware(): void {
    Dialog.alert(`${strings.InstallSoftware}: Opening software catalog for installation. Please select appropriate licenses and deployment targets.`).catch(() => {
      /* handle error */
    });
  }

  private _handleUpdateSoftware(selectedItems: readonly any[]): void {
    const itemCount = selectedItems?.length || 0;
    Dialog.alert(`${strings.UpdateSoftware}: Scheduling software updates for ${itemCount} system(s). Updates will be applied during maintenance window.`).catch(() => {
      /* handle error */
    });
  }

  private _handleCreateTicket(): void {
    const ticketUrl = this.properties.supportTicketUrl || '#';
    Dialog.alert(`${strings.CreateTicket}: Redirecting to support ticket system. URL: ${ticketUrl}`).catch(() => {
      /* handle error */
    });
  }

  private _handleRemoteAssist(selectedItems: readonly any[]): void {
    const itemCount = selectedItems?.length || 0;
    Dialog.alert(`${strings.RemoteAssist}: Initiating remote assistance session for ${itemCount} system(s). Please ensure remote access is enabled.`).catch(() => {
      /* handle error */
    });
  }

  private _onListViewStateChanged = (args: ListViewStateChangedEventArgs): void => {
    Log.info(LOG_SOURCE, 'List view state changed');

    const selectedCount = this.context.listView.selectedRows?.length || 0;

    // Hardware commands visibility logic
    const retireHardwareCommand: Command = this.tryGetCommand('RETIRE_HARDWARE');
    if (retireHardwareCommand) {
      // Show retire command when one or more items are selected
      retireHardwareCommand.visible = selectedCount > 0;
    }

    const repairRequestCommand: Command = this.tryGetCommand('REPAIR_REQUEST');
    if (repairRequestCommand) {
      // Show repair request when exactly one item is selected
      repairRequestCommand.visible = selectedCount === 1;
    }

    // Software commands visibility logic
    const updateSoftwareCommand: Command = this.tryGetCommand('UPDATE_SOFTWARE');
    if (updateSoftwareCommand) {
      // Show update command when one or more items are selected
      updateSoftwareCommand.visible = selectedCount > 0;
    }

    // Support commands visibility logic
    const remoteAssistCommand: Command = this.tryGetCommand('REMOTE_ASSIST');
    if (remoteAssistCommand) {
      // Show remote assistance when exactly one item is selected
      remoteAssistCommand.visible = selectedCount === 1;
    }

    // Always visible commands: INSTALL_HARDWARE, INSTALL_SOFTWARE, CREATE_TICKET
    // These don't depend on selection state

    // You should call this.raiseOnChage() to update the command bar
    this.raiseOnChange();
  }
}
