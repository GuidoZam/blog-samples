import * as React from 'react';
import * as ReactDom from 'react-dom';
import { Version } from '@microsoft/sp-core-library';
import { BaseClientSideWebPart } from '@microsoft/sp-webpart-base';
import PersonalSettings from './components/PersonalSettings';
import { IPersonalSettingsProps } from './components/IPersonalSettingsProps';
import { GraphService } from './services/GraphService';

export interface IPersonalSettingsWebPartProps {
}

export default class PersonalSettingsWebPart extends BaseClientSideWebPart<IPersonalSettingsWebPartProps> {

  public render(): void {
    const graphService = new GraphService(this.context);
    
    const element: React.ReactElement<IPersonalSettingsProps> = React.createElement(
      PersonalSettings,
      {
        graphService: graphService,
        context: this.context
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
}
