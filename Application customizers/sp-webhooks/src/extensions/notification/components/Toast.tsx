
import * as React from "react";
import styles from "./Toast.module.scss";

export interface IToastProps {
  message: string;
}

interface IToastState {
  fading: boolean;
}

export class Toast extends React.Component<IToastProps, IToastState> {
  private fadeTimeout: any = null;

  constructor(props: IToastProps) {
    super(props);
    this.state = { fading: false };
  }

  componentDidMount(): void {
    this.fadeTimeout = setTimeout(() => {
      this.setState({ fading: true });
    }, 5000);
  }

  componentWillUnmount(): void {
    if (this.fadeTimeout) {
      clearTimeout(this.fadeTimeout);
    }
  }

  public render(): React.ReactElement {
    const { message } = this.props;
    const { fading } = this.state;

    if (!message || message.trim().length === 0) {
      return <div></div>;
    }

    return (
      <div
        className={
          fading
            ? `${styles.toastOverlay} ${styles.fadeOut}`
            : styles.toastOverlay
        }
      >
        {message}
      </div>
    );
  }
}
