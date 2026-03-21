import * as React from 'react';
import * as ReactDom from 'react-dom';
import { Version } from '@microsoft/sp-core-library';
import { BaseClientSideWebPart } from '@microsoft/sp-webpart-base';
import ListItemCommentSample from './components/ListItemCommentSample';
import { IListItemCommentSampleProps } from './components/IListItemCommentSampleProps';

export interface IListItemCommentSampleWebPartProps {
  description: string;
}

export default class ListItemCommentSampleWebPart extends BaseClientSideWebPart<IListItemCommentSampleWebPartProps> {

  public render(): void {
    const element: React.ReactElement<IListItemCommentSampleProps> = React.createElement(
      ListItemCommentSample,
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
