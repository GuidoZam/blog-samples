import * as React from 'react';
import styles from './PnPGridLayoutSample.module.scss';
import * as strings from 'PnPGridLayoutSampleWebPartStrings';
import type { IPnPGridLayoutSampleProps } from './IPnPGridLayoutSampleProps';
import { GridLayout } from "@pnp/spfx-controls-react/lib/GridLayout";
import { IPnPGridLayoutSampleState } from './IPnPGridLayoutSampleState';
import { ISize, Label } from '@fluentui/react';
//import { DocumentCard, DocumentCardActivity, DocumentCardLocation, DocumentCardPreview, DocumentCardTitle, DocumentCardType, IDocumentCardPreviewProps, ImageFit, ISize } from '@fluentui/react';

export default class PnPGridLayoutSample extends React.Component<IPnPGridLayoutSampleProps, IPnPGridLayoutSampleState> {
  constructor(props: IPnPGridLayoutSampleProps) {
    super(props);

    this.state = {
      items: this._getSampleItems()
    };
  }

  public render(): React.ReactElement<IPnPGridLayoutSampleProps> {
    const {
      items
    } = this.state;

    return (
      <div>
        <div>
          <h3>{strings.Title}</h3>
        </div>
        <GridLayout
          ariaLabel={strings.GridLayoutAriaLabel}
          items={items}
          onRenderGridItem={(item: any, finalSize: ISize, isCompact: boolean) => this._onRenderGridItem(item, finalSize, isCompact)} />
      </div>
    );
  }

  private _onRenderGridItem = (item: any, _finalSize: ISize, isCompact: boolean): JSX.Element => {
    return <div className={styles.gridItem}>
      <div className={styles.gridItemImage}>
        <img src={item.thumbnail} alt={item.title} />
      </div>
      <div>
        <Label>{item.title}</Label>
        <Label className={styles.gridItemContent}>{item.description}</Label>
      </div>
    </div>;
  }

  private _getSampleItems(): unknown[] {
    // Sample data items from the Viva suit to be rendered.
    // The item are composed of a title, description, and an image.
    return [
      {
        title: 'Viva Amplify',
        description: 'Viva Amplify helps organizations create a culture of recognition and appreciation, making it easy to celebrate achievements and stay connected.',
        thumbnail: require('./../assets/Amplify.png')
      }, {
        title: 'Viva Connections',
        description: 'Viva Connections is your gateway to a modern employee experience. It brings together relevant news, conversations, and resources in a mobile-first experience.',
        thumbnail: require('./../assets/Connections.png')
      }, {
        title: 'Viva Engage',
        description: 'Viva Engage helps leaders and managers connect with employees, share important news, and gather feedback to drive engagement and culture.',
        thumbnail: require('./../assets/Engage.png')
      }, {
        title: 'Viva Goals',
        description: 'Viva Goals helps individuals and teams set, align, and track progress on goals, making it easy to stay focused and achieve results.',
        thumbnail: require('./../assets/Goals.png')
      }, {
        title: 'Viva Insights',
        description: 'Viva Insights helps individuals and teams improve productivity and wellbeing with personalized and actionable insights.',
        thumbnail: require('./../assets/Insights.png')
      }, {
        title: 'Viva Learning',
        description: 'Viva Learning is a central hub for learning in the flow of work, making it easy to discover, share, assign, and learn from content libraries across your organization.',
        thumbnail: require('./../assets/Learning.png')
      }, {
        title: 'Viva Pulse',
        description: 'Viva Pulse helps leaders and managers understand employee sentiment and improve the employee experience with real-time feedback and insights.',
        thumbnail: require('./../assets/Pulse.png')
      }, {
        title: 'Viva Topics',
        description: 'Viva Topics uses AI to automatically organize content and expertise across your organization, making it easy to find information and put knowledge to work.',
        thumbnail: require('./../assets/Topics.png')
      }
    ];
  }
}
