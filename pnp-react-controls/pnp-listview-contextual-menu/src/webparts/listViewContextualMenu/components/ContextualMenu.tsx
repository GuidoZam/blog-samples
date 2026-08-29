import * as React from 'react';
import { IconButton } from '@fluentui/react/lib/Button';
import { ContextualMenuItemType, IContextualMenuItem } from '@fluentui/react/lib/ContextualMenu';
import { IContextualMenuProps } from './IContextualMenuProps';
import styles from './ContextualMenu.module.scss';

export class ContextualMenu extends React.Component<IContextualMenuProps, {}> {

  public constructor(props: IContextualMenuProps) {
    super(props);
  }

  public render(): React.ReactElement<IContextualMenuProps> {
    const menuItems: IContextualMenuItem[] = [
      {
        key: 'view',
        name: 'View Details',
        iconProps: { iconName: 'View' },
        onClick: () => this.handleClick('View Details', this.props.item)
      },
      {
        key: 'edit',
        name: 'Edit Item',
        iconProps: { iconName: 'Edit' },
        onClick: () => this.handleClick('Edit Item', this.props.item)
      },
      {
        key: 'divider_1',
        itemType: ContextualMenuItemType.Divider
      },
      {
        key: 'advanced',
        name: 'Advanced Options',
        iconProps: { iconName: 'Settings' },
        itemType: ContextualMenuItemType.Header
      },
      {
        key: 'share',
        name: 'Share',
        iconProps: { iconName: 'Share' },
        subMenuProps: {
          items: [
            {
              key: 'email',
              name: 'Email',
              iconProps: { iconName: 'Mail' },
              onClick: () => this.handleClick('Share via Email', this.props.item)
            },
            {
              key: 'teams',
              name: 'Teams',
              iconProps: { iconName: 'TeamsLogo' },
              onClick: () => this.handleClick('Share in Teams', this.props.item)
            }
          ]
        }
      },
      {
        key: 'copy',
        name: 'Copy Link',
        iconProps: { iconName: 'Link' },
        onClick: () => this.handleClick('Copy Link', this.props.item)
      },
      {
        key: 'divider_2',
        itemType: ContextualMenuItemType.Divider
      },
      {
        key: 'delete',
        name: 'Delete',
        iconProps: { iconName: 'Delete' },
        onClick: () => this.handleClick('Delete', this.props.item),
        disabled: this.props.item.Status === 'Completed'
      }
    ];

    return (
      <div className={styles.ecb}>
        <IconButton
          id={`ContextualMenuButton_${this.props.item.ID}`}
          className={styles.ecbbutton}
          menuIconProps={{ iconName: 'MoreVertical' }}
          menuProps={{
            shouldFocusOnMount: true,
            items: menuItems
          }}
        />
      </div>
    );
  }

  private handleClick = (action: string, item: any): void => {
    console.log(`${action} clicked for:`, item);
    if (this.props.onAction) {
      this.props.onAction(action, item);
    }
    alert(`${action} clicked for: ${item.Title}`);
  }
}
