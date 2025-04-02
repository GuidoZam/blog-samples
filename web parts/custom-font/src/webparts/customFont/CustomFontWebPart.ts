import * as React from 'react';
import * as ReactDom from 'react-dom';
import { Version } from '@microsoft/sp-core-library';
import { BaseClientSideWebPart } from '@microsoft/sp-webpart-base';

import CustomFont from './components/CustomFont';
import { ICustomFontProps } from './components/ICustomFontProps';

export interface ICustomFontWebPartProps {
}

export default class CustomFontWebPart extends BaseClientSideWebPart<ICustomFontWebPartProps> {

  public render(): void {
    const element: React.ReactElement<ICustomFontProps> = React.createElement(
      CustomFont,
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
