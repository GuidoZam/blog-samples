import { BaseCopilotComponent } from '@microsoft/sp-copilot-component';
import { escape } from '@microsoft/sp-lodash-subset';

import type { IDisplayModeDemoCopilotComponentProperties } from './DisplayModeDemoCopilotComponentProperties';

import styles from './DisplayModeDemoCopilotComponent.module.scss';
import welcomeDark from './assets/welcome-dark.png';
import welcomeLight from './assets/welcome-light.png';

import * as strings from 'DisplayModeDemoCopilotComponentStrings';

const FULLSCREEN_ICON: string = '⛶';
const INLINE_ICON: string = "⇲";

export default class DisplayModeDemoCopilotComponent extends BaseCopilotComponent<IDisplayModeDemoCopilotComponentProperties> {
  protected render(): void {
    const userName: string = this.context.pageContext.user.displayName || 'there';
    const theme: string = this.hostContext.theme || strings.UnknownTheme;
    const displayMode: string = this.hostContext.displayMode || strings.UnknownTheme;
    const availableDisplayModes: string = (this.hostContext.availableDisplayModes || []).join(', ');
    const isDarkTheme: boolean = this.hostContext.theme === 'dark';
    const isFullscreen: boolean = this.hostContext.displayMode === 'fullscreen';

    const rootClass: string = `${styles.displayModeDemo} ${isDarkTheme ? styles.dark : ''}`;

    const toggleModeHtml: string = `<span 
      id="hc-toggle-mode"
      class="${styles.toggleModeButton}"
      role="button"
      tabindex="0"
      title="${isFullscreen ? strings.ExpandToFullscreenTitle : strings.CollapseToInlineTitle}"
      aria-label="${isFullscreen ? strings.ExpandToFullscreenTitle : strings.CollapseToInlineTitle}">
        ${isFullscreen ? INLINE_ICON : FULLSCREEN_ICON}
      </span>`;

    // Fullscreen gets an extra detail panel; there is no "collapse" button by design, that's the host's job.
    const fullscreenOnlyHtml: string = isFullscreen
      ? `<div class="${styles.fullscreenPanel}">
          <p class="${styles.fullscreenNote}">${strings.FullscreenOnlyNote}</p>
          <p class="${styles.fullscreenHint}">${strings.CollapseHint}</p>
        </div>`
      : '';

    this.context.domElement.innerHTML = `
      <section class="${rootClass}">
        <div class="${styles.header}">
          <p class="${styles.greeting}">${strings.WelcomeGreeting} ${escape(userName)}</p>
          ${toggleModeHtml}
        </div>

        <img class="${styles.welcomeImage}" alt="" src="${isDarkTheme ? welcomeDark : welcomeLight}" />

        <div class="${styles.details}">
          <div class="${styles.row}">
            <span class="${styles.label}">${strings.DisplayModeLabel}</span>
            <span class="${styles.value}">${escape(displayMode)}</span>
          </div>
          <div class="${styles.row}">
            <span class="${styles.label}">${strings.AvailableModesLabel}</span>
            <span class="${styles.value}">${escape(availableDisplayModes)}</span>
          </div>
          <div class="${styles.row}">
            <span class="${styles.label}">${strings.ThemeLabel}</span>
            <span class="${styles.value}">${escape(theme)}</span>
          </div>
          <div class="${styles.row}">
            <span class="${styles.label}">${strings.MessageLabel}</span>
            <span class="${styles.value}">${escape(this.properties.message)}</span>
          </div>
        </div>

        ${fullscreenOnlyHtml}
      </section>`;

    const toggleModeButton: HTMLElement | null = this.context.domElement.querySelector('#hc-toggle-mode');
    if (toggleModeButton) {
      toggleModeButton.addEventListener('click', this._handleRequestToggleMode);
      toggleModeButton.addEventListener('keydown', (event: KeyboardEvent) => {
        if (event.key === 'Enter' || event.key === ' ') {
          event.preventDefault();
          this._handleRequestToggleMode().catch(() => undefined);
        }
      });
    }
  }

  private _handleRequestToggleMode = async (): Promise<void> => {
    try {
      const isFullscreen: boolean =
				this.hostContext.displayMode === "fullscreen";

      await this.requestDisplayModeAsync(isFullscreen ? 'inline' : 'fullscreen');
    } catch {
      // The host may deny the request;
      // the next hostContext update reflects the real mode either way.
    }
  };
}
