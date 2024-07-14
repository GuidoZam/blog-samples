import * as React from 'react';
import * as ReactDom from 'react-dom';
import { Version } from '@microsoft/sp-core-library';
import { BaseClientSideWebPart } from '@microsoft/sp-webpart-base';

import MgtLocalization from './components/MgtLocalization';
import { IMgtLocalizationProps } from './components/IMgtLocalizationProps';
import { Providers, SharePointProvider } from "@microsoft/mgt-spfx";
import { LocalizationHelper } from '@microsoft/mgt-react';

export interface IMgtLocalizationWebPartProps {
}

export default class MgtLocalizationWebPart extends BaseClientSideWebPart<IMgtLocalizationWebPartProps> {

  public render(): void {
    const element: React.ReactElement<IMgtLocalizationProps> = React.createElement(
      MgtLocalization,
      {}
    );

    ReactDom.render(element, this.domElement);
  }

  protected async onInit(): Promise<void> {
		// Initialize the MGT Provider
		if (!Providers.globalProvider) {
			Providers.globalProvider = new SharePointProvider(this.context as any);
		}

    LocalizationHelper.strings = {
			_components: {
				"mgt-react-people-picker": {
					inputPlaceholderText: "Ahoy! Do the search to find yer mateys",
				},
				"people-picker": {
					inputPlaceholderText: "Ahoy! Do the search to find yer mateys",
				},
				"mgt-spfx-people-picker": {
					inputPlaceholderText: "Ahoy! Do the search to find yer mateys",
				},
				"mgt-people-picker": {
					inputPlaceholderText: "Ahoy! Do the search to find yer mateys",
				},
			},
		};
	}

  protected onDispose(): void {
    ReactDom.unmountComponentAtNode(this.domElement);
  }

  protected get dataVersion(): Version {
    return Version.parse('1.0');
  }
}
