import * as React from 'react';
import * as strings from 'PnPPropertyViewPickerWebPartStrings';
import styles from './PnPPropertyViewPicker.module.scss';
import type { IPnPPropertyViewPickerProps } from './IPnPPropertyViewPickerProps';

export default class PnPPropertyViewPicker extends React.Component<IPnPPropertyViewPickerProps> {
  public render(): React.ReactElement<IPnPPropertyViewPickerProps> {
    const { selectedView } = this.props;

    return (
      <section className={styles.pnPPropertyViewPicker}>
        <h3>{strings.Title}</h3>
        <div>
          {strings.SelectedView}: {selectedView}
        </div>
      </section>
    );
  }
}
