import * as React from 'react';
import styles from './PnPFieldPicker.module.scss';
import type { IPnPFieldPickerProps } from './IPnPFieldPickerProps';
import { FieldPicker } from "@pnp/spfx-controls-react/lib/FieldPicker";
import { FieldsOrderBy } from '@pnp/spfx-controls-react/lib/services/ISPService';
import { ISPField } from '@pnp/spfx-controls-react';
import * as strings from 'PnPFieldPickerWebPartStrings';

export default class PnPFieldPicker extends React.Component<IPnPFieldPickerProps, {}> {
  public render(): React.ReactElement<IPnPFieldPickerProps> {
    const { context, selectedList } = this.props;

    return (
      <section className={styles.pnPFieldPicker}>
        <div>
          <h3>{strings.Title}</h3>
          <div>
            <h4 className={styles.sectionTitle}>
              <span>{strings.MinimalConfiguration}</span>
            </h4>
            <FieldPicker
              context={context}
            />
          </div>
          <div>
            <h4 className={styles.sectionTitle}>
              <span>{strings.ListConfigured}</span>
            </h4>
            <FieldPicker
              context={context}
              listId={selectedList}
            />
          </div>
          <div>
            <h4 className={styles.sectionTitle}>
              <span>{strings.OnSelectionChanged}</span>
            </h4>
            <FieldPicker
              context={context}
              listId={selectedList}
              onSelectionChanged={this.onFieldPickerChanged}
            />
          </div>
          <div>
            <h4 className={styles.sectionTitle}>
              <span>{strings.CustomStrings.Label}</span>
            </h4>
            <FieldPicker
              context={context}
              label={strings.CustomLabel}
              listId={selectedList}
            />
          </div>
          <div>
            <h4 className={styles.sectionTitle}>
              <span>{strings.MultiSelect}</span>
            </h4>
            <FieldPicker
              context={context}
              listId={selectedList}
              multiSelect={false}
              onSelectionChanged={this.onFieldPickerChanged}
            />
          </div>
          <div>
            <h4 className={styles.sectionTitle}>
              <span>{strings.OrderBy}</span>
            </h4>
            <FieldPicker
              context={context}
              listId={selectedList}
              orderBy={FieldsOrderBy.Title}
            />
          </div>
          <div>
            <h4 className={styles.sectionTitle}>
              <span>{strings.ShowBlankOption}</span>
            </h4>
            <FieldPicker
              context={context}
              listId={selectedList}
              showBlankOption={true}
            />
          </div>
          <div>
            <h4 className={styles.sectionTitle}>
              <span>{strings.GroupConfiguration}</span>
            </h4>
            <FieldPicker
              context={context}
              listId={selectedList}
              group="Base Columns"
            // includeHidden={false}
            // includeReadOnly={false}
            //onSelectionChanged={this.onFieldPickerChanged}
            />
          </div>
        </div>
      </section>
    );
  }

  private onFieldPickerChanged(fields: ISPField | ISPField[]): void {
    console.log("Fields:", fields);
  }
}
