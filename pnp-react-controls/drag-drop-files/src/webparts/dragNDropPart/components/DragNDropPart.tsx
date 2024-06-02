import * as React from 'react';
import styles from './DragNDropPart.module.scss';
import * as strings from 'DragNDropPartWebPartStrings';
import type { IDragNDropPartProps } from './IDragNDropPartProps';
import { DragDropFiles } from "@pnp/spfx-controls-react/lib/DragDropFiles";
import { IDragNDropPartState } from './IDragNDropPartState';
import { Icon, IconButton } from '@fluentui/react';
import {
  getFileTypeIconProps,
  initializeFileTypeIcons
} from "@fluentui/react-file-type-icons";

export default class DragNDropPart extends React.Component<IDragNDropPartProps, IDragNDropPartState> {
  constructor(props: IDragNDropPartProps) {
    super(props);

    initializeFileTypeIcons();

    this.state = {
      files: []
    };
  }

  public render(): React.ReactElement<IDragNDropPartProps> {
    return (
      <section className={styles.dragNDropPart}>
        <h3>{strings.Title}</h3>
        <div>
          <DragDropFiles
            dropEffect="copy"
            enable={true}
            onDrop={(files: File[]) => {
              for (let i = 0; i < files.length; i++) {
                // Add the file to the state
                this.setState({
                  files: this.state.files.concat(files[i])
                });
              }
            }}
            iconName="Upload"
            labelMessage={strings.DropMessage}
          >
            {strings.DropLabel}
          </DragDropFiles>
          {this.state.files.length > 0 &&
          <div>
            <h3>{strings.FileListTitle}</h3>
            {this.state.files.map((file, index) => {
              return (
                <div className={styles.row} key={index}>
                  <IconButton
                    iconProps={{ iconName: 'Download', title: strings.DownloadIconTitle}}
                    onClick={() => this._downloadFile(file)} />
                  <IconButton
                    iconProps={{ iconName: 'Delete', title: strings.DeleteIconTitle}}
                    onClick={() => {
                      const newFiles = this.state.files.filter((f) => f.name !== file.name);
                      this.setState({
                        files: newFiles
                      });
                    }} />
                  <Icon
                    {...getFileTypeIconProps({
                      extension: this._getFileExtension(file),
                      size: 20,
                      imageFileType: "png"
                    })}
                    className={styles.rowFileIcon}
                  />
                  <span className={styles.rowText}>{file.name}</span>
                </div>
              );
            })}
          </div>}
        </div>
      </section>
    );
  }

  private _downloadFile(file: File): void {
    file.arrayBuffer().then((buffer) => {
      const blob = new Blob([buffer], { type: file.type });
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = file.name;
      a.click();
      window.URL.revokeObjectURL(url);
    })
    .catch((error) => {
      console.log(error);
    })
  }

  private _getFileExtension(file: File): string | undefined {
    return file.name.split('.').pop();
  }
}
