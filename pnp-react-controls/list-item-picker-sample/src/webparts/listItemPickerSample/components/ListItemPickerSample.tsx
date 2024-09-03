import * as React from 'react';
import styles from './ListItemPickerSample.module.scss';
import type { IListItemPickerSampleProps } from './IListItemPickerSampleProps';
import { IListItemPickerSampleState } from './IListItemPickerSampleState';
import * as strings from 'ListItemPickerSampleWebPartStrings';
import { ListItemPicker } from '@pnp/spfx-controls-react';
import { ListPicker } from '@pnp/spfx-controls-react';

export default class ListItemPickerSample extends React.Component<IListItemPickerSampleProps, IListItemPickerSampleState> {
  constructor(props: IListItemPickerSampleProps) {
    super(props);

    this.state = {
      selectedList: undefined
    };
  }

  public render(): React.ReactElement<IListItemPickerSampleProps> {
    return (
      <section className={styles.listItemPickerSample}>
        <div>
          <h3>{strings.Title}</h3>
          <div>
            <h4 className={styles.sectionTitle}>
              <span>{strings.TargetList}</span>
            </h4>
            <ListPicker
              context={this.props.context}
              includeHidden={false}
              onSelectionChanged={this.onListSelected} />
          </div>
          {this.state.selectedList &&
          <div>
            <div>
              <h4 className={styles.sectionTitle}>
                <span>{strings.MinimalConfiguration}</span>
              </h4>
              <ListItemPicker
                context={this.props.context}
                listId={this.state.selectedList}
                columnInternalName='Title'
                itemLimit={1}
                onSelectedItem={this.onListItemSelected} />
            </div>
            <div>
              <h4 className={styles.sectionTitle}>
                <span>{strings.DefaultSelectedItems}</span>
              </h4>
              <ListItemPicker
                context={this.props.context}
                listId={this.state.selectedList}
                columnInternalName='Title'
                itemLimit={1}
                onSelectedItem={this.onListItemSelected}
                defaultSelectedItems={[{"key": "custom","name":"Custom list item"}]} />
            </div>
            <div>
              <h4 className={styles.sectionTitle}>
                <span>{strings.DisabledSelectedItems}</span>
              </h4>
              <ListItemPicker
                context={this.props.context}
                listId={this.state.selectedList}
                columnInternalName='Title'
                itemLimit={1}
                onSelectedItem={this.onListItemSelected}
                disabled={true}
                defaultSelectedItems={[{"key": "custom","name":"Custom list item"}]} />
            </div>
            <div>
              <h4 className={styles.sectionTitle}>
                <span>{strings.EnableSuggestions}</span>
              </h4>
              <ListItemPicker
                context={this.props.context}
                listId={this.state.selectedList}
                columnInternalName='Title'
                itemLimit={1}
                onSelectedItem={this.onListItemSelected} 
                enableDefaultSuggestions={true} />
            </div>
            <div>
              <h4 className={styles.sectionTitle}>
                <span>{strings.KeyColumnConfiguration}</span>
              </h4>
              <ListItemPicker
                context={this.props.context} 
                listId={this.state.selectedList}
                columnInternalName='Title'
                keyColumnInternalName='Id'
                itemLimit={1}
                onSelectedItem={this.onListItemSelected}/>
            </div>
            <div>
              <h4 className={styles.sectionTitle}>
                <span>{strings.MultipleSelection}</span>
              </h4>
              <ListItemPicker
                context={this.props.context} 
                listId={this.state.selectedList}
                columnInternalName='Title'
                itemLimit={3}
                onSelectedItem={this.onListItemSelected} />
            </div>
            <div>
              <h4 className={styles.sectionTitle}>
                <span>{strings.CustomStrings.Title}</span>
              </h4>
              <ListItemPicker
                context={this.props.context} 
                listId={this.state.selectedList}
                columnInternalName='Title'
                itemLimit={1}
                onSelectedItem={this.onListItemSelected}
                suggestionsHeaderText={strings.CustomStrings.Header}
                noResultsFoundText={strings.CustomStrings.NoResults}
                placeholder={strings.CustomStrings.PlaceHolder}
                label={strings.CustomStrings.Label} />
            </div>
            <div>
              <h4 className={styles.sectionTitle}>
                <span>{strings.SubstringSearch}</span>
              </h4>
              <ListItemPicker
                context={this.props.context}
                listId={this.state.selectedList}
                columnInternalName='Title'
                itemLimit={1}
                onSelectedItem={this.onListItemSelected}
                substringSearch={true} />
            </div>
            <div>
              <h4 className={styles.sectionTitle}>
                <span>{strings.Filtering}</span>
              </h4>
              <ListItemPicker
                context={this.props.context}
                listId={this.state.selectedList}
                columnInternalName='Title'
                itemLimit={1}
                onSelectedItem={this.onListItemSelected}
                filter="Title eq 'Test 3'" />
            </div>
            <div>
              <h4 className={styles.sectionTitle}>
                <span>{strings.Sorting}</span>
              </h4>
              <ListItemPicker
                context={this.props.context}
                listId={this.state.selectedList}
                columnInternalName='Title'
                itemLimit={1}
                onSelectedItem={this.onListItemSelected}
                orderBy="Title desc" />
            </div>
          </div>}
        </div>
      </section>
    );
  }

  private onListItemSelected(data: { key: string; name: string }[]): void {
    for (const item of data) {
      console.log(`Item value: ${item.key}`);
      console.log(`Item text: ${item.name}`);
    }
  }

  private onListSelected = (list: string): void => {
    this.setState({
      selectedList: list
    });
  }
}
