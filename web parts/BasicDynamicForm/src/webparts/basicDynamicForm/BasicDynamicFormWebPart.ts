import * as React from 'react';
import * as ReactDom from 'react-dom';
import { Version } from '@microsoft/sp-core-library';
import { BaseClientSideWebPart } from '@microsoft/sp-webpart-base';

import BasicDynamicForm from './components/BasicDynamicForm';
import { IBasicDynamicFormProps } from './components/IBasicDynamicFormProps';

export interface IBasicDynamicFormWebPartProps {
}

export default class BasicDynamicFormWebPart extends BaseClientSideWebPart<IBasicDynamicFormWebPartProps> {
  public render(): void {
    const element: React.ReactElement<IBasicDynamicFormProps> = React.createElement(
      BasicDynamicForm,
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
