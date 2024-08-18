import * as React from 'react';
import * as strings from 'DateAndTimePickerWebPartStrings';
import styles from './DateAndTimePicker.module.scss';
import type { IDateAndTimePickerProps } from './IDateAndTimePickerProps';

export default class DateAndTimePicker extends React.Component<IDateAndTimePickerProps, {}> {
  public render(): React.ReactElement<IDateAndTimePickerProps> {
    const {
      basicValue,
      customFormatValue,
      dateConventionValue,
      timeConventionValue,
      hideLabelsValue,
      validationValue,
      deferredValidationValue
    } = this.props;

    if (basicValue) {
      console.log(basicValue);
    }

    return (
      <section className={styles.dateAndTimePicker}>
        <div>
          <h3>{strings.Title}</h3>
          <div>
            <h4 className={styles.sectionTitle}>
              <span>{strings.BasicConfigurationLabel}</span>
            </h4>
            {basicValue?.displayValue}
          </div>
          <div>
            <h4 className={styles.sectionTitle}>
              <span>{strings.CustomFormatLabel}</span>
            </h4>
            {customFormatValue?.displayValue}
          </div>
          <div>
            <h4 className={styles.sectionTitle}>
              <span>{strings.DateConventionLabel}</span>
            </h4>
            {dateConventionValue?.displayValue}
          </div>
          <div>
            <h4 className={styles.sectionTitle}>
              <span>{strings.TimeConventionLabel}</span>
            </h4>
            {timeConventionValue?.displayValue}
          </div>
          <div>
            <h4 className={styles.sectionTitle}>
              <span>{strings.HideLabelsLabel}</span>
            </h4>
            {hideLabelsValue?.displayValue}
          </div>
          <div>
            <h4 className={styles.sectionTitle}>
              <span>{strings.ValidationLabel}</span>
            </h4>
            {validationValue?.displayValue}
          </div>
          <div>
            <h4 className={styles.sectionTitle}>
              <span>{strings.DeferredValidationValueLabel}</span>
            </h4>
            {deferredValidationValue?.displayValue}
          </div>
        </div>
      </section>
    );
  }
}
