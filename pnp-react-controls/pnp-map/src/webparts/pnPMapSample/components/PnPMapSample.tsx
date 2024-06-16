import * as React from 'react';
import styles from './PnPMapSample.module.scss';
import * as strings from 'PnPMapSampleWebPartStrings';
import type { IPnPMapSampleProps } from './IPnPMapSampleProps';
import { Map, MapType } from "@pnp/spfx-controls-react/lib/Map";
import { IPnPMapSampleState } from './IPnPMapSampleState';

export default class PnPMapSample extends React.Component<IPnPMapSampleProps, IPnPMapSampleState> {
  constructor(props: IPnPMapSampleProps) {
    super(props);
    this.state = {};
  }

  public render(): React.ReactElement<IPnPMapSampleProps> {
    return (
      <section className={styles.PnPMapSample}>
        <div className={styles.welcome}>
          {strings.Title}
        </div>
        <div>
          <h4 className={styles.sectionTitle}>
            <span>Minimal usage Map</span>
          </h4>
          <Map
            coordinates={{
              displayName: "Colosseum, Rome, Italy",
              latitude: 41.890251,
              longitude: 12.492373
            }}
          />
        </div>
        <div>
          <h4 className={styles.sectionTitle}>
            <span>Customized map</span>
          </h4>
          <Map
            coordinates={{
              displayName: "Berlin, Germany",
              latitude: 52.520008,
              longitude: 13.404954
            }}
            titleText={strings.CustomMapTitle}
            loadingMessage={strings.LoadingMessage}
            zoom={15}
          />
        </div>
        <div>
          <h4 className={styles.sectionTitle}>
            <span>Map with search enabled</span>
          </h4>
          <Map
            coordinates={{
              displayName: "Copenhagen, Denmark",
              latitude: 55.6712398,
              longitude: 12.5114238
            }}
            enableSearch={true}
          />
        </div>
        <div>
          <h4 className={styles.sectionTitle}>
            <span>Map with <b>cycle</b> visualization</span>
          </h4>
          <Map
            coordinates={{
              displayName: "Rotterdam, Netherlands",
              latitude: 51.9279573,
              longitude: 4.4084277
            }}
            mapType={MapType.cycle}
          />
        </div>
        <div>
          <h4 className={styles.sectionTitle}>
            <span>Map with <b>transportation</b> visualization</span>
          </h4>
          <Map
            coordinates={{
              displayName: "Paris, France",
              latitude: 48.8566101,
              longitude: 2.3514992
            }}
            mapType={MapType.transport}
          />
        </div>
        <div>
          <h4 className={styles.sectionTitle}>
            <span>Map with <b>normal</b> visualization</span>
          </h4>
          <Map
            coordinates={{
              displayName: "Vienna, Austria",
              latitude: 48.2081743,
              longitude: 16.3738189
            }}
            mapType={MapType.normal}
          />
        </div>
        <div>
          <h4 className={styles.sectionTitle}>
            <span>Map with <b>standard</b> visualization</span>
          </h4>
          <Map
            coordinates={{
              displayName: "Toronto, Canada",
              latitude: 43.651070,
              longitude: -79.347015
            }}
            mapType={MapType.standard}
          />
        </div>
        <div>
          <h4 className={styles.sectionTitle}>
            <span>Map data retrieval</span>
          </h4>
          <Map
            coordinates={{
              displayName: "New York, USA",
              latitude: 40.712776,
              longitude: -74.005974
            }}
            enableSearch={true}
            onUpdateCoordinates={(locationInfo) => {
              this.setState({
                selectedCoordinate: locationInfo
              });
            }}
          />
          <div>
          {this.state.selectedCoordinate &&
            <div>
              <h4>{strings.SelectedLocationDiv}</h4>
              <div>
                <span><b>{strings.DisplayName}:</b> {this.state.selectedCoordinate.displayName}</span>
              </div>
              <div>
                <span><b>{strings.Latitude}:</b> {this.state.selectedCoordinate.latitude}</span>
              </div>
              <div>
                <span><b>{strings.Longitude}:</b> {this.state.selectedCoordinate.longitude}</span>
              </div>
            </div>}
          </div>
        </div>
      </section>
    );
  }
}
