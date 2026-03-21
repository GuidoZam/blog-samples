import * as React from 'react';
import styles from './ListItemCommentSample.module.scss';
import type { IListItemCommentSampleProps } from './IListItemCommentSampleProps';
import {
  ListPicker,
  ListItemPicker
} from '@pnp/spfx-controls-react';
import { ListItemComments } from '@pnp/spfx-controls-react/lib/ListItemComments';
import { IListInfo } from '@pnp/sp/lists';
import * as strings from 'ListItemCommentSampleWebPartStrings';

export interface IListItemCommentSampleState {
  selectedList: IListInfo | undefined;
  selectedListId: string | undefined;
  selectedItemId: string | undefined;
}

export default class ListItemCommentSample extends React.Component<IListItemCommentSampleProps, IListItemCommentSampleState> {
  
  constructor(props: IListItemCommentSampleProps) {
    super(props);
    
    this.state = {
      selectedList: undefined,
      selectedListId: undefined,
      selectedItemId: undefined
    };
  }
  
    private _onListPickerChange = (newValue: string | string[]): void => {
      // newValue is either a string (list id) or string[] (list ids)
      let selectedListId: string | undefined;
      if (Array.isArray(newValue)) {
        selectedListId = newValue.length > 0 ? newValue[0] : undefined;
      } else {
        selectedListId = newValue;
      }

      if (selectedListId) {
        // Find the selected list info using the id
        // ListPicker does not provide the list object, so we only store the id
        this.setState({
          selectedList: undefined, // Optionally, fetch list info if needed
          selectedListId,
          selectedItemId: undefined // Reset item selection when list changes
        });
      } else {
        this.setState({
          selectedList: undefined,
          selectedListId: undefined,
          selectedItemId: undefined
        });
      }
    }
  
  private _onListItemPickerChange = (item: any): void => {
    if (item && item.length > 0) {
      this.setState({
        selectedItemId: item[0].key
      });
    } else {
      this.setState({
        selectedItemId: undefined
      });
    }
  }

  public render(): React.ReactElement<IListItemCommentSampleProps> {
    const { context } = this.props;
    const { selectedListId, selectedItemId } = this.state;

    return (
      <section className={styles.listItemCommentSample}>
        <div className={styles.welcome}>
          <h2>{strings.Title}</h2>
          <p>{strings.Description}</p>
        </div>

        <div style={{ marginBottom: '20px' }}>
          <h3>{strings.Step1Title}</h3>
          <ListPicker
            context={context as any}
            label={strings.ListPickerLabel}
            placeHolder={strings.ListPickerPlaceholder}
            baseTemplate={100}
            includeHidden={false}
            multiSelect={false}
            onSelectionChanged={this._onListPickerChange}
          />
        </div>

        {selectedListId && (
          <div style={{ marginBottom: '20px' }}>
            <h3>{strings.Step2Title}</h3>
            <ListItemPicker
              key={selectedListId}
              context={context as any}
              listId={selectedListId}
              columnInternalName="Title"
              keyColumnInternalName="ID"
              itemLimit={1}
              onSelectedItem={this._onListItemPickerChange}
              placeholder={strings.ListItemPickerPlaceholder}
              filter=""
              substringSearch={true}
            />
          </div>
        )}

        {selectedItemId && (
          <div style={{ marginBottom: '20px' }}>
            <h3>{strings.Step3Title}</h3>
            <ListItemComments
              listId={selectedListId!}
              itemId={selectedItemId}
              label={strings.ListItemCommentsLabel}
              serviceScope={context.serviceScope as any}
            />
          </div>
        )}
      </section>
    );
  }
}
