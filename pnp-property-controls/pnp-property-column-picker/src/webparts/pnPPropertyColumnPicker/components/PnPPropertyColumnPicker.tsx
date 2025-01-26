import * as React from 'react';
import * as strings from 'PnPPropertyColumnPickerWebPartStrings';
import styles from './PnPPropertyColumnPicker.module.scss';
import type { IPnPPropertyColumnPickerProps } from './IPnPPropertyColumnPickerProps';

export default class PnPPropertyColumnPicker extends React.Component<IPnPPropertyColumnPickerProps> {
  public render(): React.ReactElement<IPnPPropertyColumnPickerProps> {
    const {
      column,
      multiColumn,
      columnReturnProperty
    } = this.props;

    return (
      <section className={styles.pnPPropertyColumnPicker}>
        <div>
          <h3>{strings.Title}</h3>
          <div>
            {strings.Column}: {column}
          </div>
          <div>
            {strings.ReturnPropertyInstance}: {columnReturnProperty}
          </div>
          <div>
            {strings.MultiColumn}: {multiColumn}
          </div>
        </div>
      </section>
    );
  }
}
