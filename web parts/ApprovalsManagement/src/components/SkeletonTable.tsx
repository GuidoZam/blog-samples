import * as React from 'react';
import { Skeleton, SkeletonItem } from '@fluentui/react-components';
import styles from './styles/SkeletonTable.module.scss';

interface ISkeletonTableProps {
  rows?: number;
}

export default class SkeletonTable extends React.Component<ISkeletonTableProps> {
  private readonly DefaultRowNumber = 5;

  public render(): React.ReactElement<ISkeletonTableProps> {
    const skeletonRows = [];

    let numberOfRows = this.props.rows;
    if (numberOfRows === undefined) {
      numberOfRows = this.DefaultRowNumber;
    }

    for (let i = 0; i < numberOfRows; i++) {
      skeletonRows.push(<div className={styles.content}>
        <SkeletonItem size={16} />
      </div>);
    }

    return (
      <div className={styles.skeletonTable}>
        <Skeleton>
          <div className={styles.header}>
            <SkeletonItem size={24} />
          </div>
          {skeletonRows}
        </Skeleton>
      </div>
    );
  }
}