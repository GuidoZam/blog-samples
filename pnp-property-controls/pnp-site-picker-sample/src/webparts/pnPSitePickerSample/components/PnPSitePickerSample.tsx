import * as React from 'react';
import styles from './PnPSitePickerSample.module.scss';
import type { IPnPSitePickerSampleProps } from './IPnPSitePickerSampleProps';
import * as strings from 'PnPSitePickerSampleWebPartStrings';

export default class PnPSitePickerSample extends React.Component<IPnPSitePickerSampleProps> {
  public render(): React.ReactElement<IPnPSitePickerSampleProps> {
    const {
      minimalSitePicker,
      site,
      sites
    } = this.props;

    return (
      <section className={styles.pnPSitePickerSample}>
        <h2>
          {strings.Title}
        </h2>
        <div>
          <b>{strings.MinimalSelectedSite}:</b> {minimalSitePicker ? minimalSitePicker.title : strings.NoSiteSelected}
          <br />
          <b>{strings.SelectedSite}:</b> {site ? site.title : strings.NoSiteSelected}
          <br/>
          <b>{strings.SelectedSites}:</b> {(!sites || sites.length === 0) && strings.NoSiteSelected}
          {sites && sites.length > 0 &&
          <ul>
            {sites.map((site, index) => {
              return (
                <li key={index}>{site.title}</li>
              );
            })}
          </ul>}
        </div>
      </section>
    );
  }
}
