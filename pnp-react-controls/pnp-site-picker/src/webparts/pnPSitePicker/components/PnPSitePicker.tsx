import * as React from 'react';
import styles from './PnPSitePicker.module.scss';
import type { IPnPSitePickerProps } from './IPnPSitePickerProps';
import { SitePicker } from '@pnp/spfx-controls-react/lib/SitePicker';
import * as strings from 'PnPSitePickerWebPartStrings';
import { IPnPSitePickerState } from './IPnPSitePickerState';

export default class PnPSitePicker extends React.Component<IPnPSitePickerProps, IPnPSitePickerState> {
  constructor(props: IPnPSitePickerProps) {
    super(props);
    
    this.state = {
      selectedSites: []
    };
  }

  public render(): React.ReactElement<IPnPSitePickerProps> {
    return (
      <section className={styles.pnPSitePicker}>
        <div className={styles.welcome}>
          {strings.Title}
        </div>
        <div>
          <div>
            <h4 className={styles.sectionTitle}>
              <span>{strings.BasicUsage}</span>
            </h4>
            <SitePicker
              context={this.props.context as any}
              onChange={(sites) => {
                console.log(sites);
              }}
            />
          </div>
          <div>
            <h4 className={styles.sectionTitle}>
              <span>{strings.DeferredSearchTime}</span>
            </h4>
            <SitePicker
              context={this.props.context as any}
              deferredSearchTime={2000}
              onChange={(sites) => {
                console.log(sites);
              }}
            />
          </div>
          <div>
            <h4 className={styles.sectionTitle}>
              <span>{strings.DisableSearch}</span>
            </h4>
            <SitePicker
              context={this.props.context as any}
              allowSearch={false}
              onChange={(sites) => {
                console.log(sites);
              }}
            />
          </div>
          <div>
            <h4 className={styles.sectionTitle}>
              <span>{strings.Mode}</span>
            </h4>
            <SitePicker
              context={this.props.context as any}
              mode='hub'
              onChange={(sites) => {
                console.log(sites);
              }}
            />
          </div>
          <div>
            <h4 className={styles.sectionTitle}>
              <span>{strings.MultiSelectionDisabled}</span>
            </h4>
            <SitePicker
              context={this.props.context as any}
              multiSelect={false}
              onChange={(sites) => {
                console.log(sites);
              }}
            />
          </div>
          <div>
            <h4 className={styles.sectionTitle}>
              <span>{strings.OrderByUrl}</span>
            </h4>
            <SitePicker
              context={this.props.context as any}
              orderBy='url'
              onChange={(sites) => {
                console.log(sites);
              }}
            />
          </div>
          <div>
            <h4 className={styles.sectionTitle}>
              <span>{strings.CustomLabels}</span>
            </h4>
            <SitePicker
              context={this.props.context as any}
              label={strings.Label}
              placeholder={strings.Placeholder}
              onChange={(sites) => {
                console.log(sites);
              }}
            />
          </div>
          <div>
            <h4 className={styles.sectionTitle}>
              <span>{strings.CurrentSiteCollection}</span>
            </h4>
            <SitePicker
              context={this.props.context as any}
              mode='web'
              limitToCurrentSiteCollection={true}
              onChange={(sites) => {
                console.log(sites);
                this.setState({ selectedSites: sites });
              }}
            />
          </div>
          <div>
            <h4 className={styles.sectionTitle}>
              <span>{strings.AlreadySelectedAndDisabled}</span>
            </h4>
            <SitePicker
              context={this.props.context as any}
              selectedSites={this.state.selectedSites}
              //initialSites={this.state.selectedSites}
              disabled={true}
              onChange={(sites) => {
                console.log(sites);
              }}
            />
          </div>
        </div>
      </section>
    );
  }
}
