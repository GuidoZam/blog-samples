import * as React from 'react';
import styles from './StylingMgtManualThemeToggle.module.scss';
import type { IStylingMgtManualThemeToggleProps } from './IStylingMgtManualThemeToggleProps';
import { FileList } from '@microsoft/mgt-react';
import * as strings from 'StylingMgtWebPartStrings';
import { IStylingMgtManualThemeToggleState } from './IStylingMgtManualThemeToggleState';
import { PrimaryButton } from '@fluentui/react';
import { applyTheme } from "@microsoft/mgt-components";

export default class StylingMgtManualThemeToggle extends React.Component<IStylingMgtManualThemeToggleProps, IStylingMgtManualThemeToggleState> {

  constructor(props: IStylingMgtManualThemeToggleProps) {
    super(props);
    
    this.state = {
      activeTheme: 'light'
    };
  }

  componentDidMount(): void {
    this.changeThemeButtonClick();
  }

  private changeThemeButtonClick(): void {
    const { activeTheme } = this.state;
    const fileListControl = document.querySelector<HTMLElement>("#fileListControl");

    const newTheme = activeTheme === 'light' ? 'dark' : 'light';

    applyTheme(newTheme, fileListControl!);
    this.setState({ activeTheme: newTheme });
  }

  public render(): React.ReactElement<IStylingMgtManualThemeToggleProps> {

    return (
      <section className={styles.stylingMgtManualThemeToggle}>
        <h3>{strings.Title}</h3>
        <div>
          <FileList id='fileListControl' />
          <PrimaryButton
            text={strings.ChangegButtonText}
            onClick={() => { this.changeThemeButtonClick(); }} />
        </div>
      </section>
    );
  }
}
