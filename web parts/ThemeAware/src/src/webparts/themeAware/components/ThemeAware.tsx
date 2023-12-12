import * as React from 'react';
import styles from './ThemeAware.module.scss';
import type { IThemeAwareProps } from './IThemeAwareProps';
import { escape } from '@microsoft/sp-lodash-subset';

export default class ThemeAware extends React.Component<IThemeAwareProps, {}> {
  public render(): React.ReactElement<IThemeAwareProps> {
    const {
      isDarkTheme,
      hasTeamsContext,
      userDisplayName
    } = this.props;

    return (
      <section className={`${styles.themeAware} ${hasTeamsContext ? styles.teams : ''}`}>
        <div className={styles.welcome}>
          <img alt="" src={isDarkTheme ? require('../assets/welcome-dark.png') : require('../assets/welcome-light.png')} className={styles.welcomeImage} />
          <h2>Well done, {escape(userDisplayName)}!</h2>
        </div>
      </section>
    );
  }
}
