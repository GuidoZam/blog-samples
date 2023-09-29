import * as React from 'react';
import * as ReactDom from 'react-dom';
import { Version } from '@microsoft/sp-core-library';
import { BaseClientSideWebPart } from '@microsoft/sp-webpart-base';
import MaskedTextFieldSample from './components/MaskedTextFieldSample';
import { IMaskedTextFieldSampleProps } from './components/IMaskedTextFieldSampleProps';

export interface IMaskedTextFieldSampleWebPartProps {
}

export default class MaskedTextFieldSampleWebPart extends BaseClientSideWebPart<IMaskedTextFieldSampleWebPartProps> {

  public render(): void {
    const element: React.ReactElement<IMaskedTextFieldSampleProps> = React.createElement(
      MaskedTextFieldSample
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
