import * as React from "react";
//import { MessageBar, MessageBarType } from "@fluentui/react";

export interface IToastProps {
  message: string;
  onDismiss: () => void;
}

export class Toast extends React.Component<IToastProps> {
  constructor(props: IToastProps) {
    super(props);
  }

  public render(): JSX.Element {
    return (
      <div style={{ position: "fixed", bottom: 24, right: 24, zIndex: 9999 }}>
        {/* <MessageBar
        messageBarType={MessageBarType.success}
        isMultiline={false}
        //onDismiss={onDismiss}
        dismissButtonAriaLabel="Close"
      >
        {message}
      </MessageBar> */}
      </div>
    );
  }
}
