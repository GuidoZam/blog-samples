import * as React from 'react';
import styles from './HelloFunctional.module.scss';
import type { IHelloClassProps } from './IHelloClassProps';
import * as strings from 'HelloFunctionalWebPartStrings';

interface HelloClassState {
  count: number;
}

export default class HelloClass extends React.Component<IHelloClassProps, HelloClassState> {
  constructor(props: IHelloClassProps) {
    super(props);
    this.state = { count: 0 };
  }

  handleIncrement = (): void => {
    this.setState((prevState) => ({ count: prevState.count + 1 }));
  };

  handleReset = (): void => {
    this.setState({ count: 0 });
  };

  public render(): React.ReactElement<IHelloClassProps> {
    return (
      <section className={styles.helloFunctional}>
        <div>
          <h3>{strings.Title}</h3>
          <p>
            {strings.ClassMessage}
          </p>
          <div>Counter: {this.state.count}</div>
          <button className={styles.counterButton} onClick={this.handleIncrement}>
            {strings.Increment}
          </button>
          <button className={styles.counterButton} style={{ marginLeft: '0.5em' }} onClick={this.handleReset}>
            {strings.Reset}
          </button>
        </div>
      </section>
    );
  }
}

