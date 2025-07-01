import * as React from 'react';
import styles from './StorageSample.module.scss';
import type { IStorageSampleProps } from './IStorageSampleProps';
import * as strings from 'StorageSampleWebPartStrings';
import { PnPClientStorage } from "@pnp/core";
import { Label, TextField } from '@fluentui/react';
import { IStorageSampleState } from './IStorageSampleState';

export default class StorageSample extends React.Component<IStorageSampleProps, IStorageSampleState> {
  constructor(props: IStorageSampleProps) {
    super(props);

    this.state = {
      insertedValue: ""
    };
  }

  public render(): React.ReactElement<IStorageSampleProps> {
    const retrievedValue = this._retrieveValue();
    console.log("Retrieved value from storage:", retrievedValue);

    return (
      <section className={styles.storageSample}>
        <h2>{strings.Title}</h2>
        <div>
          <TextField
            label={strings.TestFieldLabel}
            onChange={this._setValue}
          />
        </div>
        <div>
          <h3>{strings.RetrievedValueTitle}</h3>
          <Label>{retrievedValue ?? strings.NoValueStored}</Label>
        </div>
      </section>
    );
  }

  private _setValue = (event: React.FormEvent<HTMLInputElement | HTMLTextAreaElement>, value: string): void => {
    const storage = new PnPClientStorage();
    storage.local.put(value, "SampleKey");
    this.setState({ insertedValue: value });
  }

  private _retrieveValue = (): string | null => {
    const storage = new PnPClientStorage();
    return storage.local.get("SampleKey");
  }
}
