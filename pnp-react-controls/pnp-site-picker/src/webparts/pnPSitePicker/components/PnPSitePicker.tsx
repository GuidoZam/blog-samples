import * as React from 'react';
import styles from './PnPSitePicker.module.scss';
import type { IPnPSitePickerProps } from './IPnPSitePickerProps';
import { SitePicker } from '@pnp/spfx-controls-react/lib/SitePicker';
import * as strings from 'PnPSitePickerWebPartStrings';

export default class PnPSitePicker extends React.Component<IPnPSitePickerProps, {}> {
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
              onChange={(site) => {
                console.log(site);
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
              onChange={(site) => {
                console.log(site);
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
              onChange={(site) => {
                console.log(site);
              }}
            />
          </div>
          <div>
            <h4 className={styles.sectionTitle}>
              <span>{strings.EntitiesAvailable}</span>
            </h4>
            <SitePicker
              context={this.props.context as any}
              mode='site'
              onChange={(site) => {
                console.log(site);
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
              onChange={(site) => {
                console.log(site);
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
              onChange={(site) => {
                console.log(site);
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
              onChange={(site) => {
                console.log(site);
              }}
            />
          </div>
        </div>
      </section>
    );
  }
}
