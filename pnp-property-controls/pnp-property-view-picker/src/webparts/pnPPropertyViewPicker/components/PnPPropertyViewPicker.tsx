import * as React from 'react';
import styles from './PnPPropertyViewPicker.module.scss';
import type { IPnPPropertyViewPickerProps } from './IPnPPropertyViewPickerProps';

export default class PnPPropertyViewPicker extends React.Component<IPnPPropertyViewPickerProps> {
  public render(): React.ReactElement<IPnPPropertyViewPickerProps> {

    return (
      <section className={styles.pnPPropertyViewPicker}>
        <div>
          <h3>Welcome to SharePoint Framework!</h3>
          <p>
            The SharePoint Framework (SPFx) is a extensibility model for Microsoft Viva, Microsoft Teams and SharePoint. It&#39;s the easiest way to extend Microsoft 365 with automatic Single Sign On, automatic hosting and industry standard tooling.
          </p>
        </div>
      </section>
    );
  }
}
