import * as React from 'react';
import type { IPeoplePickerSampleProps } from './IPeoplePickerSampleProps';
import {
  PeoplePicker,
  PrincipalType
} from "@pnp/spfx-controls-react/lib/PeoplePicker";

export default class PeoplePickerSample extends React.Component<IPeoplePickerSampleProps, {}> {
  public render(): React.ReactElement<IPeoplePickerSampleProps> {

    return (
      <div>
        <div>Sample to use PeoplePicker</div>
        <div>
          <PeoplePicker
            context={this.props.context as any}
            titleText="People Picker for users"
            personSelectionLimit={5}
            ensureUser={true}
            principalTypes={[PrincipalType.User]}
            onChange={this._getPeoplePickerItems} />
        </div>
        <div>
          <PeoplePicker
            context={this.props.context as any}
            titleText="People Picker for groups"
            personSelectionLimit={5}
            ensureUser={true}
            principalTypes={[PrincipalType.SharePointGroup, PrincipalType.SecurityGroup]}
            onChange={this._getPeoplePickerItems} />
        </div>
      </div>
    );
  }

  private _getPeoplePickerItems(items: any[]) {
    console.log('Items:', items);
  }
}
