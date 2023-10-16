import * as React from 'react';
import * as ReactDom from 'react-dom';
import { Version } from '@microsoft/sp-core-library';
import {
  type IPropertyPaneConfiguration
} from '@microsoft/sp-property-pane';
import { BaseClientSideWebPart } from '@microsoft/sp-webpart-base';

import * as strings from 'TenantSettingsSampleWebPartStrings';
import TenantSettingsSample from './components/TenantSettingsSample';
import { ITenantSettingsSampleProps } from './components/ITenantSettingsSampleProps';
import { SettingsService } from '../../services/SettingsService';

export interface ITenantSettingsSampleWebPartProps {
}

export default class TenantSettingsSampleWebPart extends BaseClientSideWebPart<ITenantSettingsSampleWebPartProps> {
	private _targetUrl: string | undefined;
  
	protected async onInit(): Promise<void> {
		const settingsService = this.context.serviceScope.consume(
			SettingsService.serviceKey
		);

		// Get the targetUrl from the tenant settings
    this._targetUrl = await settingsService.GetTargetUrl();
	}

	public render(): void {
		const element: React.ReactElement<ITenantSettingsSampleProps> =
			React.createElement(
        TenantSettingsSample,
        {
          targetUrl: this._targetUrl
        });

		ReactDom.render(element, this.domElement);
	}

	protected onDispose(): void {
		ReactDom.unmountComponentAtNode(this.domElement);
	}

	protected get dataVersion(): Version {
		return Version.parse("1.0");
	}

	protected getPropertyPaneConfiguration(): IPropertyPaneConfiguration {
		return {
			pages: [
				{
					header: {
						description: strings.PropertyPaneDescription,
					},
					groups: [
						{
							groupName: strings.BasicGroupName,
							groupFields: [],
						},
					],
				},
			],
		};
	}
}
