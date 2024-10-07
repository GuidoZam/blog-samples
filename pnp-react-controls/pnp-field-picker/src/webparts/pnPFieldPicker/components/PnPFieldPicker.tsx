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
              placeholder={strings.CustomStrings.Placeholder}
            />
          </div>
          <div>
            <h4 className={styles.sectionTitle}>
              <span>{strings.MultiSelect}</span>
            </h4>
            <FieldPicker
              context={context}
              multiSelect={true}
              onSelectionChanged={this.onFieldPickerChanged}
            />
          </div>
          <div>
            <h4 className={styles.sectionTitle}>
              <span>{strings.ShowBlankOption}</span>
            </h4>
            <FieldPicker
              context={context}
              showBlankOption={true}
              onSelectionChanged={this.onFieldPickerChanged}
            />
          </div>
          <div>
            <h4 className={styles.sectionTitle}>
              <span>{strings.GroupConfiguration}</span>
            </h4>
            <FieldPicker
              context={context}
              group="Base Columns"
            />
          </div>
          <div>
            <h4 className={styles.sectionTitle}>
              <span>{strings.RemoveHiddenFields}</span>
            </h4>
            <FieldPicker
              context={context}
              includeHidden={false}
            />
          </div>
          <div>
            <h4 className={styles.sectionTitle}>
              <span>{strings.RemoveReadOnlyFields}</span>
            </h4>
            <FieldPicker
              context={context}
              includeReadOnly={false}
            />
          </div>
          <div>
            <h4 className={styles.sectionTitle}>
              <span>{strings.OrderBy}</span>
            </h4>
            <FieldPicker
              context={context}
              orderBy={FieldsOrderBy.Title}
            />
          </div>
          <div>
            <h4 className={styles.sectionTitle}>
              <span>{strings.FilterFields}</span>
            </h4>
            <FieldPicker
              context={context}
              filter="Title eq 'Birthday'"
            />
          </div>
          <div>
            <h4 className={styles.sectionTitle}>
              <span>{strings.AfterFilterFields}</span>
            </h4>
            <FieldPicker
              context={context}
              filterItems={(fields: ISPField[]) => {
                return fields.filter(f => f.Title !== undefined && f.Title.indexOf("Date") > -1);
              }}
            />
          </div>
          <div>
            <h4 className={styles.sectionTitle}>
              <span>{strings.SetSelectedFilters}</span>
            </h4>
            <FieldPicker
              context={context}
              selectedFields={["Title", "Hobbies", "Nickname"]}
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
