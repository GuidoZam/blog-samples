import * as React from 'react';
import styles from './MgtLocalization.module.scss';
import * as strings from 'MgtLocalizationWebPartStrings'; 
import type { IMgtLocalizationProps } from './IMgtLocalizationProps';
import { Login, PeoplePicker, PersonCard, TaxonomyPicker } from '@microsoft/mgt-react';
//import { LocalizationHelper } from "@microsoft/mgt-element";

export default class MgtLocalization extends React.Component<IMgtLocalizationProps, {}> {
  public render(): React.ReactElement<IMgtLocalizationProps> {

    // Set the strings for the components in the style of a pirate
    // LocalizationHelper.strings = {
    //   loadingMessage: "Arr! Ye data be loading...",
    //   noResultsFound: "Arr! No results found matey!",
    //   _components: {
    //     "login": {
    //       signInLinkSubtitle: "Ahoy! Sign in to see your data",
    //       signOutLinkSubtitle: "Err matey! Sign out?",
    //     },
    //     "person-card": {
    //       endOfCard: "End of card",
    //       quickMessage: "Ahoy! Send a message",
    //       expandDetailsLabel: "Expand details",
    //       renderOverviewSectionLabel: "Render overview section",
    //       sendMessageLabel: "Send a message",
    //       emailButtonLabel: "Email",
    //       callButtonLabel: "Call",
    //       chatButtonLabel: "Chat",
    //       videoButtonLabel: "Video",
    //       closeCardLabel: "Close card",
    //     },
    //     "person-card-profile": {
    //       SkillsAndExperienceSectionTitle: "Ye Skills and Experience",
    //       AboutCompactSectionTitle: "'bout ye",
    //       LanguagesSubSectionTitle: "Languages ye speak",
    //       WorkExperienceSubSectionTitle: "Ye work experience",
    //       EducationSubSectionTitle: "Ye education",
    //     },
    //     "people-picker": {
    //       inputPlaceholderText: "Ahoy! Do the search to find yer mateys",
    //     },
    //     "taxonomy-picker": {
    //       termsetIdRequired: "Arr! A term set ID be required!",
    //     },
    //   },
    // };
    
    return (
      <section className={styles.mgtLocalization}>
        <div className={styles.welcome}>
          <h1>{strings.Title}</h1>
        </div>
        <div>
          <div>
            <h4 className={styles.sectionTitle}>
              <span>{strings.Login}</span>
            </h4>
            <Login />
          </div>
          <div>
            <h4 className={styles.sectionTitle}>
              <span>{strings.PersonCard}</span>
            </h4>
            <PersonCard personQuery="me"/>
          </div>
          <div>
            <h4 className={styles.sectionTitle}>
              <span>{strings.PeoplePicker}</span>
            </h4>
            <PeoplePicker />
          </div>
          <div>
            <h4 className={styles.sectionTitle}>
              <span>{strings.TaxonomyPicker}</span>
            </h4>
            <TaxonomyPicker />
          </div>
        </div>
      </section>
    );
  }
}
