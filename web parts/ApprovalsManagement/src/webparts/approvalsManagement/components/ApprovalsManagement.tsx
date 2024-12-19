import * as React from 'react';
import styles from './ApprovalsManagement.module.scss';
import type { IApprovalsManagementProps } from './IApprovalsManagementProps';
import { PrimaryButton } from '@fluentui/react';
import { AppStatus, IApprovalsManagementState } from './IApprovalsManagementState';
import SkeletonTable from '../../../components/SkeletonTable';
import ItemsTable from '../../../components/ItemsTable';


export default class ApprovalsManagement extends React.Component<IApprovalsManagementProps, IApprovalsManagementState> {
  private _dateFormatter: Intl.DateTimeFormat;

  constructor(props: IApprovalsManagementProps) {
    super(props);

    this._dateFormatter = new Intl.DateTimeFormat();

    this.state = {
      status: AppStatus.Loading,
      tasks: []
    };
  }

  private async _loadTasks(): Promise<void> {
    const { approvalsService } = this.props;
    if (approvalsService && approvalsService.IsReady === true) {
      try {
        const result = await approvalsService.ListTasks();
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
console.log(tasks);
    return (
      <section className={styles.approvalsManagement}>
        <h2>Approvals Management</h2>
        <PrimaryButton
          text="List Approvals"
          onClick={() => { this._loadTasks().then().catch(e => this._setError(e.message)); }} />
        {isLoading && <SkeletonTable rows={5} />}
        {isLoaded && <ItemsTable
          items={tasks}
          columns={[{
            columnKey: 'displayName',
            label: 'Title',
            formatValue: (value: any): string => value?.toString() || '' 
          },{
            columnKey: 'createdDateTime',
            label: 'Created',
            formatValue: (value: any): string => {
              return this._getFormattedDate(value);
            }
          },{
            columnKey: 'completedDateTime',
            label: 'Completed',
            formatValue: (value: any): string => {
              return this._getFormattedDate(value);
            }
          }]}
          editingEnabled={true}
          disabled={false} />}
        {isError && <div>Error: {this.state.error}</div>}
      </section>
    );
  }

  private _setError(message: string): void {
    this.setState({
      status: AppStatus.Error,
      error: message
    });
  }

  private _getFormattedDate(dateString: string): string {
    const date: Date | undefined = dateString ? new Date(dateString?.toString()) : undefined;

    if (!date) {
      return '';
    }

    return this._dateFormatter.format(date); 
  }
}
