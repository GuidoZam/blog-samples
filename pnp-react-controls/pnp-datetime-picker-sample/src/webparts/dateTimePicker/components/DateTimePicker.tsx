import * as React from 'react';
import styles from './DateTimePicker.module.scss';
import type { IDateTimePickerProps } from './IDateTimePickerProps';
import type { IDateTimePickerState } from './IDateTimePickerState';
import { DateTimePicker, DateConvention, TimeConvention, TimeDisplayControlType } from '@pnp/spfx-controls-react/lib/DateTimePicker';
import * as strings from 'DateTimePickerWebPartStrings';

export default class DateTimePickerComponent extends React.Component<IDateTimePickerProps, IDateTimePickerState> {
  
  constructor(props: IDateTimePickerProps) {
    super(props);
    
    this.state = {
      date12Hour: undefined,
      date24Hour: undefined,
      dateOnly: undefined,
      dateWithSeconds: undefined,
      dateDropdown: undefined,
      dateRestricted: undefined
    };
  }

  private _on12HourChange = (date: Date | undefined): void => {
    console.log('12-hour selection:', date);
    this.setState({ date12Hour: date });
  }

  private _on24HourChange = (date: Date | undefined): void => {
    console.log('24-hour selection:', date);
    this.setState({ date24Hour: date });
  }

  private _onDateOnlyChange = (date: Date | undefined): void => {
    console.log('Date only selection:', date);
    this.setState({ dateOnly: date });
  }

  private _onWithSecondsChange = (date: Date | undefined): void => {
    console.log('With seconds selection:', date);
    this.setState({ dateWithSeconds: date });
  }

  private _onDropdownChange = (date: Date | undefined): void => {
    console.log('Dropdown selection:', date);
    this.setState({ dateDropdown: date });
  }

  private _onRestrictedChange = (date: Date | undefined): void => {
    console.log('Restricted selection:', date);
    this.setState({ dateRestricted: date });
  }

  public render(): React.ReactElement<IDateTimePickerProps> {
    const today = new Date();
    const minDate = new Date();
    minDate.setDate(today.getDate() - 7);
    const maxDate = new Date();
    maxDate.setDate(today.getDate() + 7);
    const defaultDate = new Date(2026, 11, 25, 15, 30, 0);

    return (
      <section className={`${styles.dateTimePicker}`}>
        <div className={styles.container}>
          <h1 className={styles.title}>DateTimePicker Control Samples</h1>
          <p className={styles.description}>
            Explore various configurations of the PnP DateTimePicker control. 
            This sample demonstrates different scenarios for selecting dates and times in SharePoint.
          </p>

          {/* DateTime 12-hour Clock */}
          <div className={styles.section}>
            <h2 className={styles.sectionTitle}>{strings.DateTime12Hour}</h2>
            <DateTimePicker 
              label={strings.Select12HourDateTime}
              value={this.state.date12Hour}
              onChange={this._on12HourChange}
            />
            {this.state.date12Hour && (
              <div className={styles.selection}>
                Selected: <strong>{this.state.date12Hour.toLocaleString()}</strong>
              </div>
            )}
          </div>

          {/* DateTime 24-hour Clock */}
          <div className={styles.section}>
            <h2 className={styles.sectionTitle}>{strings.DateTime24Hour}</h2>
            <DateTimePicker 
              label={strings.Select24HourDateTime}
              dateConvention={DateConvention.DateTime}
              timeConvention={TimeConvention.Hours24}
              value={this.state.date24Hour}
              onChange={this._on24HourChange}
            />
            {this.state.date24Hour && (
              <div className={styles.selection}>
                Selected: <strong>{this.state.date24Hour.toLocaleString()}</strong>
              </div>
            )}
          </div>

          {/* Date Only */}
          <div className={styles.section}>
            <h2 className={styles.sectionTitle}>{strings.DateOnly}</h2>
            <DateTimePicker 
              label={strings.SelectDateOnly}
              dateConvention={DateConvention.Date}
              value={this.state.dateOnly}
              onChange={this._onDateOnlyChange}
            />
            {this.state.dateOnly && (
              <div className={styles.selection}>
                Selected: <strong>{this.state.dateOnly.toLocaleDateString()}</strong>
              </div>
            )}
          </div>

          {/* With Seconds */}
          <div className={styles.section}>
            <h2 className={styles.sectionTitle}>{strings.WithSeconds}</h2>
            <DateTimePicker 
              label={strings.TimeWithSeconds}
              dateConvention={DateConvention.DateTime}
              timeConvention={TimeConvention.Hours12}
              showSeconds={true}
              value={this.state.dateWithSeconds}
              onChange={this._onWithSecondsChange}
            />
            {this.state.dateWithSeconds && (
              <div className={styles.selection}>
                Selected: <strong>{this.state.dateWithSeconds.toLocaleString()}</strong>
              </div>
            )}
          </div>

          {/* Dropdown Time Controls */}
          <div className={styles.section}>
            <h2 className={styles.sectionTitle}>{strings.DropdownTime}</h2>
            <DateTimePicker 
              label={strings.SelectWithDropdowns}
              dateConvention={DateConvention.DateTime}
              timeConvention={TimeConvention.Hours12}
              timeDisplayControlType={TimeDisplayControlType.Dropdown}
              value={this.state.dateDropdown}
              onChange={this._onDropdownChange}
            />
            {this.state.dateDropdown && (
              <div className={styles.selection}>
                Selected: <strong>{this.state.dateDropdown.toLocaleString()}</strong>
              </div>
            )}
          </div>

          {/* With Min/Max Restrictions */}
          <div className={styles.section}>
            <h2 className={styles.sectionTitle}>{strings.WithRestrictions}</h2>
            <DateTimePicker 
              label={strings.DateWithRestrictions}
              dateConvention={DateConvention.Date}
              minDate={minDate}
              maxDate={maxDate}
              value={this.state.dateRestricted}
              onChange={this._onRestrictedChange}
            />
            {this.state.dateRestricted && (
              <div className={styles.selection}>
                Selected: <strong>{this.state.dateRestricted.toLocaleDateString()}</strong>
              </div>
            )}
          </div>

          {/* With Default Value */}
          <div className={styles.section}>
            <h2 className={styles.sectionTitle}>{strings.WithDefaultValue}</h2>
            <DateTimePicker 
              label={strings.PresetDate}
              dateConvention={DateConvention.DateTime}
              timeConvention={TimeConvention.Hours12}
              value={defaultDate}
              onChange={(date: Date | undefined) => console.log('Default value changed:', date)}
            />
          </div>

          {/* Disabled State */}
          <div className={styles.section}>
            <h2 className={styles.sectionTitle}>{strings.DisabledPicker}</h2>
            <DateTimePicker 
              label={strings.PickerIsDisabled}
              dateConvention={DateConvention.DateTime}
              timeConvention={TimeConvention.Hours12}
              disabled={true}
              onChange={(date: Date | undefined) => console.log('Disabled picker:', date)}
            />
          </div>

        </div>
      </section>
    );
  }
}
