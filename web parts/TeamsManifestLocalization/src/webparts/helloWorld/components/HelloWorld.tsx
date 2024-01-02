import * as React from 'react';
import styles from './HelloWorld.module.scss';
import type { IHelloWorldProps } from './IHelloWorldProps';
import * as strings from 'HelloWorldWebPartStrings';

export default class HelloWorld extends React.Component<IHelloWorldProps, {}> {
  public render(): React.ReactElement<IHelloWorldProps> {
    return (
      <section className={styles.helloWorld}>
        <div className={styles.welcome}>
          {strings.WelcomeString}
        </div>
      </section>
    );
  }
}
