import * as React from 'react';
import * as ReactDom from 'react-dom';
import { Version } from '@microsoft/sp-core-library';
import { BaseClientSideWebPart } from '@microsoft/sp-webpart-base';

import PnPMapSample from './components/PnPMapSample';
import { IPnPMapSampleProps } from './components/IPnPMapSampleProps';

export interface IPnPMapSampleWebPartProps {
  description: string;
}

export default class PnPMapSampleWebPart extends BaseClientSideWebPart<IPnPMapSampleWebPartProps> {

  public render(): void {
    const element: React.ReactElement<IPnPMapSampleProps> = React.createElement(
      PnPMapSample,
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
