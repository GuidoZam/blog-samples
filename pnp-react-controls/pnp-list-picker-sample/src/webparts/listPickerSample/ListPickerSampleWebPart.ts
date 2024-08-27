import * as React from 'react';
import * as ReactDom from 'react-dom';
import { Version } from '@microsoft/sp-core-library';
import { BaseClientSideWebPart } from '@microsoft/sp-webpart-base';

import ListPickerSample from './components/ListPickerSample';
import { IListPickerSampleProps } from './components/IListPickerSampleProps';

export interface IListPickerSampleWebPartProps {
}

export default class ListPickerSampleWebPart extends BaseClientSideWebPart<IListPickerSampleWebPartProps> {

  public render(): void {
    const element: React.ReactElement<IListPickerSampleProps> = React.createElement(
      ListPickerSample,
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
