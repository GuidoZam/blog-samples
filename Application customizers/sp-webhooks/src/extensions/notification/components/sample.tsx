import * as React from "react";

export interface ISampleProps { 
}

export default class Sample extends React.Component<ISampleProps> {
  constructor(props: ISampleProps) {
    super(props);
  }

  public render(): JSX.Element {
    return (
      <div className={"ms-bgColor-themeDark ms-fontColor-white"}>
        Test
      </div>
    );
  }
}  