import * as React from 'react';
import styles from './PnPListView.module.scss';
import type { IPnPListViewProps } from './IPnPListViewProps';
import { GroupOrder, IGrouping, IViewField, ListView, SelectionMode } from "@pnp/spfx-controls-react";
import * as strings from 'PnPListViewWebPartStrings';
import { Guid } from '@microsoft/sp-core-library';
import { IPnPListViewState } from './IPnPListViewState';
import SampleItem from '../../../models/sampleItem';


export default class PnPListView extends React.Component<IPnPListViewProps, IPnPListViewState> {

  constructor(props: IPnPListViewProps) {
    super(props);

    this.state = {
      droppedItems: []
    };
  }

  public render(): React.ReactElement<IPnPListViewProps> {
    const items = this._getItems();
    const droppedItems = this._getDroppedItems();

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
              viewFields={this._getViewFields()}
            />
          </div>
          <div>
            <h4 className={styles.sectionTitle}>
              <span>{strings.DefaultFilter}</span>
            </h4>
            <ListView
              items={items}
              defaultFilter='joan'
              viewFields={this._getViewFields()}
              showFilter={true}
            />
          </div>
          <div>
            <h4 className={styles.sectionTitle}>
              <span>{strings.DragDropFiles}</span>
            </h4>
            <ListView
              items={droppedItems}
              dragDropFiles={true}
              onDrop={this._getDropFiles}
            />
          </div>
          <div>
            <h4 className={styles.sectionTitle}>
              <span>{strings.StickyHeader}</span>
            </h4>
            <ListView
              items={this._getMoreItems()}
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
              viewFields={this._getAdditionalViewFields()}
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
        </div>
      </section>
    );
  }

  private _getSelection(items: any[]): void {
    console.log('Selected items:', items);
  }
  
  private _getDropFiles = (files: any[]): void => {
    const droppedItems = [...this.state.droppedItems];

    for (let i = 0; i < files.length; i++) {
      droppedItems.push({ title: files[i].name });
    }

    this.setState({
      droppedItems: droppedItems
    });
  }

  private _sortItems = (items: SampleItem[], columnName: string, descending: boolean): any[] => {
    console.log("Sorting items by column:", columnName, "Descending:", descending);
    // Create a shallow copy before sorting to avoid mutating the original array
    return items.slice().sort((a, b) => {
      if (a.highPriority && !b.highPriority) {
        return -1;
      }
      if (!a.highPriority && b.highPriority) {
        return 1;
      }
      const aValue = (a as any)[columnName];
      const bValue = (b as any)[columnName];
      if (aValue < bValue) {
        return descending ? 1 : -1;
      }
      if (aValue > bValue) {
        return descending ? -1 : 1;
      }
      return 0;
    });
  }

  // Generates a list of sample items for demonstration purposes
  private _getItems(): SampleItem[] {
    const createdByOptions = ["John Doe", "Jim Doe", "Jane Doe", "Joan Doe"];
    const itemCount = 5;
    const items: SampleItem[] = [];
    for (let i = 0; i < itemCount; i++) {
      const createdBy = createdByOptions[Math.floor(Math.random() * createdByOptions.length)];
      const version = Math.floor(Math.random() * 6) + 1; // version between 1 and 6
      const highPriority = Math.random() < 0.5; // 50% chance
      // random Date
      const createdDate = new Date(Date.now() - Math.floor(Math.random() * 10000000000)); // up to 115 days ago
      items.push({
        key: Guid.newGuid().toString(),
        title: `Document ${i + 1}`,
        createdBy,
        version,
        created: createdDate.toLocaleDateString(),
        highPriority
      });
    }
    return items;
  }

  private _getMoreItems(): SampleItem[] {
    const items: SampleItem[] = [];
    for (let i = 0; i < 3; i++) {
      items.push(...this._getItems());
    }

    return items;
  }

  private _getDroppedItems(): any[] {
    const items = this.state.droppedItems;

    if (items.length === 0) {
      return [
        {
          title: strings.NoItems,
        }
      ];
    }
    
    return items;
  }

  private _getViewFields(): IViewField[] {
    return [
      {
        name: 'title',
        displayName: strings.Fields.Title,
        maxWidth: 150,
        minWidth: 100,
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
      {
        name: 'created',
        displayName: strings.Fields.CreatedDate,
        maxWidth: 100,
        minWidth: 100,
        sorting: true,
        render: (item: any) => {
          if (!item || !item.created) {
            return <span>{strings.Fields.NoDate}</span>;
          }

          return <span>{item.created}</span>;
        }
      }
    ];
  }

  private _getAdditionalViewFields(): IViewField[] {
    const fields = this._getViewFields();
    // Insert highPriority as the first field
    fields.unshift({
      name: '',
      displayName: "",
      maxWidth: 50,
      minWidth: 50,
      sorting: true,
      render: (item: any) => {
        return <span className={styles.highPriorityText}>{(item.highPriority) ? "!" : ""}</span>
      }
    });
    return fields;
  }
}
