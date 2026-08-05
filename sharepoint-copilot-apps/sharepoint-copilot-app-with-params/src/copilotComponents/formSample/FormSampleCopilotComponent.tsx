import * as React from 'react';
import * as ReactDOM from 'react-dom';

import { BaseCopilotComponent } from '@microsoft/sp-copilot-component';
import type { SPCopilotDisplayMode } from '@microsoft/sp-copilot-component';
import type { MSGraphClientV3 } from '@microsoft/sp-http';

import FormSample from './components/FormSample';
import type { IFormSampleProps } from './components/IFormSampleProps';
import type { IFormSampleCopilotComponentProperties } from './FormSampleCopilotComponentProperties';

import * as strings from 'FormSampleCopilotComponentStrings';

/**
 * SPFx Copilot Component that renders a React-based UI demonstrating the
 * platform's headline capabilities:
 *
 * - **Brokered SSO data calls** — Microsoft Graph (`/me`) and SharePoint REST
 *   (`/_api/web`) with zero token code. The SPFx runtime's Pairwise Broker
 *   automatically provisions tokens for `SPHttpClient` and `MSGraphClientV3`.
 *
 * - **Host context & theming** — reads `hostContext.theme` and
 *   `hostContext.displayMode` to adapt to the Copilot host environment.
 *
 * - **Bridge actions** — demonstrates `requestDisplayModeAsync`,
 *   `openLinkAsync`, `sendFollowUpMessageAsync`, and `requestSizeChangeAsync`.
 *
 * Lifecycle:
 *  1. `onInit()` — fetches user and site data (runs once before first render).
 *  2. `render()` — mounts the React tree into `this.context.domElement`.
 *     Re-invoked by the framework on host-context changes.
 *  3. `onTeardown()` — unmounts React before the host tears down the iframe.
 */
export default class FormSampleCopilotComponent extends BaseCopilotComponent<IFormSampleCopilotComponentProperties> {
  private _userDisplayName: string = '';

  protected async onInit(): Promise<void> {

    // Fetch user info from Microsoft Graph (brokered SSO — no token code needed).
    // Wrapped in try/catch so the component still renders in the workbench where
    // real services may not be available.
    try {
      const graphClient: MSGraphClientV3 = await this.context.msGraphClientFactory.getClient('3');
      const me: { displayName?: string } = await graphClient.api('/me').select('displayName').get();
      this._userDisplayName = me.displayName || 'User';
    } catch {
      this._userDisplayName = this.context.pageContext.user?.displayName || 'User';
    }
  }

  protected render(): void {
    const props: IFormSampleProps = {
      userDisplayName: this._userDisplayName,
      hostContext: this.hostContext,
      bridge: this.context.copilotBridge,
      onRequestDisplayMode: async (mode: SPCopilotDisplayMode) => {
        await this.requestDisplayModeAsync(mode);
      },
      onRequestSizeChange: async (width: number, height: number) => {
        await this.requestSizeChangeAsync(width, height);
      },
      targetDocument: this.context.domElement.ownerDocument,
      strings,
      username: this.properties.username,
      firstName: this.properties.firstName,
      lastName: this.properties.lastName,
      role: this.properties.role,
      creationDate: this.properties.creationDate
    };

    ReactDOM.render(React.createElement(FormSample, props), this.context.domElement);
  }

  protected async onTeardown(): Promise<void> {
    ReactDOM.unmountComponentAtNode(this.context.domElement);
  }
}
