import * as React from 'react';
import * as ReactDom from 'react-dom';
import { Version } from '@microsoft/sp-core-library';
import { BaseClientSideWebPart } from '@microsoft/sp-webpart-base';
import { IReadonlyTheme } from '@microsoft/sp-component-base';

//import * as strings from 'ApprovalsManagementWebPartStrings';
import ApprovalsManagement from './components/ApprovalsManagement';
import { IApprovalsManagementProps } from './components/IApprovalsManagementProps';
import { IApprovalsService } from '../../services/IApprovalsService';
import { ApprovalsService } from '../../services/ApprovalsService';
import { PropertyPaneToggle } from '@microsoft/sp-property-pane';

export interface IApprovalsManagementWebPartProps {
  useBetaEndpoint: boolean;
}

export default class ApprovalsManagementWebPart extends BaseClientSideWebPart<IApprovalsManagementWebPartProps> {

  private _approvalsService: IApprovalsService;

  public render(): void {
    const element: React.ReactElement<IApprovalsManagementProps> = React.createElement(
      ApprovalsManagement,
      {
        approvalsService: this._approvalsService
      }
    );

    ReactDom.render(element, this.domElement);
  }

  protected async onInit(): Promise<void> {
    this._approvalsService = this.context.serviceScope.consume(
			ApprovalsService.serviceKey
		);

    this._approvalsService.UseGraphBetaEndpoint = this.properties.useBetaEndpoint;
  }

  protected onThemeChanged(currentTheme: IReadonlyTheme | undefined): void {
    if (!currentTheme) {
      return;
    }

    const {
      semanticColors
    } = currentTheme;

    if (semanticColors) {
      this.domElement.style.setProperty('--bodyText', semanticColors.bodyText || null);
      this.domElement.style.setProperty('--link', semanticColors.link || null);
      this.domElement.style.setProperty('--linkHovered', semanticColors.linkHovered || null);
    }
  }

  protected onDispose(): void {
    ReactDom.unmountComponentAtNode(this.domElement);
  }

  protected get dataVersion(): Version {
    return Version.parse('1.0');
  }

  protected getPropertyPaneConfiguration(): any {
    return {
      pages: [
        {
          header: {
            description: 'Approvals Management'
          },
          groups: [
            {
              groupName: 'Configuration',
              groupFields: [
                PropertyPaneToggle('useBetaEndpoint', {
                  label: 'Use Beta Endpoint'
                })
              ]
            }
          ]
        }
      ]
    };
  }
}
