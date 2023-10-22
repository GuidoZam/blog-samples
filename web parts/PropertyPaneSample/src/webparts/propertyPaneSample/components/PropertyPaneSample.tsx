import * as React from 'react';
import type { IPropertyPaneSampleProps } from './IPropertyPaneSampleProps';
import * as strings from 'PropertyPaneSampleWebPartStrings';
import { Checkbox, Toggle } from '@fluentui/react';

export default class PropertyPaneSample extends React.Component<IPropertyPaneSampleProps, {}> {

  public render(): React.ReactElement<IPropertyPaneSampleProps> {
    const {
      description,
      checkboxValue,
      dropdownValue,
      toggleValue,
      sliderValue
    } = this.props;

    return (
      <section>
        <h2>{strings.PropertyPaneSampleTitle}</h2>
        <div>
          <div>
            <b>{strings.DescriptionFieldLabel}</b>
            <p>{description ?? "undefined"}</p>
          </div>
          <div>
            <b>{strings.CheckboxValueFieldLabel}</b>
            <Checkbox checked={checkboxValue ?? false} disabled={true}/>
          </div>
          <div>
            <b>{strings.DropdownValueFieldLabel}</b>
            <p>{dropdownValue ?? "undefined"}</p>
          </div>
          <div>
            <b>{strings.ToggleValueFieldLabel}</b>
            <Toggle checked={toggleValue ?? false} disabled={true} />
          </div>
          <div>
            <b>{strings.SliderValueFieldLabel}</b>
            <p>{sliderValue ?? "undefined"}</p>
          </div>
        </div>
      </section>
    );
  }
}
