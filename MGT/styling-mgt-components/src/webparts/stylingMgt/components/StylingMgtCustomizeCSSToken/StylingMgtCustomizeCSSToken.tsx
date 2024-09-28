import * as React from 'react';
import styles from './StylingMgtCustomizeCSSToken.module.scss';
import type { IStylingMgtCustomizeCSSTokenProps } from './IStylingMgtCustomizeCSSTokenProps';
import { PeoplePicker } from '@microsoft/mgt-react';
import * as strings from 'StylingMgtWebPartStrings';
import { IStylingMgtCustomizeCSSTokenState } from './IStylingMgtCustomizeCSSTokenState';

export default class StylingMgtCustomizeCSSToken extends React.Component<IStylingMgtCustomizeCSSTokenProps, IStylingMgtCustomizeCSSTokenState> {

  constructor(props: IStylingMgtCustomizeCSSTokenProps) {
    super(props);
    
    this.state = {
      activeTheme: 'light'
    };
  }

  public render(): React.ReactElement<IStylingMgtCustomizeCSSTokenProps> {

    return (
      <section className={styles.stylingMgtCustomizeCSSToken}>
        <h3>{strings.Title}</h3>
        <div>
          <PeoplePicker
            className={styles.customPeoplePickerStyles}/>
        </div>
      </section>
    );
  }
}
