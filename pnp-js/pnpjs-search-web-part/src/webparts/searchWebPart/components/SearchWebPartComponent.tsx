import * as React from 'react';
import * as strings from 'SearchWebPartStrings';
import styles from './SearchWebPartComponent.module.scss';
import type { ISearchWebPartComponentProps } from './ISearchWebPartComponentProps';
import { ISearchWebPartComponentState } from './ISearchWebPartComponentState';
import { PrimaryButton, TextField } from '@fluentui/react';
import { ISearchResult } from '@pnp/sp/search';
import { ISearchService } from '../../../services/ISearchService';
import SearchService from '../../../services/SearchService';

export default class SearchWebPartComponent extends React.Component<ISearchWebPartComponentProps, ISearchWebPartComponentState> {
  private _searchService: ISearchService;

  constructor(props: ISearchWebPartComponentProps) {
    super(props);

    this.state = {
      results: []
    };
  }

  public async componentDidMount(): Promise<void> {
    this._searchService = new SearchService(this.props.sp);
  }

  public render(): React.ReactElement<ISearchWebPartComponentProps> {
    const { results, query } = this.state;
    const { showTitle } = this.props;

    return (
      <section className={styles.searchWebPart}>
        {showTitle && <h2>{strings.Title}</h2>}
        <div className={styles.searchContainer}>
          <TextField
            placeholder={strings.SearchPlaceholder}
            onChange={(_, newValue) => {
              this.setState({ query: newValue, results: [] });
            }} />
          <PrimaryButton 
            text={strings.SearchButtonText}
            disabled={!query || query.length === 0}
            className={styles.searchButton}
            onClick={this._search}/>
        </div>

        {results.length > 0 && 
        this._renderResults()}

        {results.length === 0 && 
        <div className={styles.noResults}>
          <i>
            {strings.NoResultsFound}
          </i>
        </div>}
      </section>
    );
  }

  private _renderResults(): React.ReactElement {
    const { results } = this.state;

    return (
      <ul>
        {results.map((result: ISearchResult, index: number) => (
          <li key={index}>
            <a 
              href={result.OriginalPath} 
              target="_blank"
              rel="noreferrer">
              {result.Title}
            </a>
          </li>
        ))}
      </ul>
    );
  }

  private _search = async (): Promise<void> => {
    const { query } = this.state;
    const { rowLimit, siteUrl } = this.props;

    const results = await this._searchService.search(query!, rowLimit, siteUrl);

    this.setState({ results });
  }
}
