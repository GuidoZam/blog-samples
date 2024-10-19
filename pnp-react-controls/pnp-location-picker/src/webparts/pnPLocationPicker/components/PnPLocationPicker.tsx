import * as React from 'react';
import styles from './PnPLocationPicker.module.scss';
import * as strings from 'PnPLocationPickerWebPartStrings';
import type { IPnPLocationPickerProps } from './IPnPLocationPickerProps';
import { LocationPicker, ILocationPickerItem } from "@pnp/spfx-controls-react/lib/LocationPicker";

export default class PnPLocationPicker extends React.Component<IPnPLocationPickerProps> {
  public render(): React.ReactElement<IPnPLocationPickerProps> {
    const { context } = this.props;

    return (
      <section className={styles.pnPLocationPicker}>
        <h3>Welcome to SharePoint Framework!</h3>
        <div>
          <h4 className={styles.sectionTitle}>
            <span>{strings.MinimalConfigurationInstance}</span>
          </h4>
          <LocationPicker
            context={context as any} />
        </div>
        <div>
          <h4 className={styles.sectionTitle}>
            <span>{strings.DefaultValueInstance}</span>
          </h4>
          <LocationPicker
            context={context as any}
            defaultValue={this._getLocationByCoordinates()} />
        </div>
        <div>
          <h4 className={styles.sectionTitle}>
            <span>{strings.ErrorMessageInstance}</span>
          </h4>
          <LocationPicker
            context={context as any}
            errorMessage={strings.ErrorMessageText} />
        </div>
        <div>
          <h4 className={styles.sectionTitle}>
            <span>{strings.CustomStringsInstance}</span>
          </h4>
          <LocationPicker
            context={context as any}
            label={strings.CustomStrings.Label}
            placeholder={strings.CustomStrings.Placeholder} />
        </div>
        <div>
          <h4 className={styles.sectionTitle}>
            <span>{strings.OnChangeInstance}</span>
          </h4>
          <LocationPicker
            context={context as any}
            onChange={this._onChange} />
        </div>
        <div>
          <h4 className={styles.sectionTitle}>
            <span>{strings.DisabledInstance}</span>
          </h4>
          <LocationPicker
            context={context as any} 
            disabled={true}
            defaultValue={this._getLocationByAddress()}/>
        </div>
      </section>
    );
  }

  private _onChange(newValue: ILocationPickerItem): void {
    console.log(newValue);
  }

  private _getLocationByAddress(): ILocationPickerItem {
    return {
      DisplayName: "Microsoft Italia",
      EntityType: "LocalBusiness",
      Address: {
        City: "Milan",
        CountryOrRegion: "Italy",
        State: "Lombardy",
        Street: "Via Pasubio 21",
      }
    };
  }

  private _getLocationByCoordinates(): ILocationPickerItem {
    return {
      DisplayName: "Notre-Dame de Paris",
      EntityType: "TouristAttraction",
      Coordinates: {
        Latitude: 48.8533,
        Longitude: 2.3491
      }
    };
  }
}
