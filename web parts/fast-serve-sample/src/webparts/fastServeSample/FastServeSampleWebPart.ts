import * as React from 'react';
import * as ReactDom from 'react-dom';
import { Version } from '@microsoft/sp-core-library';
import { BaseClientSideWebPart } from '@microsoft/sp-webpart-base';

import FastServeSample from './components/FastServeSample';
import { IFastServeSampleProps } from './components/IFastServeSampleProps';

export interface IFastServeSampleWebPartProps {
}

export default class FastServeSampleWebPart extends BaseClientSideWebPart<IFastServeSampleWebPartProps> {

  public render(): void {
    const element: React.ReactElement<IFastServeSampleProps> = React.createElement(
      FastServeSample,
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
