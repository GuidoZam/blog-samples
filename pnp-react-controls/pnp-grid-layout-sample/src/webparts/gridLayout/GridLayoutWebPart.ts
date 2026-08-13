import * as React from 'react';
import * as ReactDom from 'react-dom';
import { Version } from '@microsoft/sp-core-library';
import { BaseClientSideWebPart } from '@microsoft/sp-webpart-base';
import GridLayoutComponent from './components/GridLayout';
import { IGridLayoutProps } from './components/IGridLayoutProps';

export interface IGridLayoutWebPartProps {
}

export default class GridLayoutWebPart extends BaseClientSideWebPart<IGridLayoutWebPartProps> {


  public render(): void {
    const element: React.ReactElement<IGridLayoutProps> = React.createElement(
      GridLayoutComponent,
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
