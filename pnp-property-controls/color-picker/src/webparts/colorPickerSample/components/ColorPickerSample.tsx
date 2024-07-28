import * as React from 'react';
import styles from './ColorPickerSample.module.scss';
import type { IColorPickerSampleProps } from './IColorPickerSampleProps';
import * as strings from 'ColorPickerSampleWebPartStrings';

export default class ColorPickerSample extends React.Component<IColorPickerSampleProps, {}> {
  public render(): React.ReactElement<IColorPickerSampleProps> {
    const {
      baseValue,
      customizablePickerValue,
      noAlphaSliderValue,
      fullPickerValue,
      iconNameValue,
      asObjectValue,
      onPropertyChangeValue
    } = this.props;

    return (
      <section className={styles.colorPickerSample}>
        <div>
          <h2>{strings.Title}</h2>
          <p>
            {strings.Message}
          </p>
          <div className={styles.colorContainer}>
            <div className={styles.colorRectangle}
              style={{
                backgroundColor: baseValue
              }}
            />
            <div className={styles.colorRectangle}
              style={{
                backgroundColor: customizablePickerValue
              }}
            />
            <div className={styles.colorRectangle}
              style={{
                backgroundColor: noAlphaSliderValue
              }}
            />
            <div className={styles.colorRectangle}
              style={{
                backgroundColor: fullPickerValue
              }}
            />
            <div className={styles.colorRectangle}
              style={{
                backgroundColor: iconNameValue
              }}
            />
            <div className={styles.colorRectangle}
              style={{
                backgroundColor: asObjectValue
              }}
            />
            <div className={styles.colorRectangle}
              style={{
                backgroundColor: onPropertyChangeValue
              }}
            />
          </div>
        </div>
      </section>
    );
  }
}
