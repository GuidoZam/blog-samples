import * as React from 'react';
import type { IBasicDynamicFormProps } from './IBasicDynamicFormProps';
import { DynamicForm } from "@pnp/spfx-controls-react/lib/DynamicForm";

export default class BasicDynamicForm extends React.Component<IBasicDynamicFormProps, {}> {
  public render(): React.ReactElement<IBasicDynamicFormProps> {

    return (
      <DynamicForm
        context={this.props.context as any}
        listId={"here-goes-your-list-guid"} 
        />
    );
  }
}
