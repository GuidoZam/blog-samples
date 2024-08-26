import * as React from 'react';
import styles from './ListPickerSample.module.scss';
import type { IListPickerSampleProps } from './IListPickerSampleProps';
import * as strings from 'ListPickerSampleWebPartStrings';
import { ListPicker } from "@pnp/spfx-controls-react/lib/ListPicker";
import { LibsOrderBy } from '@pnp/spfx-controls-react/lib/services/ISPService';
import { IconButton } from '@fluentui/react';
import { IListPickerSampleState } from './IListPickerSampleState';

export default class ListPickerSample extends React.Component<IListPickerSampleProps, IListPickerSampleState> {
  constructor(props: IListPickerSampleProps) {
    super(props);

    this.state = {
      refreshLists: false
    };
  }

  public render(): React.ReactElement<IListPickerSampleProps> {

    return (
      <div className={styles.listPickerSample}>
        <h3>{strings.Title}</h3>
        <div>
          <div>
            <h4 className={styles.sectionTitle}>
              <span>{strings.BasicUsage}</span>
            </h4>
            <ListPicker
              context={this.props.context}
              onSelectionChanged={this.onListSelected} />
          </div>
          <div>
            <h4 className={styles.sectionTitle}>
              <span>{strings.HideHiddenLists}</span>
            </h4>
            <ListPicker
              context={this.props.context}
              includeHidden={false}
              onSelectionChanged={this.onListSelected} />
          </div>
          <div>
            <h4 className={styles.sectionTitle}>
              <span>{strings.OrderById}</span>
            </h4>
            <ListPicker
              context={this.props.context}
              orderBy={LibsOrderBy.Id}
              onSelectionChanged={this.onListSelected} />
          </div>
          <div>
            <h4 className={styles.sectionTitle}>
              <span>{strings.MultiSelection}</span>
            </h4>
            <ListPicker
              context={this.props.context}
              multiSelect={true}
              onSelectionChanged={this.onListSelected} />
          </div>
          <div>
            <h4 className={styles.sectionTitle}>
              <span>{strings.CustomStrings.Title}</span>
            </h4>
            <ListPicker
              context={this.props.context}
              label={strings.CustomStrings.Label}
              placeHolder={strings.CustomStrings.PlaceHolder}
              onSelectionChanged={this.onListSelected} />
          </div>
          <div>
            <h4 className={styles.sectionTitle}>
              <span>{strings.FilterByContentType}</span>
            </h4>
            <ListPicker
              context={this.props.context}
              contentTypeId={'0x0101'}
              onSelectionChanged={this.onListSelected} />
          </div>
          <div>
            <h4 className={styles.sectionTitle}>
              <span>{strings.RefreshToggle}</span>
            </h4>
            <ListPicker
              context={this.props.context}
              refreshToggle={this.state.refreshLists}
              onSelectionChanged={this.onListSelected} />
            <IconButton iconProps={{ iconName: 'Refresh' }} onClick={() => {
              this.setState({
                refreshLists: !this.state.refreshLists
              });
            }} />
          </div>
        </div>
      </div>
    );
  }

  private onListSelected(lists: string | string[]): void {
    console.log("Lists:", lists);
  }
}
