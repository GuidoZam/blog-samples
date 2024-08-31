import * as React from 'react';
import * as ReactDom from 'react-dom';
import { Version } from '@microsoft/sp-core-library';
import { BaseClientSideWebPart } from '@microsoft/sp-webpart-base';

import ListItemPickerSample from './components/ListItemPickerSample';
import { IListItemPickerSampleProps } from './components/IListItemPickerSampleProps';

export interface IListItemPickerSampleWebPartProps {
}

export default class ListItemPickerSampleWebPart extends BaseClientSideWebPart<IListItemPickerSampleWebPartProps> {

  public render(): void {
    const element: React.ReactElement<IListItemPickerSampleProps> = React.createElement(
      ListItemPickerSample,
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
