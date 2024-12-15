import * as React from 'react';
import * as ReactDom from 'react-dom';
import { Version } from '@microsoft/sp-core-library';
import { BaseClientSideWebPart } from '@microsoft/sp-webpart-base';
import PnPGridLayoutSample from './components/PnPGridLayoutSample';
import { IPnPGridLayoutSampleProps } from './components/IPnPGridLayoutSampleProps';

export interface IPnPGridLayoutSampleWebPartProps {
}

export default class PnPGridLayoutSampleWebPart extends BaseClientSideWebPart<IPnPGridLayoutSampleWebPartProps> {
  public render(): void {
    const element: React.ReactElement<IPnPGridLayoutSampleProps> = React.createElement(
      PnPGridLayoutSample,
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
