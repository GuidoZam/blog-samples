import { BaseWebQuickView } from '@microsoft/sp-adaptive-card-extension-base';
import * as strings from 'HtmlQuickViewAdaptiveCardExtensionStrings';
import styles from './QuickView.module.scss';
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
        <br />
        <table class=${styles.customTable}>
          <thead>
            <tr>
              <th>Header 1</th>
              <th>Header 2</th>
              <th>Header 3</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Row 1, Cell 1</td>
              <td>Row 1, Cell 2</td>
              <td>Row 1, Cell 3</td>
            </tr>
            <tr>
              <td>Row 2, Cell 1</td>
              <td>Row 2, Cell 2</td>
              <td>Row 2, Cell 3</td>
            </tr>
            <tr>
              <td>Row 3, Cell 1</td>
              <td>Row 3, Cell 2</td>
              <td>Row 3, Cell 3</td>
            </tr>
            <tr>
              <td>Row 4, Cell 1</td>
              <td>Row 4, Cell 2</td>
              <td>Row 4, Cell 3</td>
            </tr>
          </tbody>
        </table>
      </section>`;
  }
}
