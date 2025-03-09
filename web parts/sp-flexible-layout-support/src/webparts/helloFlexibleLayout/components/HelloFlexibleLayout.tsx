import * as React from 'react';
import styles from './HelloFlexibleLayout.module.scss';
import type { IHelloFlexibleLayoutProps } from './IHelloFlexibleLayoutProps';

export default class HelloFlexibleLayout extends React.Component<IHelloFlexibleLayoutProps> {
  public render(): React.ReactElement<IHelloFlexibleLayoutProps> {
    return (
      <section className={styles.helloFlexibleLayout}>
        <h2>Sample content</h2>
      </section>
    );
  }
}
