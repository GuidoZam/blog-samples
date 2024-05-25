import * as React from "react";
import * as strings from 'BasicApplicationCustomizerApplicationCustomizerStrings';

export interface ITopComponentProps { }

export default class TopComponent extends React.Component<ITopComponentProps> {
  constructor(props: ITopComponentProps) {
    super(props);
  }

  public render(): JSX.Element {
    return (
      <div className={"ms-bgColor-themeDark ms-fontColor-white"}>
        {strings.TopMessage}
      </div>
    );
  }
}  