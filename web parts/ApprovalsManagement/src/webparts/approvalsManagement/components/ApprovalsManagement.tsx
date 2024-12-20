import * as React from 'react';
import styles from './ApprovalsManagement.module.scss';
import type { IApprovalsManagementProps } from './IApprovalsManagementProps';
import { Toggle } from '@fluentui/react';
import { AppStatus, IApprovalsManagementState } from './IApprovalsManagementState';
import SkeletonTable from '../../../components/SkeletonTable';
import TasksTable from '../../../components/TasksTable';

export default class ApprovalsManagement extends React.Component<IApprovalsManagementProps, IApprovalsManagementState> {

  constructor(props: IApprovalsManagementProps) {
    super(props);

    this.state = {
      status: AppStatus.Loading,
      tasks: []
    };
  }

  public componentDidMount(): void {
    // Load the tasks when the service is ready
    setTimeout(() => {
      this._loadTasks().then().catch(e => this._setError(e.message));
    }, 300);
  }

  public componentDidUpdate(prevProps: Readonly<IApprovalsManagementProps>, prevState: Readonly<IApprovalsManagementState>, snapshot?: any): void {
    if (this.props !== prevProps || this.state.hideCompletedTasks !== prevState.hideCompletedTasks) {
      this._loadTasks().then().catch(e => this._setError(e.message));
    }
  }
  
  /**
   * Loads tasks from the approvals service.
   *
   * This method checks if the approvals service is ready and then attempts to load tasks,
   * updating the component's state accordingly. If the service is not ready or an error
   * occurs during the loading process, it sets the error state.
   *
   * @returns {Promise<void>} - This method does not return a value, but updates the component's state.
   */
  private async _loadTasks(): Promise<void> {
    const { approvalsService } = this.props;
    const { hideCompletedTasks } = this.state;

    if (approvalsService && approvalsService.IsReady === true) {
      this.setState({ status: AppStatus.Loading });
      
      try {
        const result = await approvalsService.ListTasks(hideCompletedTasks);
        this.setState({tasks: result[0], nextLink: result[1], status: AppStatus.Loaded});
      } catch (error) {
        this._setError(error.message);
      }
    }
  }

  public render(): React.ReactElement<IApprovalsManagementProps> {
    const { status, tasks } = this.state;
    const isLoading = status === AppStatus.Loading;
    const isLoaded = status === AppStatus.Loaded;
    const isError = status === AppStatus.Error;

    return (
      <section className={styles.approvalsManagement}>
        <h2>Approvals Management</h2>

        {isLoading && <SkeletonTable rows={5} />}

        {isLoaded && <div className={styles.tableSettings}>
          <Toggle
            label="Hide completed"
            defaultChecked={false}
            onChange={(_, checked) => this.setState({ hideCompletedTasks: checked })}/>
        </div>}

        {isLoaded && <TasksTable 
          tasks={tasks}
          editingEnabled={true}
          disabled={false}
        />}

        {isError && <div>Error: {this.state.error}</div>}

      </section>
    );
  }

  /**
   * Sets the error state for the application.
   *
   * This method updates the component's state to indicate an error has occurred.
   * It sets the status to `AppStatus.Error` and stores the provided error message.
   *
   * @param {string} message - The error message to be displayed or logged.
   * @returns {void} - This method does not return a value.
   */
  private _setError(message: string): void {
      this.setState({
        status: AppStatus.Error,
        error: message
      });
  }
}
