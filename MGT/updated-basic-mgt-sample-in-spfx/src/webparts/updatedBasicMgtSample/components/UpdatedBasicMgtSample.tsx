import * as React from 'react';
import styles from './UpdatedBasicMgtSample.module.scss';
import * as strings from 'UpdatedBasicMgtSampleWebPartStrings';
import type { IUpdatedBasicMgtSampleProps } from './IUpdatedBasicMgtSampleProps';

// Imports for the MGT React controls
import { Person } from '@microsoft/mgt-react';

export default class UpdatedBasicMgtSample extends React.Component<IUpdatedBasicMgtSampleProps, {}> {
  public render(): React.ReactElement<IUpdatedBasicMgtSampleProps> {
    // Use the Person MGT react control to display the current user
    return (
      <section className={styles.updatedBasicMgtSample}>
        <h2>{strings.Title}</h2>
        <div>
          <p>{this.props.description}</p>
        </div>
        <Person personQuery="me" />
        <Person personQuery="me" view={"oneline"} />
        <Person personQuery="me" view={"twolines"} />
        <Person personQuery="me" view={"threelines"} />
      </section>
    );
  }
}
