import * as React from 'react';
import styles from './ListItemCommentsSample.module.scss';
import type { IListItemCommentsSampleProps } from './IListItemCommentsSampleProps';
import { ListItemComments } from '@pnp/spfx-controls-react/lib/ListItemComments';
import { ListItemPicker } from '@pnp/spfx-controls-react/lib/ListItemPicker';
import { IListItemCommentsSampleState } from './IListItemCommentsSampleState';

export default class ListItemCommentsSample extends React.Component<IListItemCommentsSampleProps, IListItemCommentsSampleState> {
  constructor (props: IListItemCommentsSampleProps) {
    super(props);
    
    this.state = {
      listItemId: ""
    };
  }

  public render(): React.ReactElement<IListItemCommentsSampleProps> {

    const { listId, context } = this.props;
    const { listItemId } = this.state;

    console.log("Render!");
    console.log(listItemId);

    // const commentsControl = (listItemId && listItemId.length > 0) ? <ListItemComments
    //   //webUrl='{"https://567mb2.sharepoint.com/sites/MainCommunication"}'
    //   listId={listId}
    //   itemId={listItemId}
    //   serviceScope={context.serviceScope}
    //   numberCommentsPerPage={10}
    // /> : undefined;

    return (
      <section className={styles.listItemCommentsSample}>
        <div>
          <h3>Welcome to SharePoint Framework!</h3>
          <div>
          <ListItemPicker
            listId={listId}
            //defaultSelectedItems={listItemId ? [listItemId] : []}
            columnInternalName='Title'
            keyColumnInternalName='Id'
            orderBy={"Title"}
            itemLimit={1}
            onSelectedItem={this.onSelectedItem}
            context={context} />
          </div>
          <div>
            <ListItemComments
              //webUrl='{"https://567mb2.sharepoint.com/sites/MainCommunication"}'
              listId={listId}
              itemId={listItemId}
              serviceScope={context.serviceScope}
              numberCommentsPerPage={10}
            />
          </div>
        </div>
      </section>
    );
  }

  private onSelectedItem(data: { key: string; name: string }[]): void {
    this.setState({
      listItemId: data.length > 0 ? data[0].key.toString() : ""
    });
  }
}
