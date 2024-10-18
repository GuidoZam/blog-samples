import * as React from 'react';
import styles from './PnPListView.module.scss';
import type { IPnPListViewProps } from './IPnPListViewProps';
import { GroupOrder, IGrouping, IViewField, ListView, SelectionMode } from "@pnp/spfx-controls-react/lib/ListView";
import * as strings from 'PnPListViewWebPartStrings';
import { Guid } from '@microsoft/sp-core-library';


export default class PnPListView extends React.Component<IPnPListViewProps> {

  public render(): React.ReactElement<IPnPListViewProps> {
    const items = this._getItems();

    const groupByFields: IGrouping[] = [
      {
        name: "createdBy",
        order: GroupOrder.ascending
      }
    ];

    return (
      <section className={styles.PnPListView}>
        <div>
          <h3>{strings.Title}</h3>
          <div>
            <h4 className={styles.sectionTitle}>
              <span>{strings.MinimalConfiguration}</span>
            </h4>
            <ListView items={items}/>
          </div>
          <div>
            <h4 className={styles.sectionTitle}>
              <span>{strings.ViewFields}</span>
            </h4>
            <ListView 
              items={items} 
              viewFields={this._getViewFields()}
              />
          </div>
          <div>
            <h4 className={styles.sectionTitle}>
              <span>{strings.CompactListView}</span>
            </h4>
            <ListView
              items={items}
              compact={true}
            />
          </div>
          <div>
            <h4 className={styles.sectionTitle}>
              <span>{strings.ShowFilter}</span>
            </h4>
            <ListView
              items={items}
              showFilter={true}
              filterPlaceHolder={strings.FilterPlaceHolder}
            />
          </div>
          <div>
            <h4 className={styles.sectionTitle}>
              <span>{strings.DefaultFilter}</span>
            </h4>
            <ListView
              items={items}
              defaultFilter='Jane'
            />
          </div>
          <div>
            <h4 className={styles.sectionTitle}>
              <span>{strings.DragDropFiles}</span>
            </h4>
            <ListView
              items={items}
              dragDropFiles={true}
              onDrop={this._getDropFiles}
            />
          </div>
          <div>
            <h4 className={styles.sectionTitle}>
              <span>{strings.StickyHeader}</span>
            </h4>
            <ListView
              items={items}
              stickyHeader={true}
            />
          </div>
          <div>
            <h4 className={styles.sectionTitle}>
              <span>{strings.HandleSelection}</span>
            </h4>
            <ListView
              items={items}
              selection={this._getSelection}
              selectionMode={SelectionMode.single}
            />
          </div>
          <div>
            <h4 className={styles.sectionTitle}>
              <span>{strings.MultipleSelectionMode}</span>
            </h4>
            <ListView
              items={items}
              selection={this._getSelection}
              selectionMode={SelectionMode.multiple}
            />
          </div>
          <div>
            <h4 className={styles.sectionTitle}>
              <span>{strings.GroupByFields}</span>
            </h4>
            <ListView
              items={items}
              groupByFields={groupByFields}
            />
          </div>
          <div>
            <h4 className={styles.sectionTitle}>
              <span>{strings.CustomSorting}</span>
            </h4>
            <ListView
              items={items}
              viewFields={this._getViewFields()}
              sortItems={this._sortItems}
            />
          </div>
          <div>
            <h4 className={styles.sectionTitle}>
              <span>{strings.CustomRenderRow}</span>
            </h4>
            <ListView
              items={items}
              viewFields={[]}
              onRenderRow={(props) => {
                console.log(props);
                return (
                  <div className={`${styles.tableRow} ${props.item.highPriority ? styles.highPriority : ''}`}>
                    {/* If the item has highPriority set to true show an exclamation mark, otherwise add an empty div */}
                    <div className={styles.smallTableCell}>{props.item.highPriority ? '!' : ''}</div>
                    <div className={styles.tableCell}>{props.item.createdBy}</div>
                    <div className={styles.tableCell}>{props.item.title}</div>
                    <div className={styles.tableCell}>{props.item.version}</div>
                  </div>
                );
              }}
            />
          </div>
          {/* <ListView
            items={items}
            viewFields={viewFields}
            iconFieldName="FileRef"
            compact={true}
            selectionMode={SelectionMode.multiple}
            selection={this._getSelection}
            showFilter={true}
            defaultFilter="John"
            filterPlaceHolder="Search..."
            groupByFields={groupByFields}
            dragDropFiles={true}
            onDrop={this._getDropFiles}
            stickyHeader={true}
            className={styles.listWrapper}
            listClassName={styles.list} /> */}
        </div>
      </section>
    );
  }

  private _getSelection(items: any[]) {
    console.log('Selected items:', items);
  }
  
  private _getDropFiles = (files: any[]) => {
    for (var i = 0; i < files.length; i++) {
      console.log(files[i].name);
    }
  }

  private _sortItems = (items: any[], columnName: string, descending: boolean): any[] => {
    return items.sort((a, b) => {
      if (a.highPriority && !b.highPriority) {
        return -1;
      }
      if (!a.highPriority && b.highPriority) {
        return 1;
      }
      if (a[columnName] < b[columnName]) {
        return descending ? 1 : -1;
      }
      if (a[columnName] > b[columnName]) {
        return descending ? -1 : 1;
      }
      return 0;
    });
  }

  private _getItems(): any[] {
    return [
      {
        key: Guid.newGuid().toString(),
        title: "Document 1",
        createdBy: "John Doe",
        version: 3,
        //createdDate: new Date(),
        highPriority: false
      },
      {
        key: Guid.newGuid().toString(),
        title: "Document 2",
        createdBy: "Jim Doe",
        version: 1,
        //createdDate: new Date(),
        highPriority: true
      },
      {
        key: Guid.newGuid().toString(),
        title: "Document 3",
        createdBy: "Jane Doe",
        version: 6,
        //createdDate: new Date(),
        highPriority: true
      },
      {
        key: Guid.newGuid().toString(),
        title: "Document 4",
        createdBy: "Jane Doe",
        version:3,
        //createdDate: new Date(),
        highPriority: true
      },
      {
        key: Guid.newGuid().toString(),
        title: "Document 5",
        createdBy: "Joan Doe",
        version: 2,
        //createdDate: new Date(),
        highPriority: false
      },
      {
        key: Guid.newGuid().toString(),
        title: "Document 6",
        createdBy: "Jim Doe",
        version: 1,
        //createdDate: new Date(),
        highPriority: false
      },
      {
        key: Guid.newGuid().toString(),
        title: "Document 7",
        createdBy: "Jane Doe",
        version: 4,
        //createdDate: new Date(),
        highPriority: false
      },
      {
        key: Guid.newGuid().toString(),
        title: "Document 8",
        createdBy: "Joan Doe",
        version: 3,
        //createdDate: new Date(),
        highPriority: true
      }
    ];
  }

  private _getViewFields(): IViewField[] {
    return [
      {
        name: 'title',
        displayName: strings.Fields.Title,
        maxWidth: 80,
        minWidth: 50,
        sorting: true
      },
      {
        name: 'createdBy',
        displayName: strings.Fields.CreatedBy,
        maxWidth: 100,
        minWidth: 100,
        sorting: true
      },
      {
        name: 'version',
        displayName: strings.Fields.Version,
        maxWidth: 100,
        minWidth: 80,
        sorting: true
      },
      // {
      //   name: 'createdDate',
      //   displayName: 'Created Date',
      //   maxWidth: 100,
      //   minWidth: 100,
      //   sorting: true,
      //   render: (item: any) => {
      //     return <span>{item.createdDate.toLocaleDateString()}</span>;
      //   }
      // }
    ];
  }
}
