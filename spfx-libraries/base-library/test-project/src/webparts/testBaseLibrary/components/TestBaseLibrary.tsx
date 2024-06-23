import * as React from 'react';
import styles from './TestBaseLibrary.module.scss';
import type { ITestBaseLibraryProps } from './ITestBaseLibraryProps';
import * as strings from 'TestBaseLibraryWebPartStrings';

// Import of the custom base library
import * as BaseLibrary from 'base-library';

export default class TestBaseLibrary extends React.Component<ITestBaseLibraryProps, {}> {
  public render(): React.ReactElement<ITestBaseLibraryProps> {
    const baseLibrary = new BaseLibrary.BaseLibrary();

    const greeting = baseLibrary.getPirateGreeting();
    const currentDate = new Date();
    const dayOfWeek = baseLibrary.getDayOfWeek(currentDate);
    const isLeapYearMessage = baseLibrary.isLeapYearMessage(currentDate);

    return (
      <section className={styles.testBaseLibrary}>
        <div className={styles.welcome}>
          <div>{strings.Title}</div>
        </div>
        <div>
          {greeting}
        </div>
        <div>
          {dayOfWeek}
        </div>
        <div>
          {isLeapYearMessage}
        </div>
      </section>
    );
  }
}
