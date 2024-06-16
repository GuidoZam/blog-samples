import * as React from 'react';
import styles from './MgtSearchResult.module.scss';
import type { IMgtSearchResultProps } from './IMgtSearchResultProps';
import { File, MgtTemplateProps, SearchResults } from '@microsoft/mgt-react';
import { Label, TextField, Toggle } from '@fluentui/react';
import * as strings from 'MgtSearchResultWebPartStrings';
import { IMgtSearchResultState } from './IMgtSearchResultState';

export default class MgtSearchResult extends React.Component<IMgtSearchResultProps, IMgtSearchResultState> {
  constructor(props: IMgtSearchResultProps) {
    super(props);

    this.state = {
      useCustomTemplate: false,
      maxResultCount: props.maxResultCount,
      maxAvailablePagination: props.maxAvailablePagination
    };
  }

  componentDidUpdate(prevProps: Readonly<IMgtSearchResultProps>, prevState: Readonly<IMgtSearchResultState>, snapshot?: any): void {
    if (prevProps.maxResultCount !== this.props.maxResultCount) {
      this.setState({ maxResultCount: this.props.maxResultCount });
    }

    if (prevProps.maxAvailablePagination !== this.props.maxAvailablePagination) {
      this.setState({ maxAvailablePagination: this.props.maxAvailablePagination });
    }
  }

  public render(): React.ReactElement<IMgtSearchResultProps> {
    return (
      <section className={styles.mgtSearchResult}>
        <div className={styles.welcome}>
          <h1>MGT Search Result</h1>
        </div>
        <div>
          <div className={styles.searchField}>
            <div className={styles.labelDiv}>
              <Label>{strings.QueryLabel}</Label>
            </div>
            <div className={styles.filterControlDiv}>
              <TextField 
                value={this.state.query} 
                onChange={(e, newValue) => { this.setState({ query: newValue }) }} 
                />
            </div>
          </div>
          <div className={styles.searchField}>
            <div className={styles.labelDiv}>
              <Label>{strings.UseWildcardLabel}</Label>
            </div>
            <div className={styles.filterControlDiv}>
              <Toggle 
                checked={this.state.useWildcard} 
                onChange={(e, checked) => this.setState({ useWildcard: checked })} 
                />
            </div>
          </div>
          <div className={styles.searchField}>
            <div className={styles.labelDiv}>
              <Label>{strings.UseCustomTmeplateLabel}</Label>
            </div>
            <div className={styles.filterControlDiv}>
              <Toggle
                checked={this.state.useCustomTemplate}
                onChange={(e, checked) => this.setState({ useCustomTemplate: checked !== undefined ? checked : false })}
              />
            </div>
          </div>
        </div>
        {!this.state.useCustomTemplate &&
        <div>
          {this.state.query && this.state.query.length > 0 &&
          <SearchResults 
            entityTypes={['driveItem']} 
            fetchThumbnail={true} 
            queryString={this.getQueryString()} 
            size={this.state.maxResultCount ?? 3}
            pagingMax={this.state.maxAvailablePagination ?? 3}
            />}
        </div>}
        {this.state.useCustomTemplate &&
        <div>
          {this.state.query && this.state.query.length > 0 &&
            <SearchResults
              entityTypes={['driveItem']}
              fetchThumbnail={true}
              queryString={this.getQueryString()}
              size={this.state.maxResultCount ?? 3}
              pagingMax={this.state.maxAvailablePagination ?? 3}
            >
              <this.customResultTemplate template='result-driveItem' />
            </SearchResults>}
        </div>}
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

  private customResultTemplate = (props: MgtTemplateProps): JSX.Element => {
    console.log("Custom result template");
    if (props.dataContext && props.template === 'result-driveItem') {
      return (
        <div>
          <File fileDetails={props.dataContext.resource} />
        </div>
      );
    }

    return <></>;
  }
}
