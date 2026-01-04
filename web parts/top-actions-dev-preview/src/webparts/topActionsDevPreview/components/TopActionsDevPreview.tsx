import * as React from 'react';
import styles from './TopActionsDevPreview.module.scss';
import type { ITopActionsDevPreviewProps } from './ITopActionsDevPreviewProps';
import { LoggingEnum } from './LoggingEnum';
import * as strings from 'TopActionsDevPreviewWebPartStrings';

export default class TopActionsDevPreview extends React.Component<ITopActionsDevPreviewProps> {
  constructor(props: ITopActionsDevPreviewProps) {
    super(props);

    this.log('TopActionSample component constructed.', LoggingEnum.Verbose);
    this.log(`Initial like state: ${this.props.like}`, LoggingEnum.Verbose);
  }

  public render(): React.ReactElement<ITopActionsDevPreviewProps> {
    this.log('TopActionSample component rendered.', LoggingEnum.Verbose);

    this.log('Sample warning message.', LoggingEnum.Warning);
    this.log('Sample error message.', LoggingEnum.Error);

    return (
      <section className={styles.topActionsDevPreview}>
        <h2>{strings.Title}</h2>
        <div>
          <p>{strings.Description}</p>
        </div>
      </section>
    );
  }

  private log(message: string, level: LoggingEnum): void {
    const shouldLog = this.props.logging === level ||
      (this.props.logging === LoggingEnum.Verbose && level !== LoggingEnum.Off);

    if (shouldLog) {
      switch (level) {
        case LoggingEnum.Off:
          break;
        case LoggingEnum.Warning || LoggingEnum.Verbose:
          console.warn(`🔎 ${message}`);
          break;
        case LoggingEnum.Error || LoggingEnum.Verbose:
          console.error(`🔎 ${message}`);
          break;
        case LoggingEnum.Verbose:
          console.log(`🔎 ${message}`);
          break;
      }
    }
  }
}
