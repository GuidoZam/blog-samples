import * as React from 'react';
import styles from './PnPPlaceholderControl.module.scss';
import * as strings from 'PnPPlaceholderControlWebPartStrings';
import type { IPnPPlaceholderControlProps } from './IPnPPlaceholderControlProps';
import { Placeholder } from "@pnp/spfx-controls-react/lib/Placeholder";
import { DisplayMode } from '@microsoft/sp-core-library';

export default class PnPPlaceholderControl extends React.Component<IPnPPlaceholderControlProps> {
  public render(): React.ReactElement<IPnPPlaceholderControlProps> {
    const {
      displayMode
    } = this.props;

    return (
      <>
        <div>
          <h3>{strings.Title}</h3>
        </div>
        <section className={styles.pnPPlaceholderControl}>
          {strings.Description}
        </section>
        {displayMode === DisplayMode.Edit && 
        <Placeholder iconName='CaseSetting'
          iconText={strings.PlaceholderIconText}
          description={strings.PlaceholderDescription}
          buttonLabel={strings.PlaceholderButtonLabel}
          onConfigure={this._onConfigure}
          />}
        <br />
        {displayMode === DisplayMode.Edit &&
          <Placeholder iconName='AutoEnhanceOn'
            iconText={strings.PlaceholderIconText}
            description={strings.PlaceholderDescription}
            buttonLabel={strings.PlaceholderButtonLabel}
            hideButton={true}
          />}
      </>
    );
  }

  private _onConfigure = (): void => {
    // Context of the web part
    this.props.context.propertyPane.open();
  }
}
