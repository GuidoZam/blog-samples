import * as React from 'react';
import styles from './RichTextSample.module.scss';
import type { IRichTextSampleProps } from './IRichTextSampleProps';
import { RichText } from "@pnp/spfx-controls-react/lib/RichText";
import { IRichTextSampleState } from './IRichTextSampleState';

export default class RichTextSample extends React.Component<IRichTextSampleProps, IRichTextSampleState> {
  constructor(props: IRichTextSampleProps) {
    super(props);
    this.state = {
      richValue: ""
    };
  }

  public render(): React.ReactElement<IRichTextSampleProps> {
    return (
      <section className={`${styles.richTextSample}`}>
        <div className={styles.welcome}>
          <h2>RichText sample</h2>
        </div>
        <div>
          <RichText 
            label="Multiline text field"
            value={this.state.richValue}
            onChange={(text) => this.onTextChange(text)}
          />
        </div>
      </section>
    );
  }

  private onTextChange = (newText: string): string => {
    this.setState({ richValue: newText });
    return newText;
  }
}
