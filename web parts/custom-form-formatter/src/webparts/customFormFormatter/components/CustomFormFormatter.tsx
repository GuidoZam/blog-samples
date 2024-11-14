import * as React from 'react';
import styles from './CustomFormFormatter.module.scss';
import * as strings from 'CustomFormFormatterWebPartStrings';
import type { ICustomFormFormatterProps } from './ICustomFormFormatterProps';
import { DefaultButton } from '@fluentui/react';
import updateClientFormCustomFormatter from './updateClientFormCustomFormatter';
import { ICustomFormFormatterState } from './ICustomFormFormatterState';

export default class CustomFormFormatter extends React.Component<ICustomFormFormatterProps, ICustomFormFormatterState> {
  constructor(props: ICustomFormFormatterProps) {
    super(props);

    this.state = {
      jsonHeaderFormat: this.props.jsonHeaderFormat,
      jsonBodyFormat: this.props.jsonBodyFormat,
      jsonFooterFormat: this.props.jsonFooterFormat,
    };
  }
  
  override componentDidUpdate(prevProps: Readonly<ICustomFormFormatterProps>, prevState: Readonly<ICustomFormFormatterState>, snapshot?: any): void {
    if (prevProps.jsonHeaderFormat !== this.props.jsonHeaderFormat) {
      this.setState({ jsonHeaderFormat: this.props.jsonHeaderFormat });
    }
    if (prevProps.jsonBodyFormat !== this.props.jsonBodyFormat) {
      this.setState({ jsonBodyFormat: this.props.jsonBodyFormat });
    }
    if (prevProps.jsonFooterFormat !== this.props.jsonFooterFormat) {
      this.setState({ jsonFooterFormat: this.props.jsonFooterFormat });
    }
  }

  public render(): React.ReactElement<ICustomFormFormatterProps> {
    const {
      siteUrl,
      listId,
      contentTypeId
    } = this.props;

    const {
      jsonHeaderFormat,
      jsonBodyFormat,
      jsonFooterFormat
    } = this.state;

    const customHeader = jsonHeaderFormat ? JSON.parse(jsonHeaderFormat) : "";
    const customBody = jsonBodyFormat ? JSON.parse(jsonBodyFormat) : "";
    const customFooter = jsonFooterFormat ? JSON.parse(jsonFooterFormat) : "";

    const jsonObject = {
      headerJSONFormatter: customHeader,
      bodyJSONFormatter: customBody,
      footerJSONFormatter: customFooter,
    }

    const jsonString = JSON.stringify(jsonObject);

    const buttonDisabled = !siteUrl || !listId || !contentTypeId || !jsonString;

    return (
      <section className={styles.customFormFormatter}>
        <div>
          <h3>{strings.Title}</h3>
          <p>
            {strings.Description}
          </p>
          <DefaultButton 
            text={strings.ApplyFormatting}
            onClick={async () => await updateClientFormCustomFormatter(siteUrl, listId, contentTypeId, jsonString)}
            disabled={buttonDisabled}/>
        </div>
      </section>
    );
  }
}
