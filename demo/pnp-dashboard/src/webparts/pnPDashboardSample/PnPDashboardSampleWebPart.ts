import * as React from 'react';
import * as ReactDom from 'react-dom';
import { Version } from '@microsoft/sp-core-library';
import { BaseClientSideWebPart } from '@microsoft/sp-webpart-base';

import PnPDashboardSample from './components/PnPDashboardSample';
import { IPnPDashboardSampleProps } from './components/IPnPDashboardSampleProps';

export interface IPnPDashboardSampleWebPartProps {
}

export default class PnPDashboardSampleWebPart extends BaseClientSideWebPart<IPnPDashboardSampleWebPartProps> {


  public render(): void {
    const element: React.ReactElement<IPnPDashboardSampleProps> = React.createElement(
      PnPDashboardSample,
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
