import * as React from 'react';
import styles from './StylingMgtThemeToggle.module.scss';
import type { IStylingMgtThemeToggleProps } from './IStylingMgtThemeToggleProps';
import { Login, ThemeToggle } from '@microsoft/mgt-react';
import * as strings from 'StylingMgtWebPartStrings';

export default class StylingMgtThemeToggle extends React.Component<IStylingMgtThemeToggleProps, {}> {

  public render(): React.ReactElement<IStylingMgtThemeToggleProps> {

    return (
      <section className={styles.stylingMgtThemeToggle}>
        <h3>{strings.Title}</h3>
        <ThemeToggle />
        <div>
          <Login />
        </div>
      </section>
    );
  }
}
