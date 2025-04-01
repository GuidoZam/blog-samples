import * as React from 'react';
import styles from './CustomFont.module.scss';
import type { ICustomFontProps } from './ICustomFontProps';
import * as strings from 'CustomFontWebPartStrings';

export default class CustomFont extends React.Component<ICustomFontProps> {
  public render(): React.ReactElement<ICustomFontProps> {

    return (
      <section className={styles.customFont}>
        <h2>{strings.Title}</h2>
        <h3 className={styles.content}>
          {strings.Content}
        </h3>
      </section>
    );
  }
}
