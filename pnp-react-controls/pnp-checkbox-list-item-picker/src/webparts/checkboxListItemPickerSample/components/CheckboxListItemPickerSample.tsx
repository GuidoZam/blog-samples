import * as React from 'react';
import styles from './CheckboxListItemPickerSample.module.scss';
import type { ICheckboxListItemPickerSampleProps } from './ICheckboxListItemPickerSampleProps';
import { escape } from '@microsoft/sp-lodash-subset';
import { ComboBoxListItemPicker } from '@pnp/spfx-controls-react/lib/ListItemPicker';
import { Label } from '@fluentui/react/lib/Label';
import { Separator } from '@fluentui/react/lib/Separator';
import { MessageBar, MessageBarType } from '@fluentui/react/lib/MessageBar';

export interface IComboBoxListItemPickerSampleState {
  selectedItems: any[];
  selectedMultipleItems: any[];
  selectedFilteredItems: any[];
  selectedDefaultItems: any[];
  selectedLimitedItems: any[];
  selectedDisabledItems: any[];
}

export default class CheckboxListItemPickerSample extends React.Component<ICheckboxListItemPickerSampleProps, IComboBoxListItemPickerSampleState> {

  constructor(props: ICheckboxListItemPickerSampleProps) {
    super(props);

    this.state = {
      selectedItems: [],
      selectedMultipleItems: [],
      selectedFilteredItems: [],
      selectedDefaultItems: [],
      selectedLimitedItems: [],
      selectedDisabledItems: []
    };
  }

  private _onSelectionChanged = (items: any[]): void => {
    console.log('Basic selection changed:', items);
    this.setState({ selectedItems: items });
  };

  private _onMultipleSelectionChanged = (items: any[]): void => {
    console.log('Multiple selection changed:', items);
    this.setState({ selectedMultipleItems: items });
  };

  private _onFilteredSelectionChanged = (items: any[]): void => {
    console.log('Filtered selection changed:', items);
    this.setState({ selectedFilteredItems: items });
  };

  private _onDefaultSelectionChanged = (items: any[]): void => {
    console.log('Default selection changed:', items);
    this.setState({ selectedDefaultItems: items });
  };

  private _onLimitedSelectionChanged = (items: any[]): void => {
    console.log('Limited selection changed:', items);
    this.setState({ selectedLimitedItems: items });
  };

  private _onDisabledSelectionChanged = (items: any[]): void => {
    console.log('Disabled selection changed:', items);
    this.setState({ selectedDisabledItems: items });
  };

  public render(): React.ReactElement<ICheckboxListItemPickerSampleProps> {
    const {
      context,
      listId,
      strings
    } = this.props;

    // Check if a list has been selected in the property pane
    if (!listId) {
      return (
        <section className={styles.checkboxListItemPickerSample}>
          <div className={styles.welcome}>
            <h2>{strings.WebPartTitle}</h2>
          </div>
          <MessageBar messageBarType={MessageBarType.info}>
            {strings.NoListSelectedMessage}
          </MessageBar>
        </section>
      );
    }

    return (
      <section className={styles.checkboxListItemPickerSample}>
        <div className={styles.welcome}>
          <h2>{strings.WebPartTitle}</h2>
        </div>

        <div className={styles.section}>

          {/* Basic Single Selection */}
          <div className={styles.example}>
            <Label>{strings.BasicSingleSelectionLabel}</Label>
            <p>{strings.BasicSingleSelectionDescription}</p>
            <ComboBoxListItemPicker
              listId={listId}
              columnInternalName='Title'
              keyColumnInternalName='ID'
              onSelectedItem={this._onSelectionChanged}
              webUrl={context.pageContext.web.absoluteUrl}
              spHttpClient={context.spHttpClient as any}
              label={strings.SelectAnItem}
              suggestionsHeaderText={strings.AvailableItems}
              noResultsFoundText={strings.NoItemsFound}
            />
            {this.state.selectedItems.length > 0 && (
              <div className={styles.selectedItems}>
                <strong>{strings.Selected}</strong> {this.state.selectedItems.map(item => item.Title || item.FileLeafRef || `Item ${item.ID}`).join(', ')}
              </div>
            )}
          </div>

          <Separator />

          {/* Multiple Selection */}
          <div className={styles.example}>
            <Label>{strings.MultipleSelectionLabel}</Label>
            <p>{strings.MultipleSelectionDescription}</p>
            <ComboBoxListItemPicker
              listId={listId}
              columnInternalName='Title'
              keyColumnInternalName='ID'
              onSelectedItem={this._onMultipleSelectionChanged}
              webUrl={context.pageContext.web.absoluteUrl}
              spHttpClient={context.spHttpClient as any}
              multiSelect={true}
              label={strings.SelectMultipleItems}
              suggestionsHeaderText={strings.ChooseItemsMultiple}
              noResultsFoundText={strings.NoMatchingItemsFound}
            />
            {this.state.selectedMultipleItems.length > 0 && (
              <div className={styles.selectedItems}>
                <strong>{strings.SelectedCount.replace('{0}', this.state.selectedMultipleItems.length.toString())}:</strong><br />
                {this.state.selectedMultipleItems.map(item => item.Title || item.FileLeafRef || `Item ${item.ID}`).join(', ')}
              </div>
            )}
          </div>

          <Separator />

          {/* With Filter */}
          <div className={styles.example}>
            <Label>{strings.ODataFilterLabel}</Label>
            <p>{strings.ODataFilterDescription}</p>
            <ComboBoxListItemPicker
              listId={listId}
              columnInternalName='Title'
              keyColumnInternalName='ID'
              filter="substringof('different', Title)"
              onSelectedItem={this._onFilteredSelectionChanged}
              webUrl={context.pageContext.web.absoluteUrl}
              spHttpClient={context.spHttpClient as any}
              label={strings.SelectItemsContaining}
              suggestionsHeaderText={strings.AvailableItemsFiltered}
              noResultsFoundText={strings.NoItemsFoundFilter}
            />
            {this.state.selectedFilteredItems.length > 0 && (
              <div className={styles.selectedItems}>
                <strong>{strings.SelectedFilteredItem}</strong> {this.state.selectedFilteredItems.map(item => item.Title || item.FileLeafRef || `Item ${item.ID}`).join(', ')}
              </div>
            )}
          </div>

          <Separator />

          {/* With Default Selection */}
          <div className={styles.example}>
            <Label>{strings.DefaultSelectionLabel}</Label>
            <p>{strings.DefaultSelectionDescription}</p>
            <ComboBoxListItemPicker
              listId={listId}
              columnInternalName='Title'
              keyColumnInternalName='ID'
              defaultSelectedItems={[{ ID: 1 }, { ID: 3 }]}
              onSelectedItem={this._onDefaultSelectionChanged}
              webUrl={context.pageContext.web.absoluteUrl}
              spHttpClient={context.spHttpClient as any}
              multiSelect={true}
              label={strings.PreSelectedItemsExample}
              suggestionsHeaderText={strings.ItemsPreSelected}
              noResultsFoundText={strings.NoItemsAvailable}
            />
            {this.state.selectedDefaultItems.length > 0 && (
              <div className={styles.selectedItems}>
                <strong>{strings.CurrentlySelected}</strong> {this.state.selectedDefaultItems.map(item => item.Title || item.FileLeafRef || `Item ${item.ID}`).join(', ')}
              </div>
            )}
          </div>

          <Separator />

          {/* With Item Limit */}
          <div className={styles.example}>
            <Label>{strings.ItemLimitLabel}</Label>
            <p>{strings.ItemLimitDescription}</p>
            <ComboBoxListItemPicker
              listId={listId}
              columnInternalName='Title'
              keyColumnInternalName='ID'
              itemLimit={3}
              orderBy='Title desc'
              onSelectedItem={this._onLimitedSelectionChanged}
              webUrl={context.pageContext.web.absoluteUrl}
              spHttpClient={context.spHttpClient as any}
              label={strings.LimitedSelection}
              suggestionsHeaderText={strings.TopItemsAZ}
              noResultsFoundText={strings.NoMatchingItemsTop5}
            />
            {this.state.selectedLimitedItems.length > 0 && (
              <div className={styles.selectedItems}>
                <strong>{strings.SelectedFromLimitedList}</strong> {this.state.selectedLimitedItems.map(item => item.Title || item.FileLeafRef || `Item ${item.ID}`).join(', ')}
              </div>
            )}
          </div>

          <Separator />

          {/* Disabled State */}
          <div className={styles.example}>
            <Label>{strings.DisabledStateLabel}</Label>
            <p>{strings.DisabledStateDescription}</p>
            <ComboBoxListItemPicker
              listId={listId}
              columnInternalName='Title'
              keyColumnInternalName='ID'
              disabled={true}
              onSelectedItem={this._onDisabledSelectionChanged}
              webUrl={context.pageContext.web.absoluteUrl}
              spHttpClient={context.spHttpClient as any}
              label={strings.DisabledPicker}
              suggestionsHeaderText={strings.PickerDisabled}
              noResultsFoundText={strings.PickerIsDisabled}
            />
          </div>
        </div>
      </section>
    );
  }
}
