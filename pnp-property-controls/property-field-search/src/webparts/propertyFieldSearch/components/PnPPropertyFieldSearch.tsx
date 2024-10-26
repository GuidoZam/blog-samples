import * as React from 'react';
import styles from './PropertyFieldSearch.module.scss';
import type { IPnPPropertyFieldSearchProps } from './IPnPPropertyFieldSearchProps';
import * as strings from 'PropertyFieldSearchWebPartStrings';

export default class PnPPropertyFieldSearch extends React.Component<IPnPPropertyFieldSearchProps> {
  public render(): React.ReactElement<IPnPPropertyFieldSearchProps> {
    return (
      <section className={styles.propertyFieldSearch}>
        <div>
          <h3>{strings.Title}</h3>
          <p>
            {strings.Description}
          </p>
        </div>
      </section>
    );
  }
}
