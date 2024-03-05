import * as React from 'react';
import styles from './MgtPersonCard.module.scss';
import * as strings from 'MgtPersonCardWebPartStrings';
import type { IMgtPersonCardProps } from './IMgtPersonCardProps';
import { Person, MgtPersonCardConfig } from '@microsoft/mgt-react';

export default class MgtPersonCard extends React.Component<IMgtPersonCardProps, {}> {

  constructor(props: IMgtPersonCardProps) {
    super(props);

    MgtPersonCardConfig.useContactApis = props.useContactApis;

    MgtPersonCardConfig.sections.files = props.sectionFiles;
    MgtPersonCardConfig.sections.mailMessages = props.sectionMailMessages;
    MgtPersonCardConfig.sections.organization = props.sectionOrganization === true ? { showWorksWith: true } : undefined;
    MgtPersonCardConfig.sections.profile = props.sectionProfile;
  }

  public render(): React.ReactElement<IMgtPersonCardProps> {

    return (
      <section className={styles.mgtPersonCard}>
        <div className={styles.welcome}>
          <div>{strings.Title}</div>
        </div>
        <div>
          <div>
            <h4 className={styles.sectionTitle}>
              <span>Minimal usage</span>
            </h4>
            <Person personQuery="me" />
          </div>
        </div>
      </section>
    );
  }
}
