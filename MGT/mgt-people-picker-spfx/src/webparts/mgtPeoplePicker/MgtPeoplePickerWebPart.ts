import * as React from 'react';
import * as ReactDom from 'react-dom';
import { Version } from '@microsoft/sp-core-library';
import { BaseClientSideWebPart } from '@microsoft/sp-webpart-base';
import { Providers, SharePointProvider } from "@microsoft/mgt-spfx";

import MgtPeoplePicker from './components/MgtPeoplePicker';
import { IMgtPeoplePickerProps } from './components/IMgtPeoplePickerProps';

export interface IMgtPeoplePickerWebPartProps {
}

export default class MgtPeoplePickerWebPart extends BaseClientSideWebPart<IMgtPeoplePickerWebPartProps> {

  public render(): void {
    const element: React.ReactElement<IMgtPeoplePickerProps> = React.createElement(
      MgtPeoplePicker,
      {
      }
    );

    ReactDom.render(element, this.domElement);
  }

  protected async onInit(): Promise<void> {
		// Initialize the MGT Provider
		if (!Providers.globalProvider) {
			Providers.globalProvider = new SharePointProvider(this.context as any);
		}
	}

  protected onDispose(): void {
    ReactDom.unmountComponentAtNode(this.domElement);
  }

  protected get dataVersion(): Version {
    return Version.parse('1.0');
  }
}
