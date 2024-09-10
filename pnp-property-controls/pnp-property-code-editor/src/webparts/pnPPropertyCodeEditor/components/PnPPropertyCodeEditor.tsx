import * as React from 'react';
import styles from './PnPPropertyCodeEditor.module.scss';
import * as strings from 'PnPPropertyCodeEditorWebPartStrings';
import type { IPnPPropertyCodeEditorProps } from './IPnPPropertyCodeEditorProps';

export default class PnPPropertyCodeEditor extends React.Component<IPnPPropertyCodeEditorProps, {}> {
  public render(): React.ReactElement<IPnPPropertyCodeEditorProps> {
    const {
      basicValue
    } = this.props;

    return (
      <section className={styles.pnPPropertyCodeEditor}>
        <div>
          <h3>{strings.Title}</h3>
          <div>
            <h4 className={styles.sectionTitle}>
              <span>{strings.BasicValueLabel}</span>
            </h4>
            <pre>{basicValue ?? strings.NoValueSpecified}</pre>
          </div>
        </div>
      </section>
    );
  }
}
