import * as React from 'react';
import * as ReactDom from 'react-dom';
import { Version } from '@microsoft/sp-core-library';
import { BaseClientSideWebPart } from '@microsoft/sp-webpart-base';

import TestBaseLibrary from './components/TestBaseLibrary';
import { ITestBaseLibraryProps } from './components/ITestBaseLibraryProps';

export interface ITestBaseLibraryWebPartProps {
}

export default class TestBaseLibraryWebPart extends BaseClientSideWebPart<ITestBaseLibraryWebPartProps> {

  public render(): void {
    const element: React.ReactElement<ITestBaseLibraryProps> = React.createElement(
      TestBaseLibrary,
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
