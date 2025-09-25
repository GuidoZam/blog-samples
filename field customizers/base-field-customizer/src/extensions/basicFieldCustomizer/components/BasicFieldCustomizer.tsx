
import { Log } from '@microsoft/sp-core-library';
import * as React from 'react';
import styles from './BasicFieldCustomizer.module.scss';
import * as strings from 'BasicFieldCustomizerFieldCustomizerStrings';

export interface IBasicFieldCustomizerProps {
  percentage: number | undefined;
}

const LOG_SOURCE: string = 'BasicFieldCustomizer';

export default class BasicFieldCustomizer extends React.Component<IBasicFieldCustomizerProps> {
  public componentDidMount(): void {
    Log.info(LOG_SOURCE, 'React Element: BasicFieldCustomizer mounted');
  }

  public componentWillUnmount(): void {
    Log.info(LOG_SOURCE, 'React Element: BasicFieldCustomizer unmounted');
  }

  public render(): React.ReactElement<IBasicFieldCustomizerProps> {
    if (!this.props.percentage) {
      return <div className={styles.noValue}>{strings.NoValue}</div>
    }

    // Clamp value between 0 and 100
    const percent = Math.max(0, Math.min(100, Number(this.props.percentage)));

    // Choose color:
    // red for < 40
    // yellow for 40-60
    // green for > 60
    let barColor = '#f44336'; // red
    if (percent > 60) {
      barColor = '#4caf50'; // green
    } else if (percent >= 40 && percent <= 60) {
      barColor = '#ffeb3b'; // yellow
    }
    // Text color: dark for yellow and red, white for green
    const textColor = (percent > 60) ? '#fff' : '#222';

    return (
      <div className={styles.percentageBarContainer} title={percent + '%'}>
        <div
          className={styles.percentageBar}
          style={{ width: percent + '%', background: barColor }}
        />
        <span
          className={styles.percentageBarText}
          style={{ color: textColor }}
        >
          {percent}%
        </span>
      </div>
    );
  }
}
