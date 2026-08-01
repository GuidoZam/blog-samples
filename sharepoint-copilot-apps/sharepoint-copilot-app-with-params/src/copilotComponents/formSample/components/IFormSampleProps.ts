import type {
  ICopilotComponentHostContext,
  ISPCopilotBridge,
  SPCopilotDisplayMode
} from '@microsoft/sp-copilot-component';

export interface IFormSampleStrings {
  UsernameLabel: string;
  FirstNameLabel: string;
  LastNameLabel: string;
  RoleLabel: string;
  CreationDateLabel: string;
  FormTitle: string;
  SubmitButtonLabel: string;
}

export interface IFormSampleProps {
  /** User display name fetched from Microsoft Graph /me. */
  userDisplayName: string;
  /** Host context (theme, display mode) from the Copilot host. */
  hostContext: ICopilotComponentHostContext;
  /** Bridge to communicate with the Copilot host (public API surface). */
  bridge: ISPCopilotBridge;
  /** Request the host to change display mode (e.g. 'fullscreen'). */
  onRequestDisplayMode: (mode: SPCopilotDisplayMode) => Promise<void>;
  /** Request the host to resize the component iframe. */
  onRequestSizeChange: (width: number, height: number) => Promise<void>;
  /**
   * Document the FluentProvider should inject its theme styles into. Pass
   * `domElement.ownerDocument` so Griffel writes CSS into the correct iframe
   * document rather than the top-level page.
   */
  targetDocument: Document | undefined;
  /** Localized strings for UI labels. */
  strings: IFormSampleStrings;
  /** Username for the form (optional). */
  username?: string;
  /** First name of the user (optional). */
  firstName?: string;
  /** Last name of the user (optional). */
  lastName?: string;
  /** Role of the user (optional). */
  role?: "Admin" | "Editor" | "Viewer" | undefined;
  /** Creation date for the user account (optional). */
  creationDate?: string;
}
