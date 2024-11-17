import * as React from 'react';
import styles from './SecurityTrimmedControlSample.module.scss';
import * as strings from 'SecurityTrimmedControlSampleWebPartStrings';
import type { ISecurityTrimmedControlSampleProps } from './ISecurityTrimmedControlSampleProps';
import { SecurityTrimmedControl, PermissionLevel } from "@pnp/spfx-controls-react/lib/SecurityTrimmedControl";
import { SPPermission } from '@microsoft/sp-page-context';

export default class SecurityTrimmedControlSample extends React.Component<ISecurityTrimmedControlSampleProps> {
  public render(): React.ReactElement<ISecurityTrimmedControlSampleProps> {
    const { context, siteUrl, listUrl, itemId } = this.props;

    return (
      <section className={styles.securityTrimmedControlSample}>
        <div>
          <h3>{strings.Title}</h3>
          <h4>{strings.BasicInstanceTitle}</h4>
          <SecurityTrimmedControl
            context={context as any}
            level={PermissionLevel.currentWeb}
            permissions={[SPPermission.viewPages]}>
            <div>
              {strings.CanViewPages}
            </div>
          </SecurityTrimmedControl>

          <h4>{strings.EditListItemsInstanceTitle}</h4>
          <SecurityTrimmedControl
            context={context as any}
            level={PermissionLevel.currentWeb}
            permissions={[SPPermission.editListItems]}>
            <div>
              {strings.CanEditListItems}
            </div>
          </SecurityTrimmedControl>

          <h4>{strings.ManagePermissionsInstanceTitle}</h4>
          <SecurityTrimmedControl
            context={context as any}
            level={PermissionLevel.currentWeb}
            permissions={[SPPermission.managePermissions]}>
            <div>
              {strings.CanManagePermissions}
            </div>
          </SecurityTrimmedControl>

          <h4>{strings.ManageRemotePermissionsInstanceTitle}</h4>
          <SecurityTrimmedControl
            context={context as any}
            level={PermissionLevel.remoteWeb}
            permissions={[SPPermission.managePermissions]}
            remoteSiteUrl={siteUrl}>
            <div>
              {strings.CanManageRemotePermissions}
            </div>
          </SecurityTrimmedControl>

          <h4>{strings.EditRemoteListItemsInstanceTitle}</h4>
          <SecurityTrimmedControl
            context={context as any}
            level={PermissionLevel.remoteListOrLib}
            permissions={[SPPermission.editListItems]}
            remoteSiteUrl={siteUrl}
            relativeLibOrListUrl={listUrl} >
            <div>
              {strings.CanEditRemoteListItems}
            </div>
          </SecurityTrimmedControl>

          <h4>{strings.EnumeratePermissionsRemoteListItemInstanceTitle}</h4>
          <SecurityTrimmedControl
            context={context as any}
            level={PermissionLevel.remoteListItem}
            permissions={[SPPermission.enumeratePermissions]}
            remoteSiteUrl={siteUrl}
            relativeLibOrListUrl={listUrl}
            itemId={itemId}>
            <div>
              {strings.CanEnumeratePermissionsOnRemoteListItem}
            </div>
          </SecurityTrimmedControl>

          <h4>{strings.ShowLoadingInstanceTitle}</h4>
          <SecurityTrimmedControl
            context={context as any}
            level={PermissionLevel.remoteListOrLib}
            permissions={[SPPermission.viewPages]}
            showLoadingAnimation={true}
            // This list does not exist, so the control will show the loading animation trying to get the list
            relativeLibOrListUrl='/value-to-show-loading'>
            <div>
              {strings.CanViewPages}
            </div>
          </SecurityTrimmedControl>

          <h4>{strings.NoPermissionsInstanceTitle}</h4>
          <SecurityTrimmedControl
            context={context as any}
            level={PermissionLevel.remoteWeb}
            permissions={[SPPermission.managePermissions]}>
            <div>
              {strings.CanManagePermissions}
            </div>
          </SecurityTrimmedControl>

          <h4>{strings.NoPermissionsControlInstanceTitle}</h4>
          <SecurityTrimmedControl
            context={context as any}
            level={PermissionLevel.remoteWeb}
            permissions={[SPPermission.managePermissions]}
            remoteSiteUrl='nonexistent/site'
            noPermissionsControl={<div className={styles.noPermissions}>{strings.NoPermissions}</div>}>
            <div>
              {strings.CanManagePermissions}
            </div>
          </SecurityTrimmedControl>

        </div>
      </section>
    );
  }
}
