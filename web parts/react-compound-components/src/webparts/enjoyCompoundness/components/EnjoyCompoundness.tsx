import * as React from 'react';
import styles from './EnjoyCompoundness.module.scss';
import type { IEnjoyCompoundnessProps } from './IEnjoyCompoundnessProps';
import { CustomComponent, Title, Child } from './CustomComponent';

export default class EnjoyCompoundness extends React.Component<IEnjoyCompoundnessProps, {}> {
  public render(): React.ReactElement<IEnjoyCompoundnessProps> {

    return (
      <section className={styles.enjoyCompoundness}>
        <CustomComponent>
          <Title label="Big title" showBigger={true} />
          <Title label="Title of the first child" showBigger={false} />
          <Child label="Child 1" />
          <Title label="Title of the second child" showBigger={false} />
          <Child label="Child 2" />
          <Title label="Title of the third child" showBigger={false} />
          <Child label="Child 3" />
        </CustomComponent>
      </section>
    );
  }
}
