import * as React from 'react';
import styles from './ThemeAware.module.scss';
import type { IThemeAwareProps } from './IThemeAwareProps';
import { IReadonlyTheme } from '@microsoft/sp-component-base';

export default class ThemeAware extends React.Component<IThemeAwareProps, {}> {
  public render(): React.ReactElement<IThemeAwareProps> {
    const { semanticColors }: IReadonlyTheme = this.props.themeVariant!;

    return (
      <div className={styles.themeAware} style={{ backgroundColor: semanticColors?.bodyBackground }}>
        <span className={styles.title}>Welcome to SharePoint!</span>
        <p className={styles.subTitle}>This web part is theme aware.</p>
      </div>
    );
  }
}
