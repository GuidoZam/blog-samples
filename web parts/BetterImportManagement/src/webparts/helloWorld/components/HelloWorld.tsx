import * as React from 'react';
import styles from './HelloWorld.module.scss';
import type { IHelloWorldProps } from './IHelloWorldProps';
// Import the custom component using the alias
import SampleText from 'custom-components/SampleText';

export default class HelloWorld extends React.Component<IHelloWorldProps, {}> {
  public render(): React.ReactElement<IHelloWorldProps> {
    return (
      <section className={styles.helloWorld}>
        <div>
          <h2>Sample content</h2>
          <SampleText text="Sample text from custom-components" />
        </div>
      </section>
    );
  }
}
