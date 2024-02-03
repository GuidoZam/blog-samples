import * as React from 'react';
import styles from './MgtAgenda.module.scss';
import type { IMgtAgendaProps } from './IMgtAgendaProps';
import * as strings from 'MgtAgendaWebPartStrings';
import { Agenda } from '@microsoft/mgt-react/dist/es6/spfx';

export default class MgtAgenda extends React.Component<IMgtAgendaProps, {}> {
  public render(): React.ReactElement<IMgtAgendaProps> {

    return (
      <section className={styles.mgtAgenda}>
        <h2>
          <b>
            {strings.Title}
          </b>
        </h2>
        <div>
          <Agenda 
            groupByDay={this.props.groupByDay === true}
            days={this.props.showMaxDays}  
          />
        </div>
      </section>
    );
  }
}
