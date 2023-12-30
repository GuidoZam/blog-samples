import * as React from 'react';
import * as ReactDom from 'react-dom';
import { Version } from '@microsoft/sp-core-library';
import {
  type IPropertyPaneConfiguration
} from '@microsoft/sp-property-pane';
import { BaseClientSideWebPart } from '@microsoft/sp-webpart-base';

import * as strings from 'RichTextSampleWebPartStrings';
import RichTextSample from './components/RichTextSample';
import { IRichTextSampleProps } from './components/IRichTextSampleProps';

export interface IRichTextSampleWebPartProps {
}

export default class RichTextSampleWebPart extends BaseClientSideWebPart<IRichTextSampleWebPartProps> {

  public render(): void {
    const element: React.ReactElement<IRichTextSampleProps> = React.createElement(
      RichTextSample,
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

  protected getPropertyPaneConfiguration(): IPropertyPaneConfiguration {
    return {
      pages: [
        {
          header: {
            description: strings.PropertyPaneDescription
          },
          groups: []
        }
      ]
    };
  }
}
