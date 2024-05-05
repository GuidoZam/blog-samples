import * as React from 'react';
import styles from './SearchBoxSample.module.scss';
import type { ISearchBoxSampleProps } from './ISearchBoxSampleProps';
import { SearchBox } from '@microsoft/mgt-react';
import * as strings from 'SearchBoxSampleWebPartStrings';

export default class SearchBoxSample extends React.Component<ISearchBoxSampleProps, {}> {
  public render(): React.ReactElement<ISearchBoxSampleProps> {
    return (
      <section className={styles.searchBoxSample}>
        <div className={styles.welcome}>
          <h2>{strings.Title}</h2>
        </div>
        <div className={styles.section}>
          <div>
            <h4 className={styles.sectionTitle}>
              <span>Basic usage</span>
            </h4>
            {/* Basic usage of SearchBox */}
            <SearchBox></SearchBox>
          </div>
        </div>
        <div className={styles.section}>
          <div>
            <h4 className={styles.sectionTitle}>
              <span>Custom term</span>
            </h4>
            {/* SearchBox with custom term */}
            <SearchBox searchTerm={"custom term"}></SearchBox>
          </div>
        </div>
        <div className={styles.section}>
          <div>
            <h4 className={styles.sectionTitle}>
              <span>Custom placeholder</span>
            </h4>
            {/* SearchBox custom placeholder */}
            <SearchBox placeholder={strings.Placeholder}></SearchBox>
          </div>
        </div>
        <div className={styles.section}>
          <div>
            <h4 className={styles.sectionTitle}>
              <span>Custom debounce delay</span>
            </h4>
            {/* SearchBox custom debounce delay */}
            <SearchBox debounceDelay={2000} searchTermChanged={(e) => alert(e.detail)}></SearchBox>
          </div>
        </div>
        <div className={styles.section}>
          <div>
            <h4 className={styles.sectionTitle}>
              <span>Search term changed event</span>
            </h4>
            {/* Search term changed event */}
            <SearchBox searchTermChanged={(e) => console.log(e)}></SearchBox>
          </div>
        </div>
      </section>
    );
  }
}
