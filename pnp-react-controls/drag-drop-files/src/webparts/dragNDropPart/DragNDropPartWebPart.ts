import * as React from 'react';
import * as ReactDom from 'react-dom';
import { Version } from '@microsoft/sp-core-library';
import { BaseClientSideWebPart } from '@microsoft/sp-webpart-base';

import DragNDropPart from './components/DragNDropPart';
import { IDragNDropPartProps } from './components/IDragNDropPartProps';

export interface IDragNDropPartWebPartProps {
}

export default class DragNDropPartWebPart extends BaseClientSideWebPart<IDragNDropPartWebPartProps> {

  public render(): void {
    const element: React.ReactElement<IDragNDropPartProps> = React.createElement(
      DragNDropPart,
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
