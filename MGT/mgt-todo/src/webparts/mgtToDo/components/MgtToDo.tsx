import * as React from 'react';
import styles from './MgtToDo.module.scss';
import type { IMgtToDoProps } from './IMgtToDoProps';
import { Todo } from '@microsoft/mgt-react';
import * as strings from 'MgtToDoWebPartStrings';

export default class MgtToDo extends React.Component<IMgtToDoProps, {}> {
  public render(): React.ReactElement<IMgtToDoProps> {

    return (
      <section className={styles.mgtToDo}>
        <div className={styles.welcome}>
          {strings.Title}
        </div>
        <div>
          <h4 className={styles.sectionTitle}>
            <span>{strings.MinimalInstanceTitle}</span>
          </h4>
          <Todo />
        </div>
      </section>
    );
  }
}
