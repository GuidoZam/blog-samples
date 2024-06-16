import * as React from 'react';
import styles from './PnPMapSample.module.scss';
import * as strings from 'PnPMapSampleWebPartStrings';
import type { IPnPMapSampleProps } from './IPnPMapSampleProps';
import { Map, MapType } from "@pnp/spfx-controls-react/lib/Map";

export default class PnPMapSample extends React.Component<IPnPMapSampleProps, {}> {
  public render(): React.ReactElement<IPnPMapSampleProps> {
    return (
      <section className={styles.PnPMapSample}>
        <div className={styles.welcome}>
          {strings.Title}
        </div>
        <div>
          <h4 className={styles.sectionTitle}>
            <span>Map with default location data</span>
          </h4>
          <Map
            coordinates={{
              displayName: "Colosseum, Rome, Italy",
              latitude: 41.890251,
              longitude: 12.492373
              }}
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
            <span>Map with cycle data</span>
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
            <span>Map with transportation data</span>
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
      </section>
    );
  }
}
