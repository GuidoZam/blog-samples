import * as React from 'react';
import styles from './BasicMgtSample.module.scss';
import type { IBasicMgtSampleProps } from './IBasicMgtSampleProps';
import { Person } from '@microsoft/mgt-react/dist/es6/spfx';
import { ViewType } from '@microsoft/mgt-spfx';

export default class BasicMgtSample extends React.Component<IBasicMgtSampleProps, {}> {
  public render(): React.ReactElement<IBasicMgtSampleProps> {

    // Use the Person MGT react control to display the current user
    return (
      <section className={styles.basicMgtSample}>
        <h2>Basic MGT Sample</h2>
        <Person personQuery="me" view={ViewType.image} />
        <Person personQuery="me" view={ViewType.oneline} />
        <Person personQuery="me" view={ViewType.twolines} />
        <Person personQuery="me" view={ViewType.threelines} />
      </section>
    );
  }
}
