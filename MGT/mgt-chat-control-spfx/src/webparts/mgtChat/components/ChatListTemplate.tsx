import * as React from 'react';
import { MgtTemplateProps } from '@microsoft/mgt-react';
import { Chat } from '@microsoft/microsoft-graph-types';
import ChatItem, { ChatInteractionProps } from './ChatItem';

export default class ChatListTemplate extends React.Component<MgtTemplateProps & ChatInteractionProps, {}> {
  public render(): React.ReactElement<MgtTemplateProps> {
    const { value } = this.props.dataContext as { value: Chat[] };
    const chats: Chat[] = value;
    // Select a default chat to display
    // props.onSelected(chats[0]);
    return (
      <ul>
        {chats.map(c => (
          <ChatItem key={c.id} chat={c} onSelected={this.props.onSelected} />
        ))}
      </ul>
    );
  }
}