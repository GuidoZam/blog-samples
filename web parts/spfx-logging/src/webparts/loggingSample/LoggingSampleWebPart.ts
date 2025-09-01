import * as React from 'react';
import * as ReactDom from 'react-dom';
import { Version } from '@microsoft/sp-core-library';
import { BaseClientSideWebPart } from '@microsoft/sp-webpart-base';
import LoggingSample from './components/LoggingSample';
import { ILoggingSampleProps } from './components/ILoggingSampleProps';

export interface ILoggingSampleWebPartProps {
  description: string;
}

export default class LoggingSampleWebPart extends BaseClientSideWebPart<ILoggingSampleWebPartProps> {

  public render(): void {
    const element: React.ReactElement<ILoggingSampleProps> = React.createElement(
      LoggingSample,
      {}
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
