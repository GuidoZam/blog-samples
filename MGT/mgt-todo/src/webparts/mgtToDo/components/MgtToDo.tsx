import * as React from 'react';
import styles from './MgtToDo.module.scss';
import type { IMgtToDoProps } from './IMgtToDoProps';
import { Todo } from '@microsoft/mgt-react';
import * as strings from 'MgtToDoWebPartStrings';
import { TodoFilter } from '@microsoft/mgt-spfx';

export default class MgtToDo extends React.Component<IMgtToDoProps, {}> {
  public render(): React.ReactElement<IMgtToDoProps> {
    return (
      <section className={styles.mgtToDo}>
        <div>
          <h4 className={styles.sectionTitle}>
            <span>{strings.MinimalInstanceTitle}</span>
          </h4>
          <Todo />
        </div>
        <div>
          <h4 className={styles.sectionTitle}>
            <span>{strings.ReadOnlyTitle}</span>
          </h4>
          <Todo readOnly={true}/>
        </div>
        <div>
          <h4 className={styles.sectionTitle}>
            <span>{strings.InitialFolderTitle}</span>
          </h4>
          <Todo initialId={this.props.initialFolderId}/>
        </div>
        <div>
          <h4 className={styles.sectionTitle}>
            <span>{strings.TargetFolderTitle}</span>
          </h4>
          <Todo targetId={this.props.targetFolderId} />
        </div>
        <div>
          <h4 className={styles.sectionTitle}>
            <span>{strings.HighImportanceTaskFilterTitle}</span>
          </h4>
          <Todo taskFilter={this.highImportanceFilter} />
        </div>
        <div>
          <h4 className={styles.sectionTitle}>
            <span>{strings.NotCompletedTaskFilterTitle}</span>
          </h4>
          <Todo taskFilter={this.showNotCompletedFilter} />
        </div>
      </section>
    );
  }

  private highImportanceFilter: TodoFilter = (task) => {
    return (task.importance !== undefined && task.importance.toLowerCase() === 'high');
  };

  private showNotCompletedFilter: TodoFilter = (task) => {
    return (!task.completedDateTime);
  }
}
