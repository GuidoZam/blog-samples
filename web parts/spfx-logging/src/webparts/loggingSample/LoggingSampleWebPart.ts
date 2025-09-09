import * as React from 'react';
import * as ReactDom from 'react-dom';
import { Version } from '@microsoft/sp-core-library';
import { BaseClientSideWebPart } from '@microsoft/sp-webpart-base';
import LoggingSample from './components/LoggingSample';
import { ILoggingSampleProps } from './components/ILoggingSampleProps';
import { Log } from '@microsoft/sp-core-library';

export interface ILoggingSampleWebPartProps {
  description: string;
}

export default class LoggingSampleWebPart extends BaseClientSideWebPart<ILoggingSampleWebPartProps> {

  public render(): void {

    Log.verbose("LoggingSample", "This is a verbose message.", this.context.serviceScope);
		Log.info("LoggingSample", "WebPart Initialized!");
		Log.warn("LoggingSample", "This is a warning message");
		Log.error("LoggingSample", new Error("This is an error message"));

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
