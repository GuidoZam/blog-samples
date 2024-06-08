import * as React from 'react';
import styles from './MgtSearchResult.module.scss';
import type { IMgtSearchResultProps } from './IMgtSearchResultProps';
import { SearchResults } from '@microsoft/mgt-react';
import { Label, TextField, Toggle } from '@fluentui/react';
import * as strings from 'MgtSearchResultWebPartStrings';
import { IMgtSearchResultState } from './IMgtSearchResultState';

export default class MgtSearchResult extends React.Component<IMgtSearchResultProps, IMgtSearchResultState> {
  constructor(props: IMgtSearchResultProps) {
    super(props);

    this.state = {
      query: undefined,
      useWildcard: undefined
    };
  }

  public render(): React.ReactElement<IMgtSearchResultProps> {
    return (
      <section className={styles.mgtSearchResult}>
        <div className={styles.welcome}>
          <h1>MGT Search Result</h1>
        </div>
        <div>
          <div className={styles.searchField}>
            <Label>{strings.QueryLabel}</Label>
            <TextField 
              value={this.state.query} 
              onChange={(e, newValue) => { this.setState({ query: newValue }) }} 
              />
          </div>
          <div className={styles.searchField}>
            <Label>{strings.UseWildcardLabel}</Label>
            <Toggle 
              checked={this.state.useWildcard} 
              onChange={(e, checked) => this.setState({ useWildcard: checked })} 
              />
          </div>
        </div>
        <div>
          {this.state.query && this.state.query.length > 0 &&
          <SearchResults 
            entityTypes={['driveItem']} 
            fetchThumbnail={true} 
            queryString={this.getQueryString()} 
            size={3}
            />}
        </div>
      </section>
    );
  }

  private getQueryString(): string {
    let query: string = this.state.query ?? '';
    
    if (this.state.useWildcard !== undefined && this.state.useWildcard === true) {
      query = query + '*';
    }

    return query;
  }
}