import * as React from 'react';
import * as ReactDom from 'react-dom';
import { Version } from '@microsoft/sp-core-library';
import {
  type IPropertyPaneConfiguration,
  PropertyPaneToggle,
} from '@microsoft/sp-property-pane';
import { BaseClientSideWebPart } from '@microsoft/sp-webpart-base';

import * as strings from 'PnPProgressSampleWebPartStrings';
import PnPProgressSample from './components/PnPProgressSample';
import { IPnPProgressSampleProps } from './components/IPnPProgressSampleProps';

export interface IPnPProgressSampleWebPartProps {
	showProgress: boolean;
	showIndeterminateOverallProgress: boolean;
	hideNotStartedActions: boolean;
}

export default class PnPProgressSampleWebPart extends BaseClientSideWebPart<IPnPProgressSampleWebPartProps> {

  public render(): void {
    const element: React.ReactElement<IPnPProgressSampleProps> = React.createElement(
      PnPProgressSample,
      {
        showProgress: this.properties.showProgress,
        showIndeterminateOverallProgress: this.properties.showIndeterminateOverallProgress,
        hideNotStartedActions: this.properties.hideNotStartedActions,
      }
    );

    ReactDom.render(element, this.domElement);
  }

  protected onDispose(): void {
    ReactDom.unmountComponentAtNode(this.domElement);
  }

  protected get dataVersion(): Version {
    return Version.parse('1.0');
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
							groupFields: [
								PropertyPaneToggle("showProgress", {
									label: strings.ShowProgressLabel
								}),
								PropertyPaneToggle("showIndeterminateOverallProgress", {
									label: strings.ShowIndeterminateOverallProgressFieldLabel
								}),
								PropertyPaneToggle("hideNotStartedActions", {
									label: strings.HideNotStartedActionsFieldLabel,
								}),
							],
						},
					],
				},
			],
		};
  }
}
