import * as React from 'react';
import styles from './PlannerSample.module.scss';
import type { IPlannerSampleProps } from './IPlannerSampleProps';
import * as strings from 'PlannerSampleWebPartStrings';
import { Planner } from '@microsoft/mgt-react';

export default class PlannerSample extends React.Component<IPlannerSampleProps, {}> {
  constructor(props: IPlannerSampleProps) {
    super(props);
  }

  public render(): React.ReactElement<IPlannerSampleProps> {
    return (
      <section className={styles.plannerSample}>
        <h2>{strings.Title}</h2>
        <Planner readOnly={true}></Planner>
        {/* <Planner groupId={this.props.groupId}></Planner> */}
      </section>
    );
  }
}
