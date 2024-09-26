import * as React from 'react';
import styles from './StylingMgt.module.scss';
import type { IStylingMgtProps } from './IStylingMgtProps';
import { Login, Person, ThemeToggle } from '@microsoft/mgt-react';
import * as strings from 'StylingMgtWebPartStrings';
import { IStylingMgtState } from './IStylingMgtState';

export default class StylingMgt extends React.Component<IStylingMgtProps, IStylingMgtState> {
  public render(): React.ReactElement<IStylingMgtProps> {

    return (
      <section className={styles.stylingMgt}>
        <div>
          <h3>{strings.Title}</h3>
          <ThemeToggle />
          <div>
            <Login />
            <Person personQuery="me" />
          </div>
        </div>
      </section>
    );
  }
}
