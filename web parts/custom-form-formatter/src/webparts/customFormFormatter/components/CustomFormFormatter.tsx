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
      hasTeamsContext
      // TODO: remove old props and add the new ones to get the listId and contentTypeId
    } = this.props;

    // Easy sample of JSON object to be used as custom formatter
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
        <div>
          <h3>Ready to try the form formatter?</h3>
          <p>
            Click on the following button to apply the custom formatting to the client-side form for the specified content type.
          </p>
          <DefaultButton text='Apply Formatting' onClick={async () => await updateClientFormCustomFormatter("https://567mb2.sharepoint.com/sites/MainCommunication", "c5cf7628-a9ee-4025-973a-79340cc907e1", "0x0100CBE9223BC8641E468B236BD498B3EC300001D1DD8B2C8C1049925A822F84A0D9BE", jsonString)} />
        </div>
      </section>
    );
  }
}
