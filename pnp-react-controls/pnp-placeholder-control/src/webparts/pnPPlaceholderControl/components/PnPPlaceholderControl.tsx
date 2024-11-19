import * as React from 'react';
import styles from './PnPPlaceholderControl.module.scss';
import type { IPnPPlaceholderControlProps } from './IPnPPlaceholderControlProps';
import { Placeholder } from "@pnp/spfx-controls-react/lib/Placeholder";

export default class PnPPlaceholderControl extends React.Component<IPnPPlaceholderControlProps> {
  public render(): React.ReactElement<IPnPPlaceholderControlProps> {
    const {
      showPlaceholder
    } = this.props;

    // TODO: this.displayMode === DisplayMode.Edit
    
    return (
      <>
        <div>
          <h3>PnP Placeholder sample</h3>
        </div>
      {showPlaceholder && 
      <Placeholder iconName='Edit'
        iconText='Configure your web part'
        description='Please configure the web part.'
        buttonLabel='Configure'
        onConfigure={this._onConfigure}
        //theme={this.props.themeVariant}
        />}
      <section className={styles.pnPPlaceholderControl}>
        Here's how to open the configuration pane 🤯
      </section>
      </>
    );
  }

  private _onConfigure = () => {
    // Context of the web part
    this.props.context.propertyPane.open();
  }
}
