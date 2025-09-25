import * as React from 'react';
import * as ReactDOM from 'react-dom';

import {
  BaseFieldCustomizer,
  type IFieldCustomizerCellEventParameters
} from '@microsoft/sp-listview-extensibility';

import BasicFieldCustomizer, { IBasicFieldCustomizerProps } from './components/BasicFieldCustomizer';

export interface IBasicFieldCustomizerFieldCustomizerProperties {
}

export default class BasicFieldCustomizerFieldCustomizer
  extends BaseFieldCustomizer<IBasicFieldCustomizerFieldCustomizerProperties> {

  public onInit(): Promise<void> {
    return Promise.resolve();
  }

  public onRenderCell(event: IFieldCustomizerCellEventParameters): void {
    const percentage: unknown = event.fieldValue;

    const basicFieldCustomizer: React.ReactElement<IBasicFieldCustomizerProps> =
			React.createElement(BasicFieldCustomizer, {
				percentage
			} as IBasicFieldCustomizerProps);

    ReactDOM.render(basicFieldCustomizer, event.domElement);
  }

  public onDisposeCell(event: IFieldCustomizerCellEventParameters): void {
    ReactDOM.unmountComponentAtNode(event.domElement);
    super.onDisposeCell(event);
  }
}
