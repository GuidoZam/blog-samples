import * as React from 'react';
import styles from './ListViewContextualMenu.module.scss';
import type { IListViewContextualMenuProps } from './IListViewContextualMenuProps';
import type { IListViewContextualMenuState, IListItem } from './IListViewContextualMenuState';
import { ListView, IViewField, SelectionMode } from '@pnp/spfx-controls-react/lib/ListView';
import { ContextualMenu } from './ContextualMenu';
import * as strings from 'ListViewContextualMenuWebPartStrings';

export default class ListViewContextualMenuComponent extends React.Component<IListViewContextualMenuProps, IListViewContextualMenuState> {
  
  constructor(props: IListViewContextualMenuProps) {
    super(props);
    
    // Sample data
    this.state = {
      items: [
        { ID: 1, Title: "Project Proposal", Department: "Sales", Status: "In Progress", Priority: "High" },
        { ID: 2, Title: "Budget Review", Department: "Finance", Status: "Pending", Priority: "Medium" },
        { ID: 3, Title: "Team Meeting Notes", Department: "HR", Status: "Completed", Priority: "Low" }
      ]
    };
  }

  private _onActionClicked = (action: string, item: IListItem): void => {
    console.log(`Action "${action}" triggered for item:`, item);
  }

  private _getViewFields = (): IViewField[] => {
    return [
      {
        name: 'Title',
        displayName: strings.ColumnTitle,
        minWidth: 150,
        maxWidth: 250,
        isResizable: true,
        sorting: true
      },
      {
        name: 'Department',
        displayName: strings.ColumnDepartment,
        minWidth: 100,
        maxWidth: 150,
        isResizable: true,
        sorting: true
      },
      {
        name: 'Status',
        displayName: strings.ColumnStatus,
        minWidth: 100,
        maxWidth: 120,
        isResizable: true,
        sorting: true,
        render: (item: IListItem) => {
          const statusClass = item.Status === 'Completed' ? styles.statusCompleted : 
                             item.Status === 'In Progress' ? styles.statusInProgress : 
                             styles.statusPending;
          return <span className={statusClass}>{item.Status}</span>;
        }
      },
      {
        name: 'Priority',
        displayName: strings.ColumnPriority,
        minWidth: 80,
        maxWidth: 100,
        isResizable: true,
        sorting: true,
        render: (item: IListItem) => {
          const priorityClass = item.Priority === 'High' ? styles.priorityHigh :
                               item.Priority === 'Medium' ? styles.priorityMedium :
                               styles.priorityLow;
          return <span className={priorityClass}>{item.Priority}</span>;
        }
      },
      {
        name: '',
        displayName: strings.ColumnActions,
        minWidth: 50,
        maxWidth: 50,
        isResizable: false,
        render: (item: IListItem) => {
          const element: React.ReactElement = React.createElement(
            ContextualMenu,
            {
              item: item,
              onAction: this._onActionClicked
            }
          );
          return element;
        }
      }
    ];
  }

  public render(): React.ReactElement<IListViewContextualMenuProps> {
    const viewFields = this._getViewFields();

    return (
      <section className={`${styles.listViewContextualMenu}`}>
        <div className={styles.container}>
          <h1 className={styles.title}>{strings.MainTitle}</h1>

          <div className={styles.section}>
            <ListView
              items={this.state.items}
              viewFields={viewFields}
              compact={false}
              selectionMode={SelectionMode.none}
              showFilter={false}
              stickyHeader={false}
            />
          </div>
        </div>
      </section>
    );
  }
}
