import { BaseWebQuickView } from '@microsoft/sp-adaptive-card-extension-base';
import * as strings from 'HtmlQuickViewAdaptiveCardExtensionStrings';
import * as styles from './QuickView.module.scss';
import {
  IHtmlQuickViewAdaptiveCardExtensionProps,
  IHtmlQuickViewAdaptiveCardExtensionState
} from '../HtmlQuickViewAdaptiveCardExtension';

export class QuickView extends BaseWebQuickView<
  IHtmlQuickViewAdaptiveCardExtensionProps,
  IHtmlQuickViewAdaptiveCardExtensionState> {
  
  render(): void {
    this.domElement.innerHTML = `
      <section class=${styles.container}>
        <h2>${strings.HtmlTitle}</h2>
        <div>
          ${strings.HtmlDescription}
        </div>
      </section>`;
  }
}
