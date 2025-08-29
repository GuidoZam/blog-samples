import * as React from "react";

export interface ISampleProps {
  message?: string;
}

export default class Sample extends React.Component<ISampleProps> {
  constructor(props: ISampleProps) {
    super(props);
  }

  public render(): React.ReactElement {
    const { message } = this.props;

    if (!message || message.trim().length === 0) {
      return <div></div>;
    }

    return (
      <div className={"ms-bgColor-themeDark ms-fontColor-white"}>
        {message}
      </div>
    );
  }
}  