import * as React from 'react';
import styles from './MgtLocalization.module.scss';
import * as strings from 'MgtLocalizationWebPartStrings'; 
import type { IMgtLocalizationProps } from './IMgtLocalizationProps';
import { PeoplePicker, SearchBox, Planner } from '@microsoft/mgt-react';
import { LocalizationHelper } from "@microsoft/mgt-element";

export default class MgtLocalization extends React.Component<IMgtLocalizationProps, {}> {
  public render(): React.ReactElement<IMgtLocalizationProps> {

    // Set the strings for the components in the style of a pirate
    LocalizationHelper.strings = {
      loadingMessage: "Arr! Ye data be loading...",
      noResultsFound: "Arr! No results found matey!",
      _components: {
        "mgt-localization-people-picker": {
          inputPlaceholderText: "Ahoy! Do the search to find yer mateys",
        },
        "mgt-localization-search-box": {
          placeholder: "Search for yer treasure"
        },
        "mgt-localization-planner": {
          addTaskButtonSubtitle: "Arr! Add a new task matey",
          due: "Settin’ sail "
        }
      },
    };
    
    return (
      <section className={styles.mgtLocalization}>
        <div className={styles.welcome}>
          <h1>{strings.Title}</h1>
        </div>
        <div>
          <div>
            <h4 className={styles.sectionTitle}>
              <span>{strings.PeoplePicker}</span>
            </h4>
            <PeoplePicker />
          </div>
          <div>
            <h4 className={styles.sectionTitle}>
              <span>{strings.SearchBox}</span>
            </h4>
            <SearchBox />
          </div>
          <div>
            <h4 className={styles.sectionTitle}>
              <span>{strings.Planner}</span>
            </h4>
            <Planner />
          </div>
        </div>
      </section>
    );
  }
}
