import * as React from 'react';
import styles from './LoggingSample.module.scss';
import type { ILoggingSampleProps } from './ILoggingSampleProps';
import * as strings from 'LoggingSampleWebPartStrings';
import { Log } from '@microsoft/sp-core-library';

export default class LoggingSample extends React.Component<ILoggingSampleProps> {

  constructor(props: ILoggingSampleProps) {
    super(props);

    Log.verbose('LoggingSample', 'This is a verbose message');
    Log.info('LoggingSample', 'WebPart Initialized!');
    Log.warn('LoggingSample', 'This is a warning message');
    Log.error('LoggingSample', new Error('This is an error message'));
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
