import * as React from 'react';
import styles from './PnPPropertyCodeEditor.module.scss';
import * as strings from 'PnPPropertyCodeEditorWebPartStrings';
import type { IPnPPropertyCodeEditorProps } from './IPnPPropertyCodeEditorProps';

export default class PnPPropertyCodeEditor extends React.Component<IPnPPropertyCodeEditorProps, {}> {
  public render(): React.ReactElement<IPnPPropertyCodeEditorProps> {
    const {
      basicValue,
      initialValue,
      languageValue,
      disabledValue,
      readonlyValue,
      optionsValue
    } = this.props;

    return (
      <section className={styles.pnPPropertyCodeEditor}>
        <div>
          <h3>{strings.Title}</h3>
          <div>
            <h4 className={styles.sectionTitle}>
              <span>{strings.BasicValueLabel}</span>
            </h4>
            <pre>{basicValue}</pre>
          </div>
          <div>
            <h4 className={styles.sectionTitle}>
              <span>{strings.InitialValueLabel}</span>
            </h4>
            <pre>{initialValue}</pre>
          </div>
          <div>
            <h4 className={styles.sectionTitle}>
              <span>{strings.LanguageValueLabel}</span>
            </h4>
            <pre>{languageValue}</pre>
          </div>
          <div>
            <h4 className={styles.sectionTitle}>
              <span>{strings.DisabledValueLabel}</span>
            </h4>
            <pre>{disabledValue}</pre>
          </div>
          <div>
            <h4 className={styles.sectionTitle}>
              <span>{strings.ReadonlyValueLabel}</span>
            </h4>
            <pre>{readonlyValue}</pre>
          </div>
          <div>
            <h4 className={styles.sectionTitle}>
              <span>{strings.OptionsValueLabel}</span>
            </h4>
            <pre>{optionsValue}</pre>
          </div>
        </div>
      </section>
    );
  }
}
