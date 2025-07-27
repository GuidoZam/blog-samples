import * as React from 'react';
import * as ReactDom from 'react-dom';
import { Version } from '@microsoft/sp-core-library';
import { BaseClientSideWebPart } from '@microsoft/sp-webpart-base';

import StorageSample from './components/StorageSample';
import { IStorageSampleProps } from './components/IStorageSampleProps';

export interface IStorageSampleWebPartProps {
}

export default class StorageSampleWebPart extends BaseClientSideWebPart<IStorageSampleWebPartProps> {

  public render(): void {
    const element: React.ReactElement<IStorageSampleProps> = React.createElement(
      StorageSample,
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
