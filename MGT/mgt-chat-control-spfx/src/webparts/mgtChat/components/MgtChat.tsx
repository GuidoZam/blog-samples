import * as React from 'react';
import styles from './MgtChat.module.scss';
import type { IMgtChatProps } from './IMgtChatProps';
import { Get, Login } from '@microsoft/mgt-react';
import { Chat, NewChat } from '@microsoft/mgt-chat';
import { Chat as GraphChat } from '@microsoft/microsoft-graph-types';
import ChatListTemplate from './ChatListTemplate';
import { IMgtChatState } from './IMgtChatState';

export default class MgtChat extends React.Component<IMgtChatProps, IMgtChatState> {
  public render(): React.ReactElement<IMgtChatProps> {
    const {
      chatId,
      showNewChat
    } = this.state;

    return (
      <section className={styles.mgtChat}>
        <div>
          <Login />
        </div>
        <div className="main">
          <div className="chat-selector">
            <Get resource="me/chats?$expand=members" scopes={['Chat.ReadWrite']} cacheEnabled={false}>
              <ChatListTemplate template="default" onSelected={this.chatSelected} />
            </Get>
            Selected chat: {chatId}
            <br />
            <button onClick={() => this.setState({chatId: ''})}>Clear selected chat</button>
            <br />
            <button onClick={() => this.setState({showNewChat: true})}>New Chat</button>
            {showNewChat && (
              <div className="new-chat">
                <NewChat onChatCreated={this.onChatCreated} onCancelClicked={() => this.setState({ showNewChat: false })} mode="auto" />
              </div>
            )}
          </div>
          <div className="chat-pane">
            {chatId && <Chat chatId={chatId} />}
          </div>
        </div>
      </section>
    );
  }

  private chatSelected(e: GraphChat): void {
    this.setState({ chatId: e.id ?? '' });
  }

  private onChatCreated(e: GraphChat): void {
    this.setState({ 
      chatId: e.id ?? '',
      showNewChat: false
    });
  }
}
