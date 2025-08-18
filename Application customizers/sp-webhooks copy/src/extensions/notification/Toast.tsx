import * as React from "react";
import { MessageBar, MessageBarType } from "@fluentui/react";

export interface ToastProps {
  message: string;
  onDismiss: () => void;
}

export const Toast: React.FC<ToastProps> = ({ message, onDismiss }) => {
  React.useEffect(() => {
    const timer = setTimeout(onDismiss, 4000);
    return () => clearTimeout(timer);
  }, [onDismiss]);

  return (
    <div style={{ position: "fixed", bottom: 24, right: 24, zIndex: 9999 }}>
      <MessageBar
        messageBarType={MessageBarType.success}
        isMultiline={false}
        onDismiss={onDismiss}
        dismissButtonAriaLabel="Close"
      >
        {message}
      </MessageBar>
    </div>
  );
};
