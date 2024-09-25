import * as React from 'react';
import styles from './StylingMgt.module.scss';
import type { IStylingMgtProps } from './IStylingMgtProps';
import { Agenda, Person, ThemeToggle } from '@microsoft/mgt-react';
import * as strings from 'StylingMgtWebPartStrings';

export default class StylingMgt extends React.Component<IStylingMgtProps, {}> {
  public render(): React.ReactElement<IStylingMgtProps> {
    return (
      <section className={styles.stylingMgt}>
        <div>
          <h3>{strings.Title}</h3>
          <ThemeToggle />
          <Person personQuery="me" />
          <Agenda />
        </div>
      </section>
    );
  }
}
