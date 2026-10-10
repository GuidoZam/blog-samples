import * as React from 'react';
import styles from './ManifestPropertiesExampleManifestPropertiesExample.module.scss';
import type { IManifestPropertiesExampleManifestPropertiesExampleProps } from './IManifestPropertiesExampleManifestPropertiesExampleProps';
import { escape } from '@microsoft/sp-lodash-subset';
import welcomeDark from '../assets/welcome-dark.png';
import welcomeLight from '../assets/welcome-light.png';

export default class ManifestPropertiesExampleManifestPropertiesExample extends React.Component<IManifestPropertiesExampleManifestPropertiesExampleProps> {
  public render(): React.ReactElement<IManifestPropertiesExampleManifestPropertiesExampleProps> {
    const {
      title,
      subtitle,
      description,
      showWelcome,
      maxItems,
      backgroundColor,
      isDarkTheme,
      environmentMessage,
      userDisplayName
    } = this.props;

    return (
      <section className={`${styles.manifestPropertiesExampleManifestPropertiesExample}`} style={{ backgroundColor }}>
        {showWelcome && (
          <div className={styles.welcome}>
            <img alt="" src={isDarkTheme ? welcomeDark : welcomeLight} className={styles.welcomeImage} />
            <h2>Well done, {escape(userDisplayName)}!</h2>
            <div>{environmentMessage}</div>
          </div>
        )}
        <div className={styles.content}>
          <h1>{escape(title)}</h1>
          <h2>{escape(subtitle)}</h2>
          <p><strong>Description:</strong> {escape(description)}</p>
          
          <div className={styles.propertiesSection}>
            <h3>Properties Set in Manifest:</h3>
            <ul className={styles.properties}>
              <li><strong>Title:</strong> {escape(title)}</li>
              <li><strong>Subtitle:</strong> {escape(subtitle)}</li>
              <li><strong>Description:</strong> {escape(description)}</li>
              <li><strong>Show Welcome:</strong> {showWelcome ? 'Yes' : 'No'}</li>
              <li><strong>Max Items:</strong> {maxItems}</li>
              <li><strong>Background Color:</strong> {escape(backgroundColor)}</li>
            </ul>
          </div>
        </div>
      </section>
    );
  }
}
