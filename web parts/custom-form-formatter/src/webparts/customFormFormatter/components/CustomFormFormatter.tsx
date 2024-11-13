import * as React from 'react';
import styles from './CustomFormFormatter.module.scss';
import type { ICustomFormFormatterProps } from './ICustomFormFormatterProps';
import { escape } from '@microsoft/sp-lodash-subset';
//import useApplyFormFormatting from './useApplyFormFormatting';
import { DefaultButton } from '@fluentui/react';
import updateClientFormCustomFormatter from './updateClientFormCustomFormatter';

export default class CustomFormFormatter extends React.Component<ICustomFormFormatterProps, {}> {

  public render(): React.ReactElement<ICustomFormFormatterProps> {
    const {
      description,
      environmentMessage,
      hasTeamsContext,
      userDisplayName
    } = this.props;

    // const jsonObject = {
    //   headerJSONFormatter: {
    //     elmType: "div",
    //     txtContent: "Hey there! It's working! 🎉",
    //   },
    //   footerJSONFormatter: "",
    //   bodyJSONFormatter: "",
    // };

    const jsonObject = {
      headerJSONFormatter: {
        elmType: "div",
        style: {
          border: "1px solid",
          padding: "10px"
        },
        children: [
          {
            elmType: "div",
            txtContent: "Hey there ",
            attributes: {
              class: "ms-fontSize-16 ms-fontWeight-semibold"
            }
          },
          {
            elmType: "div",
            style: {
              "border-radius": "50%",
              "padding": "0 5px"
            },
            txtContent: "=substring(replaceAll(@me,'.',' '),0,indexOf(replaceAll(@me,'.',' '),'@'))",
            attributes: {
              class: "ms-fontSize-16 ms-fontWeight-semibold"
            }
          }
        ]
      },
      footerJSONFormatter: "",
      bodyJSONFormatter: "",
    }

    const jsonString = JSON.stringify(jsonObject);

    return (
      <section className={`${styles.customFormFormatter} ${hasTeamsContext ? styles.teams : ''}`}>
        <DefaultButton text='Apply Formatting' onClick={async () => await updateClientFormCustomFormatter("https://567mb2.sharepoint.com/sites/MainCommunication", "c5cf7628-a9ee-4025-973a-79340cc907e1", "0x0100CBE9223BC8641E468B236BD498B3EC300001D1DD8B2C8C1049925A822F84A0D9BE", jsonString)} />
        <div className={styles.welcome}>
          <h2>Well done, {escape(userDisplayName)}!</h2>
          <div>{environmentMessage}</div>
          <div>Web part property value: <strong>{escape(description)}</strong></div>
        </div>
        <div>
          <h3>Welcome to SharePoint Framework!</h3>
          <p>
            The SharePoint Framework (SPFx) is a extensibility model for Microsoft Viva, Microsoft Teams and SharePoint. It&#39;s the easiest way to extend Microsoft 365 with automatic Single Sign On, automatic hosting and industry standard tooling.
          </p>
          <h4>Learn more about SPFx development:</h4>
          <ul className={styles.links}>
            <li><a href="https://aka.ms/spfx" target="_blank" rel="noreferrer">SharePoint Framework Overview</a></li>
            <li><a href="https://aka.ms/spfx-yeoman-graph" target="_blank" rel="noreferrer">Use Microsoft Graph in your solution</a></li>
            <li><a href="https://aka.ms/spfx-yeoman-teams" target="_blank" rel="noreferrer">Build for Microsoft Teams using SharePoint Framework</a></li>
            <li><a href="https://aka.ms/spfx-yeoman-viva" target="_blank" rel="noreferrer">Build for Microsoft Viva Connections using SharePoint Framework</a></li>
            <li><a href="https://aka.ms/spfx-yeoman-store" target="_blank" rel="noreferrer">Publish SharePoint Framework applications to the marketplace</a></li>
            <li><a href="https://aka.ms/spfx-yeoman-api" target="_blank" rel="noreferrer">SharePoint Framework API reference</a></li>
            <li><a href="https://aka.ms/m365pnp" target="_blank" rel="noreferrer">Microsoft 365 Developer Community</a></li>
          </ul>
        </div>
      </section>
    );
  }
}
