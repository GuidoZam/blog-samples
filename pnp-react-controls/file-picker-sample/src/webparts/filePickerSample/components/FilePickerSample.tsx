import * as React from 'react';
import styles from './FilePickerSample.module.scss';
import type { IFilePickerSampleProps } from './IFilePickerSampleProps';
import { FilePicker, IFilePickerResult } from '@pnp/spfx-controls-react/lib/FilePicker';
import { spfi, SPFx } from "@pnp/sp";
import "@pnp/sp/webs";
import "@pnp/sp/files";
import "@pnp/sp/folders";

export default class FilePickerSample extends React.Component<IFilePickerSampleProps, {}> {
  public render(): React.ReactElement<IFilePickerSampleProps> {
    const {
      hasTeamsContext
    } = this.props;

    const sp = spfi().using(SPFx(this.props.context));

    return (
      <section className={`${styles.filePickerSample} ${hasTeamsContext ? styles.teams : ''}`}>
        <div>
          <FilePicker 
            context={this.props.context as any}
            onSave={(filePickerResult: IFilePickerResult[]) => {
              filePickerResult.forEach(file => {
                const fileNamePath = file.fileName;
                
                file.downloadFileContent().then(fileContent => {
                  // you can adjust this number to control what size files are uploaded in chunks
                  if (file.fileSize && file.fileSize <= 10485760) {
                    // small upload
                    sp.web.getFolderByServerRelativePath("Shared Documents")
                      .files.addUsingPath(fileNamePath, fileContent, { Overwrite: true })
                      .then(() => {
                        console.log(`Small file ${fileNamePath} uploaded successfully`);
                      })
                      .catch((error) => {
                        console.error(`Error uploading small file ${fileNamePath}: ${error}`);
                      });
                  } else {
                    // large upload
                    sp.web.getFolderByServerRelativePath("Shared Documents")
                    .files.addChunked(fileNamePath, fileContent)
                      .then(() => {
                        console.log(`Large file ${fileNamePath} uploaded successfully`);
                      })
                      .catch((error) => {
                        console.error(`Error uploading large file ${fileNamePath}: ${error}`);
                      });
                  }
                });
              });
            }}
            onChange={(filePickerResult: IFilePickerResult[]) => console.log(filePickerResult)}
            buttonLabel="Upload"
            accepts={[".docx", ".pptx", ".xlsx"]}
            hideOneDriveTab={true}
            hideSiteFilesTab={true}
            hideLinkUploadTab={true}
            hideWebSearchTab={true}
            hideOrganisationalAssetTab={true}
            hideStockImages={true}
            hideRecentTab={true}
            allowExternalLinks={false}
          />
        </div>
      </section>
    );
  }
}
