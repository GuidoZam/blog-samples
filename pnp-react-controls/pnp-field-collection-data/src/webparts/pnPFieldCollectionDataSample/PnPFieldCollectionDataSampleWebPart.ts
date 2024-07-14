import * as React from 'react';
import * as ReactDom from 'react-dom';
import { Version } from '@microsoft/sp-core-library';
import { BaseClientSideWebPart } from '@microsoft/sp-webpart-base';

import PnPFieldCollectionDataSample from './components/PnPFieldCollectionDataSample';
import { IPnPFieldCollectionDataSampleProps } from './components/IPnPFieldCollectionDataSampleProps';

export interface IPnPFieldCollectionDataSampleWebPartProps {
  description: string;
}

export default class PnPFieldCollectionDataSampleWebPart extends BaseClientSideWebPart<IPnPFieldCollectionDataSampleWebPartProps> {

  public render(): void {
    const element: React.ReactElement<IPnPFieldCollectionDataSampleProps> = React.createElement(
      PnPFieldCollectionDataSample,
      {
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
