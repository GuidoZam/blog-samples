import * as React from 'react';
import styles from './MgtThemeToggleSample.module.scss';
import * as strings from 'MgtThemeToggleSampleWebPartStrings';
import type { IMgtThemeToggleSampleProps } from './IMgtThemeToggleSampleProps';
//import { loadTheme } from '@fluentui/react';

// Imports for the MGT React controls
import { ThemeToggle, Person } from '@microsoft/mgt-react';

export default class MgtThemeToggleSample extends React.Component<IMgtThemeToggleSampleProps, {}> {
  public render(): React.ReactElement<IMgtThemeToggleSampleProps> {

    return (
      <section className={styles.mgtThemeToggleSample}>
        <ThemeToggle 
          darkModeActive={false}
          darkmodechanged={(e) => {
            console.log(e);
            alert(`${(e.detail === true ? 'Light' : 'Dark')} mode is now active!`)
          }} />
        <h2>{strings.Title}</h2>
        <div>
          <p>{this.props.description}</p>
          <Person personQuery='me' view={"threelines"} />
        </div>
      </section>
    );
  }
}
