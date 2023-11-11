import * as React from 'react';
import type { IDynamicFormWithListSelectionProps } from './IDynamicFormWithListSelectionProps';
import { DynamicForm } from "@pnp/spfx-controls-react/lib/DynamicForm";
import * as strings from 'DynamicFormWithListSelectionWebPartStrings';

export default class DynamicFormWithListSelection extends React.Component<IDynamicFormWithListSelectionProps, {}> {
  public render(): React.ReactElement<IDynamicFormWithListSelectionProps> {
    const {
      context,
      listId
    } = this.props;

    const form = <DynamicForm
      context={context as any}
      listId={listId}
      key={`form_${listId}`}
    />;

    const configure = <div>{strings.ConfigureTheWebPartMessage}</div>;

    return (listId && listId !== "") ? form : configure;
  }
}
