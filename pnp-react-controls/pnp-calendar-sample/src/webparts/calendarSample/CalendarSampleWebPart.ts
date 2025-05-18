import * as React from 'react';
import * as ReactDom from 'react-dom';
import { Version } from '@microsoft/sp-core-library';
import { BaseClientSideWebPart } from '@microsoft/sp-webpart-base';

import CalendarSample from './components/CalendarSample';
import { ICalendarSampleProps } from './components/ICalendarSampleProps';

export interface ICalendarSampleWebPartProps {
}

export default class CalendarSampleWebPart extends BaseClientSideWebPart<ICalendarSampleWebPartProps> {

  public render(): void {
    const element: React.ReactElement<ICalendarSampleProps> = React.createElement(
      CalendarSample,
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
