import * as React from 'react';
import styles from './MgtFile.module.scss';
import type { IMgtFileProps } from './IMgtFileProps';
import { File, MgtTemplateProps } from '@microsoft/mgt-react/dist/es6/spfx';
import { ViewType } from '@microsoft/mgt-react';
import { Icon, Spinner } from '@fluentui/react';

export default class MgtFile extends React.Component<IMgtFileProps, {}> {
  public render(): React.ReactElement<IMgtFileProps> {

    if (!this.props.itemId) {
      return <div>Please configure the item ID!</div>
    }

    const itemId = this.props.itemId;

    // This is a custom template for the File component
    const FileTemplate = (props: MgtTemplateProps): JSX.Element => {
      // If the template is loading, show a spinner
      if (props.template === "loading") {
        return <Spinner label="Loading file..."></Spinner>;
      }

      // If the template has no data, show a message
      if (props.template === "no-data") {
        return <div>No data for the specified file</div>;
      }

      // If the template is for a file, show the custom file details
      if (props.dataContext && props.dataContext.file) {
        return (
          <div>
            <i><Icon iconName="FavoriteStar" /> This is awesome!</i>
            <div>Size: {props.dataContext.file.size}</div>
          </div>
        );
      }

      return <></>;
    }

    return (
      <div>
        <div className={styles.welcome}>
          <h2>MGT File</h2>
        </div>
        <div>
          <h4 className={styles.sectionTitle}>
            <span>Retrieve item with query</span>
          </h4>
          <File fileQuery={`/me/drive/items/${itemId}`} />
        </div>
        <div>
          <h4 className={styles.sectionTitle}>
            <span>Retrieve item with only itemId specified</span>
          </h4>
          <File itemId={itemId}/>
        </div>
        <div>
          <h4 className={styles.sectionTitle}>
            <span>Retrieve item with spinner while loading</span>
          </h4>
          <File itemId={itemId}>
            <FileTemplate template="loading" />
          </File>
        </div>
        <div>
          <h4 className={styles.sectionTitle}>
            <span>Specified only item path (change it to reflect the path of one of your files)</span>
          </h4>
          <File itemPath="/My%20super%20secret%20folder/Ultra%20secret%20sample%20document.docx" />
        </div>
        <div>
          <h4 className={styles.sectionTitle}>
            <span>Custom properties</span>
          </h4>
          <File 
            fileQuery={`/me/drive/items/${itemId}`}
            line2Property='id'
            line3Property='lastModifiedDateTime'
            />
        </div>
        <div>
          <h4 className={styles.sectionTitle}>
            <span>Different view options</span>
          </h4>
          <File
            fileQuery={`/me/drive/items/${itemId}`}
            view={ViewType.image}
          />
          <File
            fileQuery={`/me/drive/items/${itemId}`}
            view={ViewType.oneline}
          />
          <File
            fileQuery={`/me/drive/items/${itemId}`}
            view={ViewType.twolines}
          />
        </div>
        <div>
          <h4 className={styles.sectionTitle}>
            <span>Custom template</span>
          </h4>
          <File itemId={itemId}>
            <FileTemplate template="loading" />
            <FileTemplate template="no-data" />
            <FileTemplate template="default"/>
          </File>
        </div>
      </div>
    );
  }
}
