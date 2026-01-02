import * as React from 'react';
import styles from './TopActionSample.module.scss';
import type { ITopActionSampleProps } from './ITopActionSampleProps';

export default class TopActionSample extends React.Component<ITopActionSampleProps> {
  public render(): React.ReactElement<ITopActionSampleProps> {

    return (
      <section className={styles.topActionSample}>
        <div className={styles.welcome}>
          <h2>Top Action Sample Web Part</h2>
        </div>
        <div>
          <p>This web part demonstrates how to use the Top Actions extensibility API to add custom actions to the top action bar.</p>
        </div>
      </section>
    );
  }
}
