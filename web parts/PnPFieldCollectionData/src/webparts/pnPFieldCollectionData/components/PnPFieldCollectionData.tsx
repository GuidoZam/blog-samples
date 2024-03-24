import * as React from 'react';
import styles from './PnPFieldCollectionData.module.scss';
import type { IPnPFieldCollectionDataProps } from './IPnPFieldCollectionDataProps';
import * as strings from 'PnPFieldCollectionDataWebPartStrings';
import { FieldCollectionData, CustomCollectionFieldType, ICustomCollectionField } from '@pnp/spfx-controls-react/lib/FieldCollectionData';
import { IPnPFieldCollectionDataState } from './IPnPFieldCollectionDataState';
import { Icon, Slider } from '@fluentui/react';

export default class PnPFieldCollectionData extends React.Component<IPnPFieldCollectionDataProps, IPnPFieldCollectionDataState> {
  constructor(props: IPnPFieldCollectionDataProps) {
    super(props);

    this.state = {
      sampleData:  [{
        StringField: "String value",
        NumberField: 123,
        BooleanField: true,
        DropdownField: "2",
        ComboboxField: "3",
        FabricIconField: "Rocket",
        PeoplePickerField: "",
        URLField: "https://iamguidozam.blog",
        DateField: new Date(),
        CustomField: JSON.stringify({ "sliderValue": 70 })
      },
      {
        StringField: "String value",
        NumberField: 42,
        BooleanField: false,
        DropdownField: "1",
        ComboboxField: "2",
        FabricIconField: "Permissions",
        PeoplePickerField: "",
        URLField: "https://pnp.github.io",
        DateField: new Date(),
        CustomField: JSON.stringify({ "sliderValue": 30 })
      }]
    };
  }

  public render(): React.ReactElement<IPnPFieldCollectionDataProps> {

    return (
      <section className={styles.pnPFieldCollectionData}>
        <div className={styles.welcome}>
          <h2>{strings.Title}</h2>
        </div>
        <div>
          <FieldCollectionData
            key={"FieldCollectionData"}
            label={strings.FirstLabel}
            manageBtnLabel={strings.Manage}
            onChanged={(value) => { this.setState({ sampleData: value }); }}
            panelHeader={strings.Header}
            context={this.props.context}
            itemsPerPage={3}
            fields={[
              { id: "StringField", title: "String field", type: CustomCollectionFieldType.string, required: true },
              { id: "NumberField", title: "Number field", type: CustomCollectionFieldType.number },
              { id: "BooleanField", title: "Boolean field", type: CustomCollectionFieldType.boolean },
              { id: "DropdownField", title: "Dropdown field", type: CustomCollectionFieldType.dropdown, options: [{ key: "1", text: "One" }, { key: "2", text: "Two" }, { key: "3", text: "Three" }] },
              { id: "ComboboxField", title: "Combobox field", type: CustomCollectionFieldType.combobox, options: [{ key: "1", text: "One" }, { key: "2", text: "Two" }, { key: "3", text: "Three" }] },
              { id: "FabricIconField", title: "FabricIcon field", type: CustomCollectionFieldType.fabricIcon },
            ]}
            value={this.state.sampleData}
          />

          <FieldCollectionData
            key={"FieldCollectionData"}
            label={strings.SecondLabel}
            manageBtnLabel={strings.Manage}
            onChanged={(value) => { this.setState({ sampleData: value }); }}
            panelHeader={strings.Header}
            context={this.props.context}    
            executeFiltering={(searchFilter: string, item: any) => {
              return item.URLField.indexOf(searchFilter) !== -1;
            }}
            fields={[
              { id: "PeoplePickerField", title: "PeoplePicker field", type: CustomCollectionFieldType.peoplepicker },
              { id: "URLField", title: "URL field", type: CustomCollectionFieldType.url },
              { id: "DateField", title: "Date field", type: CustomCollectionFieldType.date },
              { id: "CustomField", title: "Custom field", type: CustomCollectionFieldType.custom, onCustomRender: this._fieldCustomRenderer }
            ]}
            value={this.state.sampleData}
          />
        </div>
      </section>
    );
  }

  private _fieldCustomRenderer = (field: ICustomCollectionField, value: any, onUpdate: (fieldId: string, value: any) => void, item: any, rowUniqueId: string, onCustomFieldValidation: (fieldId: string, errorMessage: string) => void) => {
    if (!value) {
      value = JSON.stringify({ "sliderValue": "" });
    }

    const v = JSON.parse(value);

    return (
      <div>
        <Icon iconName="Emoji2" />
        <Slider 
          min={0} 
          max={100} 
          step={5}
          value={v.sliderValue}
          onChange={(value) => { onUpdate(field.id, JSON.stringify({ "sliderValue": value })) }}
          />
      </div>
    );
  }
}
