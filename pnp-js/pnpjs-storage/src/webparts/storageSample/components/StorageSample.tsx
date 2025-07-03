import * as React from 'react';
import styles from './StorageSample.module.scss';
import type { IStorageSampleProps } from './IStorageSampleProps';
import * as strings from 'StorageSampleWebPartStrings';
import { PnPClientStorage } from "@pnp/core";
import { DefaultButton, Label, PrimaryButton, Slider, TextField, MessageBar, MessageBarType, Toggle } from '@fluentui/react';
import { IStorageSampleState } from './IStorageSampleState';

export default class StorageSample extends React.Component<IStorageSampleProps, IStorageSampleState> {
  private _storageKey: string = "SampleKey";

  state: IStorageSampleState = {
    insertedValue: "",
    retrievedValue: "",
    expirationMinutes: 5,
    notification: "",
    notificationType: MessageBarType.success,
    storageType: 'local'
  };

  public render(): React.ReactElement<IStorageSampleProps> {
    const { retrievedValue, notification, notificationType, storageType } = this.state;

    return (
      <section className={styles.storageSample}>
        <h2>{strings.Title}</h2>
        <div>
          {notification &&
            <MessageBar
              messageBarType={notificationType}
              isMultiline={false}
              onDismiss={() => this.setState({ notification: "" })}
            >{notification}</MessageBar>}
          <TextField
            label={strings.TestFieldLabel}
            onChange={(event, newValue) => this.setState({ insertedValue: newValue || undefined })}
          />
          <br />
          <div className={styles.controls}>
            <Toggle
              label={strings.StorageTypeLabel}
              checked={storageType === 'session'}
              onText={strings.StorageTypeSession}
              offText={strings.StorageTypeLocal}
              onChange={(_, checked) => this.setState({ storageType: checked ? 'session' : 'local' })}
            />
            <Slider
              label={strings.ExpirationSliderLabel}
              min={1}
              max={10}
              step={1}
              value={this.state.expirationMinutes || 5}
              onChange={(value) => this.setState({ expirationMinutes: value })}
              showValue
            />
            <PrimaryButton
              onClick={() => this._saveValue()}
              text={strings.SaveButtonText}
            />
            <DefaultButton
              onClick={() => this._deleteValue()}
              text={strings.DeleteFromStorageButtonText}
            />
          </div>
        </div>
        <hr />
        <div>
          <h3>{strings.RetrieveValueTitle}</h3>
          <div className={styles.controls}>
            <PrimaryButton
              onClick={() => this._handleRetrieve()}
              text={strings.RetrieveButtonText}
            />
          </div>
          <Label>{strings.ValueRetrievedLabel}: {retrievedValue ?? strings.NoValueStored}</Label>
        </div>
      </section>
    );
  }

  private _getStorage() {
    const storage = new PnPClientStorage();
    return this.state.storageType === 'session' ? storage.session : storage.local;
  }

  private _saveValue = (): void => {
    const { insertedValue, expirationMinutes } = this.state;
    const storage = this._getStorage();
    storage.put(this._storageKey, insertedValue, new Date(Date.now() + (expirationMinutes || 5) * 60000));
    this.setState({
      notification: strings.NotificationValueSaved,
      notificationType: MessageBarType.success
    });
  }

  private _deleteValue = (): void => {
    const storage = this._getStorage();
    storage.delete(this._storageKey);
    this.setState({
      notification: strings.NotificationValueDeleted,
      notificationType: MessageBarType.success
    });
  }

  private _handleRetrieve = (): void => {
    this.setState({
      retrievedValue: this._retrieveValue(),
      notification: strings.NotificationValueRetrieved,
      notificationType: MessageBarType.success
    });
  }

  private _retrieveValue = (): string | undefined => {
    const storage = this._getStorage();
    return storage.get(this._storageKey);
  }
}
