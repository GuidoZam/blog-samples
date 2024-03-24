import * as React from 'react';
import * as ReactDom from 'react-dom';
import { Version } from '@microsoft/sp-core-library';
import { BaseClientSideWebPart } from '@microsoft/sp-webpart-base';

import PnPFieldCollectionData from './components/PnPFieldCollectionData';
import { IPnPFieldCollectionDataProps } from './components/IPnPFieldCollectionDataProps';

export interface IPnPFieldCollectionDataWebPartProps {
}

export default class PnPFieldCollectionDataWebPart extends BaseClientSideWebPart<IPnPFieldCollectionDataWebPartProps> {

  public render(): void {
    const element: React.ReactElement<IPnPFieldCollectionDataProps> = React.createElement(
      PnPFieldCollectionData,
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
