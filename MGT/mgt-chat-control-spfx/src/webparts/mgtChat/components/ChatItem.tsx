import * as React from 'react';
import * as strings from 'MgtChatWebPartStrings';
import { Chat, AadUserConversationMember } from '@microsoft/microsoft-graph-types';

export interface ChatInteractionProps {
  onSelected: (selected: Chat) => void;
}

interface IChatItemState {
  currentUserId: string;
}

interface IChatItemProps {
  chat: Chat;
}

export default class ChatItem extends React.Component<IChatItemProps & ChatInteractionProps, IChatItemState> {
  constructor(props: IChatItemProps & ChatInteractionProps) {
    super(props);

    this.state = {
      currentUserId: ''
    };
  }

  public render(): React.ReactElement<IChatItemProps> {
    const { chat } = this.props;
    const { currentUserId } = this.state as IChatItemState;

    return (
      <li onClick={() => this.props.onSelected(chat)}>
        {this.inferTitle(chat, currentUserId)}
      </li>
    );
  }

  private inferTitle(chat: Chat, currentUserId: string): string {
    if (chat.chatType === 'oneOnOne' && chat.members) {
      const other = chat.members.find(m => (m as AadUserConversationMember).userId !== currentUserId);
      return other
        ? `Chat with ${other?.displayName || (other as AadUserConversationMember)?.email || other?.id}`
        : 'Chat with myself';
    }
    return chat.topic || chat.chatType || strings.UnknownChatType;
  }
}