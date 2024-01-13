import * as React from 'react';

export default class SampleText extends React.Component<ISampleTextProps, {}> {
  public render(): React.ReactElement<ISampleTextProps> {
    const { text } = this.props;

    return (
      <div>
        {text}
      </div>
    );
  }
}

export interface ISampleTextProps {
  text: string;
}