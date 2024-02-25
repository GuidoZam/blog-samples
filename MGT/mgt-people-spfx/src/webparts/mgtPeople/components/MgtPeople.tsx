import * as React from 'react';
import styles from './MgtPeople.module.scss';
import * as strings from 'MgtPeopleWebPartStrings';
import type { IMgtPeopleProps } from './IMgtPeopleProps';
import { People } from '@microsoft/mgt-react';

export default class MgtPeople extends React.Component<IMgtPeopleProps, {}> {
  public render(): React.ReactElement<IMgtPeopleProps> {
    return (
      <section className={styles.mgtPeople}>
        <div className={styles.welcome}>
          <div>MGT People</div>
        </div>
        <div>
          <div>
            <h4 className={styles.sectionTitle}>
              <span>Minimal usage</span>
            </h4>
            <People />
          </div>
          <div>
            <h4 className={styles.sectionTitle}>
              <span>Show presence</span>
            </h4>
            <People showPresence={true} />
          </div>
          <div>
            <h4 className={styles.sectionTitle}>
              <span>Show max 6 people</span>
            </h4>
            <People showMax={this.props.maxPeople} />
          </div>
          <div>
            <h4 className={styles.sectionTitle}>
              <span>People of specific group</span>
            </h4>
            <People groupId={this.props.groupId} />
          </div>
          <div>
            <h4 className={styles.sectionTitle}>
              <span>Custom query</span>
            </h4>
            {this.props.queries.length > 0 &&
            <People peopleQueries={this.props.queries} />}
            {this.props.queries.length === 0 &&
            <div>{strings.SpecifyQueriesInPropertyPane}</div>}
          </div>
        </div>
      </section>
    );
  }
}
