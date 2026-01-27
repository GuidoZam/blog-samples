import * as React from 'react';
import styles from './PnPPropertyPaneOrdering.module.scss';
import type { IPnPPropertyPaneOrderingProps } from './IPnPPropertyPaneOrderingProps';
import { escape } from '@microsoft/sp-lodash-subset';

export default class PnPPropertyPaneOrdering extends React.Component<IPnPPropertyPaneOrderingProps> {
  
  private renderCharacterList = (characters: Array<{text: string, iconName: string}>, title: string) => {
    if (!characters || characters.length === 0) {
      return null;
    }

    return (
      <div className={styles.instanceSection}>
        <h4>{title}</h4>
        <div className={styles.characterList}>
          {characters.map((character, index) => (
            <div key={index} className={styles.characterItem}>
              <div className={styles.racePosition}>
                {index + 1}
              </div>
              <strong>{escape(character.text)}</strong>
            </div>
          ))}
        </div>
      </div>
    );
  }

  public render(): React.ReactElement<IPnPPropertyPaneOrderingProps> {
    const {
      minimalOrder,
      disabledOrder,
      noArrowsOrder,
      noDragDropOrder,
      customIconsOrder,
      customRenderOrder,
      strings
    } = this.props;

    return (
      <section className={styles.pnPPropertyPaneOrdering}>
        <div className={styles.welcome}>
          <h2>{strings.DemoTitle}</h2>
          <p>{strings.DemoDescription1}</p>
          <p>{strings.DemoDescription2}</p>
        </div>
        
        {this.renderCharacterList(minimalOrder, strings.MinimalOrderSectionTitle)}
        {this.renderCharacterList(disabledOrder, strings.DisabledOrderSectionTitle)}
        {this.renderCharacterList(noArrowsOrder, strings.NoArrowsOrderSectionTitle)}
        {this.renderCharacterList(noDragDropOrder, strings.NoDragDropOrderSectionTitle)}
        {this.renderCharacterList(customIconsOrder, strings.CustomIconsOrderSectionTitle)}
        {this.renderCharacterList(customRenderOrder, strings.CustomRenderOrderSectionTitle)}
      </section>
    );
  }
}
