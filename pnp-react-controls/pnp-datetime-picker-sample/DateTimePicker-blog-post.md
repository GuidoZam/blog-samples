# Discover the DateTimePicker control from the PnP reusable React controls

## Introduction

Continuing our exploration of the PnP React controls, today I want to talk about the **DateTimePicker** control, a powerful component that allows users to select dates and optionally times from SharePoint applications.

If you're interested, you can find the code of this sample in this repository.

The **DateTimePicker** control allows users to select dates from a calendar and optionally the time of day using dropdown or text input controls. You can configure the control to use 12 or 24-hour clock formats, show only dates without times, and customize various aspects of the date/time selection experience.

This control is particularly useful when you need to:

- Allow users to select dates and times for scheduling purposes
- Support both 12-hour (AM/PM) and 24-hour time formats
- Show date-only selection without time components
- Restrict selectable dates to specific ranges
- Integrate seamlessly with SharePoint Online environments

## Visual Appearance

### DateTime Picker 12-hour Clock

Starting with the standard configuration displaying both date and time with 12-hour format:

**[TODO: Screenshot of DateTime picker with 12-hour clock]**

The control displays a clean calendar interface for date selection and time input fields with AM/PM selector for 12-hour format.

### DateTime Picker 24-hour Clock

When configured for 24-hour format, the AM/PM selector is replaced with 24-hour time input:

**[TODO: Screenshot of DateTime picker with 24-hour clock]**

### DateTime Picker Date Only

For scenarios where only date selection is needed:

**[TODO: Screenshot of date-only picker]**

The time selection controls are completely hidden when using DateConvention.Date.

### DateTime Picker Without Seconds

You can hide the seconds input for simpler time selection:

**[TODO: Screenshot of picker without seconds]**

### DateTime Picker with Dropdown Time Controls

Instead of text input, time can be selected using dropdown controls:

**[TODO: Screenshot of picker with dropdown time controls]**

This provides a more guided experience for time selection.

### With Min/Max Date Restrictions

The control supports restricting selectable dates to a specific range:

**[TODO: Screenshot of picker with date restrictions]**

Dates outside the allowed range are disabled in the calendar.

### With Default Value

You can initialize the picker with a pre-selected date and time:

**[TODO: Screenshot of picker with default value]**

### Disabled State

The control also supports a disabled state:

**[TODO: Screenshot of disabled picker]**

## Show me the Code

### Prerequisites

To use the PnP React controls, first you need to install the package:

```bash
npm install @pnp/spfx-controls-react --save --save-exact
```

After the installation of the package, you can proceed with the following instructions to use the **DateTimePicker** component.

To use the control, you first need to import it along with the necessary enums:

```typescript
import { DateTimePicker, DateConvention, TimeConvention, TimeDisplayControlType } from '@pnp/spfx-controls-react/lib/DateTimePicker';
```

Now that you understand how to install and import the component, let's explore the different usage scenarios.

### DateTime Picker 12-hour Clock

The standard implementation with 12-hour time format:

```typescript
<DateTimePicker 
  label="Select date and time (12-hour format)"
  dateConvention={DateConvention.DateTime}
  timeConvention={TimeConvention.Hours12}
  value={this.state.date12Hour}
  onChange={this._on12HourChange}
/>
```

The required properties are:

- **label**: The label displayed above the control
- **dateConvention**: DateTime to show both date and time, or Date for date only
- **timeConvention**: Hours12 for 12-hour format with AM/PM, or Hours24 for 24-hour format
- **onChange**: Callback function when the date/time changes

The onChange handler:

```typescript
private _on12HourChange = (date: Date | undefined): void => {
  console.log('12-hour selection:', date);
  this.setState({ date12Hour: date });
}
```

### DateTime Picker 24-hour Clock

For 24-hour format, simply change the timeConvention:

```typescript
<DateTimePicker 
  label="Select date and time (24-hour format)"
  dateConvention={DateConvention.DateTime}
  timeConvention={TimeConvention.Hours24}
  value={this.state.date24Hour}
  onChange={this._on24HourChange}
/>
```

### Date Only Mode

To show only the date picker without time selection:

```typescript
<DateTimePicker 
  label="Select date only (no time)"
  dateConvention={DateConvention.Date}
  value={this.state.dateOnly}
  onChange={this._onDateOnlyChange}
/>
```

Notice that when using **DateConvention.Date**, you don't need to specify the timeConvention property.

### Without Seconds

Hide the seconds input by setting showSeconds to false:

```typescript
<DateTimePicker 
  label="Select date and time (no seconds)"
  dateConvention={DateConvention.DateTime}
  timeConvention={TimeConvention.Hours12}
  showSeconds={false}
  value={this.state.dateWithoutSeconds}
  onChange={this._onWithoutSecondsChange}
/>
```

### Dropdown Time Controls

Use dropdown controls instead of text input for time selection:

```typescript
<DateTimePicker 
  label="Select time using dropdowns"
  dateConvention={DateConvention.DateTime}
  timeConvention={TimeConvention.Hours12}
  timeDisplayControlType={TimeDisplayControlType.Dropdown}
  value={this.state.dateDropdown}
  onChange={this._onDropdownChange}
/>
```

The **timeDisplayControlType** property accepts:
- **TimeDisplayControlType.Text**: Text input fields (default)
- **TimeDisplayControlType.Dropdown**: Dropdown selectors

### With Min/Max Date Restrictions

Restrict selectable dates to a specific range:

```typescript
const today = new Date();
const minDate = new Date();
minDate.setDate(today.getDate() - 7);  // 7 days ago
const maxDate = new Date();
maxDate.setDate(today.getDate() + 7);  // 7 days from now

<DateTimePicker 
  label="Select date (with restrictions)"
  dateConvention={DateConvention.Date}
  minDate={minDate}
  maxDate={maxDate}
  value={this.state.dateRestricted}
  onChange={this._onRestrictedChange}
/>
```

Dates outside the min/max range will be disabled in the calendar picker.

### With Default Value

Initialize the picker with a pre-selected date:

```typescript
const defaultDate = new Date(2026, 11, 25, 15, 30, 0);

<DateTimePicker 
  label="Pre-set to a specific date"
  dateConvention={DateConvention.DateTime}
  timeConvention={TimeConvention.Hours12}
  value={defaultDate}
  onChange={(date: Date | undefined) => console.log('Date changed:', date)}
/>
```

### Disabled State

Disable the picker when interaction should not be allowed:

```typescript
<DateTimePicker 
  label="This picker is disabled"
  dateConvention={DateConvention.DateTime}
  timeConvention={TimeConvention.Hours12}
  disabled={true}
  onChange={(date: Date | undefined) => console.log('Disabled picker:', date)}
/>
```

## Conclusions

In my opinion, the **DateTimePicker** control is an excellent solution for scenarios requiring date and time selection with a modern, user-friendly interface. The control's support for multiple time formats, date-only mode, restrictions, and various customization options makes it suitable for a wide range of applications.

If you're interested in learning more, you can check the official documentation [here](https://pnp.github.io/sp-dev-fx-controls-react/controls/DateTimePicker/).

Hope this helps!
