import * as React from 'react';
import styles from './TestBaseLibrary.module.scss';
import type { ITestBaseLibraryProps } from './ITestBaseLibraryProps';
import * as strings from 'TestBaseLibraryWebPartStrings';

// Import of the custom base library
import * as BaseLibrary from 'base-library';

export default class TestBaseLibrary extends React.Component<ITestBaseLibraryProps, {}> {
  public render(): React.ReactElement<ITestBaseLibraryProps> {
    const baseLibrary = new BaseLibrary.BaseLibraryLibrary();

    const time = baseLibrary.getCurrentTime();

    return (
      <section className={styles.testBaseLibrary}>
        <div className={styles.welcome}>
          <div>{strings.Title}</div>
        </div>
        <div>
          {strings.BaseLibraryResult}<br/>
          {time}
        </div>
      </section>
    );
  }
}
