import * as React from 'react';
import styles from './GridLayout.module.scss';
import strings from 'GridLayoutWebPartStrings';
import type { IGridLayoutProps } from './IGridLayoutProps';
import type { IGridLayoutState } from './IGridLayoutState';
import type { IGridItem } from './IGridItem';
import { GridLayout } from '@pnp/spfx-controls-react/lib/GridLayout';
import {
  DocumentCard,
  DocumentCardActivity,
  DocumentCardPreview,
  DocumentCardDetails,
  DocumentCardTitle,
  IDocumentCardPreviewProps,
  DocumentCardLocation,
  DocumentCardType
} from '@fluentui/react/lib/DocumentCard';
import { ImageFit } from '@fluentui/react/lib/Image';
import { ISize } from '@fluentui/react/lib/Utilities';
import gridItems from './gridItems';

export default class GridLayoutComponent extends React.Component<IGridLayoutProps, IGridLayoutState> {
  
  constructor(props: IGridLayoutProps) {
    super(props);
    
    // Sample data for the grid
    this.state = {
      items: gridItems
    };
  }

  private _onRenderGridItem = (item: IGridItem, finalSize: ISize, isCompact: boolean): JSX.Element => {
    const previewProps: IDocumentCardPreviewProps = {
      previewImages: [
        {
          previewImageSrc: item.thumbnail,
          imageFit: ImageFit.cover,
          height: 130
        }
      ]
    };

    return <div
      data-is-focusable={true}
      role="listitem"
      aria-label={item.title}
    >
      <DocumentCard
        type={isCompact ? DocumentCardType.compact : DocumentCardType.normal}
        onClick={() => alert(`You clicked on: ${item.title}`)}
      >
        <DocumentCardPreview {...previewProps} />
        {!isCompact && <DocumentCardLocation location={item.location} />}
        <DocumentCardDetails>
          <DocumentCardTitle
            title={item.title}
            shouldTruncate={true}
          />
          <DocumentCardActivity
            activity={item.activity}
            people={[{ name: item.name, profileImageSrc: item.profileImageSrc }]}
          />
        </DocumentCardDetails>
      </DocumentCard>
    </div>;
  }

  public render(): React.ReactElement<IGridLayoutProps> {
    return (
      <section className={`${styles.gridLayout}`}>
        <div className={styles.container}>
          <h1 className={styles.title}>{strings.Title}</h1>

          <div className={styles.section}>
            
            <GridLayout
              ariaLabel={strings.GridLayoutAriaLabel}
              items={this.state.items}
              onRenderGridItem={(item: IGridItem, finalSize: ISize, isCompact: boolean) => 
                this._onRenderGridItem(item, finalSize, isCompact)
              }
            />
          </div>

          {/* <div className={styles.info}>
            <h3>Key Features:</h3>
            <ul>
              <li><strong>Responsive Layout:</strong> Automatically adjusts columns based on available width</li>
              <li><strong>Compact Mode:</strong> Switches to compact cards on narrow screens</li>
              <li><strong>Customizable Rendering:</strong> Full control over item rendering via callback</li>
              <li><strong>Accessibility:</strong> Built-in ARIA support for screen readers</li>
              <li><strong>Flexible Content:</strong> Works with any rectangular content, not just DocumentCards</li>
            </ul>
          </div> */}
        </div>
      </section>
    );
  }
}
