import * as React from 'react';
import styles from './MgtPeoplePicker.module.scss';
import * as strings from 'MgtPeoplePickerWebPartStrings';
import type { IMgtPeoplePickerProps } from './IMgtPeoplePickerProps';
import { PeoplePicker, PersonType } from '@microsoft/mgt-react';

export default class MgtPeoplePicker extends React.Component<IMgtPeoplePickerProps, {}> {
  public render(): React.ReactElement<IMgtPeoplePickerProps> {
    return (
      <section className={styles.mgtPeoplePicker}>
        <div className={styles.welcome}>
          <div>{strings.Description}</div>
        </div>
        <div>
          <div>
            <h4 className={styles.sectionTitle}>
              <span>Minimal usage</span>
            </h4>
            <PeoplePicker />
          </div>
          <div>
            <h4 className={styles.sectionTitle}>
              <span>Show max 3</span>
            </h4>
            <PeoplePicker showMax={3} />
          </div>
          <div>
            <h4 className={styles.sectionTitle}>
              <span>Show only groups</span>
            </h4>
            <PeoplePicker type={PersonType.group} />
          </div>
          <div>
            <h4 className={styles.sectionTitle}>
              <span>Enable only single selection</span>
            </h4>
            <PeoplePicker selectionMode="single" />
          </div>
          <div>
            <h4 className={styles.sectionTitle}>
              <span>Disable images</span>
            </h4>
            <PeoplePicker disableImages={true} />
          </div>
          <div>
            <h4 className={styles.sectionTitle}>
              <span>Default selected users</span>
            </h4>
            <PeoplePicker selectedPeople={[{
              displayName: "Nestor Wilke"
            },
            {
              displayName: "Sample User"
            }]} />
          </div>
        </div>
      </section>
    );
  }
}
