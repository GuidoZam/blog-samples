import * as React from 'react';
import styles from './SoFlexible.module.scss';
import type { ISoFlexibleProps } from './ISoFlexibleProps';

export default class SoFlexible extends React.Component<ISoFlexibleProps> {
  public render(): React.ReactElement<ISoFlexibleProps> {
    const {
      description
    } = this.props;

    return (
      <section className={styles.soFlexible}>
        <h3>Welcome to SharePoint Framework!</h3>
        <p>{description}</p>
        <p>
          The SharePoint Framework (SPFx) is a extensibility model for Microsoft Viva, Microsoft Teams and SharePoint. It&#39;s the easiest way to extend Microsoft 365 with automatic Single Sign On, automatic hosting and industry standard tooling.
        </p>
      </section>
    );
  }
}
