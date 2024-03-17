import * as React from 'react';
import styles from './MgtPicker.module.scss';
import type { IMgtPickerProps } from './IMgtPickerProps';
import { Picker } from '@microsoft/mgt-react';
import { IMgtPickerState } from './IMgtPickerState';
import * as strings from 'MgtPickerWebPartStrings';

export default class MgtPicker extends React.Component<IMgtPickerProps, IMgtPickerState> {
  constructor(props: IMgtPickerProps) {
    super(props);
    
    this.state = {
      selectedListId: undefined,
      selectedTask: undefined
    };
  }

  public render(): React.ReactElement<IMgtPickerProps> {

    const {
      selectedListId,
      selectedTask
    } = this.state;

    return (
      <section className={styles.mgtPicker}>
        <div className={styles.welcome}>
          <h2>MGT Picker</h2>
        </div>
        <div>
          <h4>{strings.Users}</h4>
          <Picker 
            resource='users'
            scopes={['user.read']}
            placeholder={strings.SelectUser}
            keyName="displayName"
            selectionChanged={(e: CustomEvent<any>) => {
              console.log(e);
            }}
            >
          </Picker>
        </div>
        <div>
          <h4>{strings.Events}</h4>
          <Picker 
            resource='me/events'
            scopes={['calendars.read']}
            placeholder={strings.SelectEvent}
            keyName="subject"
            selectionChanged={(e: CustomEvent<any>) => {
              console.log(e);
            }}
            >
          </Picker>
        </div>
        <div>
          <h4>{strings.Tasks}</h4>
          <Picker 
            resource='me/todo/lists'
            scopes={['tasks.read']}
            placeholder={strings.SelectTaskList}
            keyName="displayName"
            selectionChanged={(e: CustomEvent<any>) => {
              console.log(e);
              this.setState({ selectedListId: e.detail.id });
            }}
            >
          </Picker>
          {selectedListId &&
          <Picker
            resource={`me/todo/lists/${selectedListId}/tasks`}
            scopes={['tasks.read']}
            placeholder={strings.SelectTask}
            keyName="title"
            selectionChanged={(e: CustomEvent<any>) => {
              console.log(e);
              this.setState({ selectedTask: e.detail });
            }}
          >
          </Picker>}
          {selectedTask && <div>
            <h5>{strings.SelectedTask}</h5>
            <div>
              <b>{strings.Status}</b>: {selectedTask.status}
            </div>
            <div>
              <b>{strings.Importance}</b>: {selectedTask.importance}
            </div>
          </div>}
        </div>
      </section>
    );
  }
}
