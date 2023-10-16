import * as React from 'react';
import type { ITenantSettingsSampleProps } from './ITenantSettingsSampleProps';
import { DefaultButton, Label } from '@fluentui/react';
import * as strings from 'TenantSettingsSampleWebPartStrings';

export default class TenantSettingsSample extends React.Component<ITenantSettingsSampleProps, {}> {
  public render(): React.ReactElement<ITenantSettingsSampleProps> {

    return (
      <div>
        <Label>{strings.Description}</Label>
        <DefaultButton 
          text={(this.props.targetUrl ? strings.NavigateButton : strings.NavigateButtonDisabled)} 
          onClick={this.navigateToTargetURL}
          disabled={!this.props.targetUrl} />
      </div>
    );
  }

  private navigateToTargetURL = (): void => {
    window.open(this.props.targetUrl, '_blank');
  }
}
