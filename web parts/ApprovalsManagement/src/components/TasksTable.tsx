import * as React from 'react';
import ItemsTable from './ItemsTable';
import {
  CheckmarkRegular,
  DismissRegular,
  TimerRegular
} from "@fluentui/react-icons";
import { ApprovalItem } from '../services/models/ApprovalItem';

interface ITasksTableProps {
  tasks: ApprovalItem[];
  editingEnabled?: boolean;
  disabled?: boolean;
}

export default class TasksTable extends React.Component<ITasksTableProps> {
  private _dateFormatter: Intl.DateTimeFormat;
  
  constructor(props: ITasksTableProps) {
    super(props);
    this._dateFormatter = new Intl.DateTimeFormat();
  }

  public render(): React.ReactElement<ITasksTableProps> {
    const { tasks, editingEnabled, disabled } = this.props;

    return (
      <ItemsTable
        items={tasks}
        columns={[{
          columnKey: 'state',
          label: 'State',
          formatValue: (value: any): JSX.Element => {
            switch (value) {
              case 'pending':
                return <div><TimerRegular /></div>;
              case 'completed':
                return <div><CheckmarkRegular /></div >;
              case 'canceled':
                return <div><DismissRegular /></div >;
            }

            return <div>{value}</div>;
          }
        }, {
          columnKey: 'displayName',
          label: 'Title'
        }, {
          columnKey: 'createdDateTime',
          label: 'Created',
          formatValue: (value: any): JSX.Element => {
            return <div>{this._getFormattedDate(value)}</div>;
          }
        }, {
          columnKey: 'completedDateTime',
          label: 'Completed',
          formatValue: (value: any): JSX.Element => {
            return <div>{this._getFormattedDate(value)}</div>;
          }
        }, {
          columnKey: 'result',
          label: 'Result'
        }]}
        editingEnabled={editingEnabled}
        disabled={disabled} />
    );
  }

  private _getFormattedDate(dateString: string): string {
    const date: Date | undefined = dateString ? new Date(dateString?.toString()) : undefined;

    if (!date) {
      return '';
    }

    return this._dateFormatter.format(date);
  }
}