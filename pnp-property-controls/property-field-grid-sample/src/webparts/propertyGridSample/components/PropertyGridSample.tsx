import * as React from 'react';
import styles from './PropertyGridSample.module.scss';
import * as strings from 'PropertyGridSampleWebPartStrings';
import type { IPropertyGridSampleProps } from './IPropertyGridSampleProps';

export default class PropertyGridSample extends React.Component<IPropertyGridSampleProps> {
  public render(): React.ReactElement<IPropertyGridSampleProps> {
    const {
      items
    } = this.props;

    return (
      <section className={styles.propertyGridSample}>
        <h3>{strings.Title}</h3>
        {(!items || items.length === 0) &&
          <p>No items selected</p>
        }
        {items && items.length > 0 &&
          <div>
            <div>
              <h4>Selected Items</h4>
            </div>
            <ul>
              {items.map((item, index) => (
                <li key={index}>
                  {item.title}
                </li>
              ))}
            </ul>
          </div>
        }
      </section>
    );
  }
}
