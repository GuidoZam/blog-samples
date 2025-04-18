import * as React from 'react';
import * as ReactDom from 'react-dom';
import { Version } from '@microsoft/sp-core-library';
// import {
//   type IPropertyPaneConfiguration,
//   PropertyPaneTextField
// } from '@microsoft/sp-property-pane';
import { BaseClientSideWebPart } from '@microsoft/sp-webpart-base';

//import * as strings from 'PnPLocationPickerWebPartStrings';
import PnPLocationPicker from './components/PnPLocationPicker';
import { IPnPLocationPickerProps } from './components/IPnPLocationPickerProps';

export interface IPnPLocationPickerWebPartProps {
}

export default class PnPLocationPickerWebPart extends BaseClientSideWebPart<IPnPLocationPickerWebPartProps> {

  public render(): void {
    const element: React.ReactElement<IPnPLocationPickerProps> = React.createElement(
      PnPLocationPicker,
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

  // protected getPropertyPaneConfiguration(): IPropertyPaneConfiguration {
  //   return {
  //     pages: [
  //       {
  //         header: {
  //           description: strings.PropertyPaneDescription
  //         },
  //         groups: [
  //           {
  //             groupName: strings.BasicGroupName,
  //             groupFields: [
  //               PropertyPaneTextField('description', {
  //                 label: strings.DescriptionFieldLabel
  //               })
  //             ]
  //           }
  //         ]
  //       }
  //     ]
  //   };
  // }
}
