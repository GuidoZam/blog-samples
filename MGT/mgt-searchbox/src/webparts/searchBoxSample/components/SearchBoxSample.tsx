import * as React from 'react';
import styles from './SearchBoxSample.module.scss';
import type { ISearchBoxSampleProps } from './ISearchBoxSampleProps';
import { SearchBox } from '@microsoft/mgt-react';
import * as strings from 'SearchBoxSampleWebPartStrings';
import { ISearchBoxSampleState } from './ISearchBoxSampleState';

export default class SearchBoxSample extends React.Component<ISearchBoxSampleProps, ISearchBoxSampleState> {
  constructor(props: ISearchBoxSampleProps) {
    super(props);
    this.state = {};
  }

  public render(): React.ReactElement<ISearchBoxSampleProps> {
    return (
      <section className={styles.searchBoxSample}>
        <div className={styles.welcome}>
          <h2>{strings.Title}</h2>
        </div>
        <div className={styles.section}>
          <div>
            <h4 className={styles.sectionTitle}>
              <span>{strings.BasicUsageLabel}</span>
            </h4>
            {/* Basic usage of SearchBox */}
            <SearchBox></SearchBox>
          </div>
        </div>
        <div className={styles.section}>
          <div>
            <h4 className={styles.sectionTitle}>
              <span>{strings.CustomTermLabel}</span>
            </h4>
            {/* SearchBox with custom term */}
            <SearchBox searchTerm={"custom term"}></SearchBox>
          </div>
        </div>
        <div className={styles.section}>
          <div>
            <h4 className={styles.sectionTitle}>
              <span>{strings.CustomPlaceholderLabel}</span>
            </h4>
            {/* SearchBox custom placeholder */}
            <SearchBox
              placeholder={strings.Placeholder}>
            </SearchBox>
          </div>
        </div>
        <div className={styles.section}>
          <div>
            <h4 className={styles.sectionTitle}>
              <span>{strings.CustomDebounceDelayLabel}</span>
            </h4>
            {/* SearchBox custom debounce delay */}
            <SearchBox
              debounceDelay={2000}
              searchTermChanged={(e) => 
                this.setState({ changedDebounceSearchTerm: e?.detail })}>
            </SearchBox>
            {this.state.changedDebounceSearchTerm && this.state.changedDebounceSearchTerm.length > 0 &&
            <div>
              {strings.ChangedDebounceSearchTermLabel}: {this.state.changedDebounceSearchTerm}
            </div>}
          </div>
        </div>
        <div className={styles.section}>
          <div>
            <h4 className={styles.sectionTitle}>
              <span>{strings.SearchTermChangedEventLabel}</span>
            </h4>
            {/* Search term changed event */}
            <SearchBox
              searchTermChanged={(e) => 
                this.setState({ changedSearchTerm: e?.detail})}>
            </SearchBox>
            {this.state.changedSearchTerm && this.state.changedSearchTerm.length > 0 &&
            <div>
              {strings.ChangedSearchTermLabel}: {this.state.changedSearchTerm}
            </div>}
          </div>
        </div>
      </section>
    );
  }
}
