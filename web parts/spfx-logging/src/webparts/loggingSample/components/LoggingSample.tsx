import * as React from 'react';
import styles from './LoggingSample.module.scss';
import type { ILoggingSampleProps } from './ILoggingSampleProps';
import * as strings from 'LoggingSampleWebPartStrings';

export default class LoggingSample extends React.Component<ILoggingSampleProps> {

  constructor(props: ILoggingSampleProps) {
    super(props);
  }

  public render(): React.ReactElement<ILoggingSampleProps> {

    return (
      <section className={styles.loggingSample}>
        <h3>{strings.Title}</h3>
        <div>{strings.Description}</div>
      </section>
    );
  }
}
