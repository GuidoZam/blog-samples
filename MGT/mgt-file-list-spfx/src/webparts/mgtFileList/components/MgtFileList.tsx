import * as React from 'react';
import styles from './MgtFileList.module.scss';
import type { IMgtFileListProps } from './IMgtFileListProps';
import { FileList } from '@microsoft/mgt-react';

export default class MgtFileList extends React.Component<IMgtFileListProps, {}> {
  public render(): React.ReactElement<IMgtFileListProps> {
    const {
      itemId,
      hasTeamsContext,
    } = this.props;

    return (
      <section className={`${styles.mgtFileList} ${hasTeamsContext ? styles.teams : ''}`}>
        <div className={styles.welcome}>
          <div>MGT File List</div>
        </div>
        <div>
          <div>
            <h4 className={styles.sectionTitle}>
              <span>Basic usage</span>
            </h4>
            {/* Basic usage of FileList */}
            <FileList></FileList>
          </div>
          <div>
            <h4 className={styles.sectionTitle}>
              <span>Specific folder with a pagination of 3 files</span>
            </h4>
            {/* Get specific folder with a pagination of 3 files */}
            <FileList
              itemId={itemId}
              pageSize={3}
            ></FileList>
          </div>
          <div>
            <h4 className={styles.sectionTitle}>
              <span>Trending file list</span>
            </h4>
            {/* Get the trending file list */}
            <FileList
              insightType='trending'
            ></FileList>
          </div>
          <div>
            <h4 className={styles.sectionTitle}>
              <span>Shared file list</span>
            </h4>
            {/* Get the shared file list */}
            <FileList
              insightType='shared'
            ></FileList>
          </div>
          <div>
            <h4 className={styles.sectionTitle}>
              <span>Enable file upload for one file, does not accept xlsx and zip extensions</span>
            </h4>
            {/* FileList with upload enabled only for one item and does not accept xlsx and zip file extensions */}
            {/* pageSize is only to avoid showing too many files, it's not a requirement to use the upload function */}
            <FileList
              itemId={itemId}
              enableFileUpload={true}
              maxUploadFile={1}
              excludedFileExtensions={['.xlsx', '.zip']}
              pageSize={3}
            ></FileList>
          </div>
        </div>
      </section>
    );
  }
}
