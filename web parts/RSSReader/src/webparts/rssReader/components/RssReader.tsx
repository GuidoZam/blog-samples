import * as React from 'react';
import styles from './RssReader.module.scss';
import type { IRssReaderProps } from './IRssReaderProps';
import { IRssReaderState } from './IRssReaderState';
import * as Parser from 'rss-parser';
import * as strings from 'RssReaderWebPartStrings';

export default class RssReader extends React.Component<IRssReaderProps, IRssReaderState> {

  private CORS_PROXY: string = "https://cors-anywhere.herokuapp.com/";

  constructor(props: IRssReaderProps) {
    super(props);

    this.state = {
      rssItems: [],
      isLoading: false,
      error: undefined
    };
  }

  public async componentDidMount(): Promise<void> {
    await this.loadRssFeed();
  }

  async componentDidUpdate(prevProps: IRssReaderProps): Promise<void> {
    if (this.props.rssUrl !== prevProps.rssUrl && this.props.rssUrl.length > 0) {
      await this.loadRssFeed();
    }
  }

  private async loadRssFeed(): Promise<void> {
    this.setState({
      isLoading: true
    });

    let items: any[] = [];
    let errorMessage: string | undefined = undefined;
    
    const parser: Parser = new Parser();

    try {
      const feed = await parser.parseURL(`${this.CORS_PROXY}${this.props.rssUrl}`);
      items = feed.items;
    }
    catch (error) {
      errorMessage = error.message;
    }

    this.setState({
      rssItems: items,
      isLoading: false,
      error: errorMessage
    });
  }

  public render(): React.ReactElement<IRssReaderProps> {
    return (
      <section className={styles.rssReader}>
        <div>
          <h2>{strings.RssReaderTitle}</h2>
        </div>
        {this.state.isLoading && <div className={styles.loading}>{strings.Loading}</div>}
        {!this.state.isLoading && <div>
          <ul>
            {this.state.rssItems.map(item => {
              if (item && item.link && item.title) {
                return (<li>
                  <a href={item.link}>{item.title}</a>
                </li>);
              }
            })}
          </ul>
        </div>}
        {this.state.error && <div className={styles.error}>
          {strings.ErrorLabel}
          <br />
          {this.state.error}
        </div>}
      </section>
    );
  }
}
