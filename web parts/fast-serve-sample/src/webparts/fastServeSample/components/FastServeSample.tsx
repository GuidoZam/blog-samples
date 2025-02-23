import * as React from 'react';
import * as strings from 'FastServeSampleWebPartStrings';
import styles from './FastServeSample.module.scss';
import type { IFastServeSampleProps } from './IFastServeSampleProps';

export default class FastServeSample extends React.Component<IFastServeSampleProps> {
  public render(): React.ReactElement<IFastServeSampleProps> {

    return (
      <section className={styles.fastServeSample}>
        <div>
          <h3>{strings.Title}</h3>
          <div>{strings.Description}</div>  
        </div>
      </section>
    );
  }
}
