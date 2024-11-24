import * as React from 'react';
import styles from '../QuickView.module.scss';
import * as strings from 'ReactQuickViewAdaptiveCardExtensionStrings';

interface ICustomComponentProps {
  message: string;
}

export default class CustomComponent extends React.Component<ICustomComponentProps> {
  public render(): React.ReactElement<ICustomComponentProps> {
    return (
      <div className={styles.container}>
        <h2>{strings.Title}</h2>
        <p className={styles.message}>{this.props.message}</p>
      </div>
    );
  }
}
