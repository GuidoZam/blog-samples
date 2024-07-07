import * as React from 'react';
import * as ReactDom from 'react-dom';
import { Version } from '@microsoft/sp-core-library';
import { BaseClientSideWebPart } from '@microsoft/sp-webpart-base';

import PnPSitePicker from './components/PnPSitePicker';
import { IPnPSitePickerProps } from './components/IPnPSitePickerProps';

interface IPnPSitePickerWebPartProps {
}

export default class PnPSitePickerWebPart extends BaseClientSideWebPart<IPnPSitePickerWebPartProps> {

  public render(): void {
    const element: React.ReactElement<IPnPSitePickerProps> = React.createElement(
      PnPSitePicker,
      {
        context: this.context,
      }
    );

    ReactDom.render(element, this.domElement);
  }

  protected get dataVersion(): Version {
    return Version.parse('1.0');
  }
}
