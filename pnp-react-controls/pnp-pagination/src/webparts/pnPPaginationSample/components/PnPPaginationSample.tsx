import * as React from 'react';
import styles from './PnPPaginationSample.module.scss';
import * as strings from 'PnPPaginationSampleWebPartStrings';
import type { IPnPPaginationSampleProps } from './IPnPPaginationSampleProps';
import { ISampleItem } from "./ISampleItem";
import { Pagination } from "@pnp/spfx-controls-react/lib/pagination";
import { IPnPPaginationSampleState } from './IPnPPaginationSampleState';

export default class PnPPaginationSample extends React.Component<IPnPPaginationSampleProps, IPnPPaginationSampleState> {
  constructor(props: IPnPPaginationSampleProps) {
    super(props);
    this.state = {
      currentPage: 1,
      items: this._getItems()
    };
  }

  public render(): React.ReactElement<IPnPPaginationSampleProps> {

    return (
      <section className={styles.pnPPaginationSample}>
        <div>
          <h3>{strings.Title}</h3>
          {this._renderItems()}
        </div>
        <div>
          <h4 className={styles.sectionTitle}>
            <span>{strings.MinimalConfiguration}</span>
          </h4>
          <Pagination
            currentPage={this.state.currentPage}
            totalPages={this._getPageCount()}
            onChange={(page) => this._getPage(page)} />
        </div>
        <div>
          <h4 className={styles.sectionTitle}>
            <span>{strings.Limiter}</span>
          </h4>
          <Pagination
            currentPage={this.state.currentPage}
            totalPages={this._getPageCount()}
            onChange={(page) => this._getPage(page)}
            limiter={1} />
        </div>
        <div>
          <h4 className={styles.sectionTitle}>
            <span>{strings.HidePageJump}</span>
          </h4>
          <Pagination
            currentPage={this.state.currentPage}
            totalPages={this._getPageCount()}
            onChange={(page) => this._getPage(page)}
            hideFirstPageJump={true}
            hideLastPageJump={true} />
        </div>
        <div>
          <h4 className={styles.sectionTitle}>
            <span>{strings.LimiterIcon}</span>
          </h4>
          <Pagination
            currentPage={this.state.currentPage}
            totalPages={this._getPageCount()}
            onChange={(page) => this._getPage(page)}
            limiterIcon={"CirclePlus"} />
        </div>
      </section>
    );
  }
  
  private _getPage(page: number): void {
    // Update the current page
    this.setState({ currentPage: page });
  }

  private _getPageCount(): number {
    const { items } = this.state;
    const { pageSize } = this.props;

    // Calculate the total number of pages based on the number of items and the page size
    return Math.ceil(items.length / pageSize);
  }

  private _renderItems(): JSX.Element {
    const { pageSize } = this.props;
    const { currentPage } = this.state;
    // Get the start index and the end index of the items to be displayed
    const startIndex = (currentPage - 1) * pageSize;
    const itemsCount = currentPage * pageSize;
    // Get the items to be displayed
    const pagedItems = this.state.items.slice(startIndex, itemsCount);

    return (
      <ul>
        {pagedItems.map((item: ISampleItem) => (
          <li key={item.id}>{item.name}</li>
        ))}
      </ul>
    );
  }

  // Method to generate sample data
  private _getItems(): ISampleItem[] {
    const items: ISampleItem[] = [];
    for (let i = 1; i <= 100; i++) {
      items.push({
        id: i,
        name: `Item ${i}`
      });
    }
    return items;
  }
}
