import * as React from 'react';
import * as strings from 'PnPFieldCollectionDataSampleWebPartStrings';
import styles from './PnPFieldCollectionDataSample.module.scss';
import type { IPnPFieldCollectionDataSampleProps } from './IPnPFieldCollectionDataSampleProps';
import { FieldCollectionData, CustomCollectionFieldType, ICustomCollectionField } from '@pnp/spfx-controls-react/lib/FieldCollectionData';
import { IPnPFieldCollectionDataSampleState } from './IPnPFieldCollectionDataSampleState';
import { Icon, Slider } from '@fluentui/react';

export default class PnPFieldCollectionDataSample extends React.Component<IPnPFieldCollectionDataSampleProps, IPnPFieldCollectionDataSampleState> {
  constructor(props: IPnPFieldCollectionDataSampleProps) {
    super(props);

    this.state = {
      sampleData: [{
        StringField: "String value 1",
        NumberField: 123,
        BooleanField: true,
        DropdownField: "2",
        MultiSelectComboboxField: ["1", "3"],
        FabricIconField: "Rocket",
        PeoplePickerField: "",
        URLField: "https://iamguidozam.blog",
        DateField: new Date(),
        CustomField: JSON.stringify({ "sliderValue": 70 })
      },
      {
        StringField: "String value 2",
        NumberField: 42,
        BooleanField: false,
        DropdownField: "1",
        MultiSelectComboboxField: ["2"],
        FabricIconField: "Permissions",
        PeoplePickerField: "",
        URLField: "https://pnp.github.io",
        DateField: new Date(),
        CustomField: JSON.stringify({ "sliderValue": 30 })
      },
      {
        StringField: "String value 3",
        NumberField: 97,
        BooleanField: false,
        DropdownField: "3",
        MultiSelectComboboxField: ["1", "2"],
        FabricIconField: "FocalPoint",
        PeoplePickerField: "",
        URLField: "https://pnp.github.io/sp-dev-fx-controls-react",
        DateField: new Date(),
        CustomField: JSON.stringify({ "sliderValue": 12 })
      }]
    };
  }

  public render(): React.ReactElement<IPnPFieldCollectionDataSampleProps> {

    return (
      <section className={styles.pnPFieldCollectionDataSample}>
        <div className={styles.title}>
          {strings.Title}
        </div>
        <div>
          <div>
            <FieldCollectionData
              key={"VariousFieldCollectionData"}
              label={strings.VariousFieldTitle}
              panelDescription={strings.VariousFieldDescription}
              manageBtnLabel={strings.Manage}
              onChanged={(value) => { this.setState({ sampleData: value }); }}
              panelHeader={strings.Header}
              context={this.props.context as any}
              itemsPerPage={3}
              fields={[
                { id: "StringField", title: "String field", type: CustomCollectionFieldType.string, required: true },
                { id: "NumberField", title: "Number field", type: CustomCollectionFieldType.number },
                { id: "BooleanField", title: "Boolean field", type: CustomCollectionFieldType.boolean },
                { id: "DropdownField", title: "Dropdown field", type: CustomCollectionFieldType.dropdown, options: [{ key: "1", text: "One" }, { key: "2", text: "Two" }, { key: "3", text: "Three" }] },
                { id: "FabricIconField", title: "FabricIcon field", type: CustomCollectionFieldType.fabricIcon },
              ]}
              value={this.state.sampleData}
            />
          </div>
          <div>
            <FieldCollectionData
              key={"SelectionFieldCollectionData"}
              label={strings.SelectionFieldTitle}
              manageBtnLabel={strings.Manage}
              onChanged={(value) => { this.setState({ sampleData: value }); }}
              panelHeader={strings.Header}
              context={this.props.context as any}
              itemsPerPage={3}
              fields={[
                { id: "DropdownField", title: "Dropdown field", type: CustomCollectionFieldType.dropdown, options: [{ key: "1", text: "One" }, { key: "2", text: "Two" }, { key: "3", text: "Three" }] },
                { id: "MultiSelectComboboxField", title: "MultiSelectDropdown field", type: CustomCollectionFieldType.combobox, multiSelect: true, options: [{ key: "1", text: "Multi One" }, { key: "2", text: "Multi Two" }, { key: "3", text: "Multi Three" }] },
              ]}
              value={this.state.sampleData}
            />
          </div>
          <div>
            <FieldCollectionData
              key={"SearchFieldCollectionData"}
              label={strings.SearchTitle}
              manageBtnLabel={strings.Manage}
              onChanged={(value) => { this.setState({ sampleData: value }); }}
              panelHeader={strings.Header}
              context={this.props.context as any}
              executeFiltering={(searchFilter: string, item: any) => {
                return item.URLField.indexOf(searchFilter) !== -1;
              }}
              fields={[
                { id: "PeoplePickerField", title: "PeoplePicker field", type: CustomCollectionFieldType.peoplepicker },
                { id: "URLField", title: "URL field", type: CustomCollectionFieldType.url },
                { id: "DateField", title: "Date field", type: CustomCollectionFieldType.date }
              ]}
              value={this.state.sampleData}
            />
          </div>
          <div>
            <FieldCollectionData
              key={"SortingFieldCollectionData"}
              label={strings.SortingTitle}
              manageBtnLabel={strings.Manage}
              enableSorting={true}
              noDataMessage={strings.NoData}
              onChanged={(value) => { this.setState({ sampleData: value }); }}
              panelHeader={strings.Header}
              context={this.props.context as any}
              fields={[
                { id: "StringField", title: "String field", type: CustomCollectionFieldType.string, required: true },
                { id: "NumberField", title: "Number field", type: CustomCollectionFieldType.number },
              ]}
              value={this.state.sampleData}
            />
          </div>
          <div>
            <FieldCollectionData
              key={"CustomFieldCollectionData"}
              label={strings.CustomFieldTitle}
              manageBtnLabel={strings.Manage}
              noDataMessage={strings.NoData}
              onChanged={(value) => { this.setState({ sampleData: value }); }}
              panelHeader={strings.Header}
              context={this.props.context as any}
              fields={[
                { id: "StringField", title: "String field", type: CustomCollectionFieldType.string, required: true },
                { id: "CustomField", title: "Custom field", type: CustomCollectionFieldType.custom, onCustomRender: this._fieldCustomRenderer }
              ]}
              value={this.state.sampleData}
            />
          </div>
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
