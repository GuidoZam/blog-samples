import * as React from 'react';
import styles from './FilePickerSample.module.scss';
import type { IFilePickerSampleProps } from './IFilePickerSampleProps';
import { FilePicker, IFilePickerResult } from '@pnp/spfx-controls-react/lib/FilePicker';
import * as strings from 'FilePickerSampleWebPartStrings';
import { PrimaryButton, MessageBar, MessageBarType, DefaultButton, Toggle, Stack } from '@fluentui/react';

interface IFilePickerSampleState {
  // Track selected files for each example
  example1File: IFilePickerResult | undefined;
  example2File: IFilePickerResult | undefined;
  example3File: IFilePickerResult | undefined;
  example3Changed: boolean;
  example4File: IFilePickerResult | undefined;
  example4Cancelled: boolean;
  example5File: IFilePickerResult | undefined;
  example6File: IFilePickerResult | undefined;
  example7File: IFilePickerResult | undefined;
  example8File: IFilePickerResult | undefined;
  example8PanelOpen: boolean;
  example9File: IFilePickerResult | undefined;
  example10File: IFilePickerResult | undefined;
  // Tab visibility toggles
  hideRecentTab: boolean;
  hideWebSearchTab: boolean;
  hideStockImages: boolean;
  hideOrganisationalAssetTab: boolean;
  hideOneDriveTab: boolean;
  hideSiteFilesTab: boolean;
  hideLocalUploadTab: boolean;
  hideLocalMultipleUploadTab: boolean;
  hideLinkUploadTab: boolean;
}

export default class FilePickerSample extends React.Component<IFilePickerSampleProps, IFilePickerSampleState> {
  
  constructor(props: IFilePickerSampleProps) {
    super(props);
    
    this.state = {
      example1File: undefined,
      example2File: undefined,
      example3File: undefined,
      example3Changed: false,
      example4File: undefined,
      example4Cancelled: false,
      example5File: undefined,
      example6File: undefined,
      example7File: undefined,
      example8File: undefined,
      example8PanelOpen: false,
      example9File: undefined,
      example10File: undefined,
      // Initialize all tabs as visible (false = not hidden)
      hideRecentTab: false,
      hideWebSearchTab: false,
      hideStockImages: false,
      hideOrganisationalAssetTab: false,
      hideOneDriveTab: false,
      hideSiteFilesTab: false,
      hideLocalUploadTab: false,
      hideLocalMultipleUploadTab: false,
      hideLinkUploadTab: false
    };
  }

  public render(): React.ReactElement<IFilePickerSampleProps> {
    const { hasTeamsContext } = this.props;

    return (
      <section className={`${styles.filePickerSample} ${hasTeamsContext ? styles.teams : ''}`}>
        <div className={styles.container}>
          <h1 className={styles.title}>{strings.PageTitle}</h1>
          <p className={styles.description}>{strings.PageDescription}</p>
          
          {/* Example 1: Minimal Configuration */}
          {this._renderExample(
            strings.Example1Title,
            <FilePicker
              label={strings.SelectFile}
              onSave={(files) => this.setState({ example1File: files?.[0] })}
              context={this.props.context as any}
            />,
            this.state.example1File,
            () => this.setState({ example1File: undefined })
          )}

          {/* Example 2: Button Icon */}
          {this._renderExample(
            strings.Example2Title,
            <FilePicker
              label={strings.PickDocument}
              buttonIcon="FabricFolder"
              buttonIconProps={{ 
                iconName: 'FabricFolder',
                styles: { root: { fontSize: 20, color: '#0078d4' } }
              }}
              onSave={(files) => this.setState({ example2File: files?.[0] })}
              context={this.props.context as any}
            />,
            this.state.example2File,
            () => this.setState({ example2File: undefined })
          )}

          {/* Example 3: onChange Handler */}
          <div className={styles.exampleSection}>
            <h2 className={styles.exampleTitle}>{strings.Example3Title}</h2>
            <div className={styles.pickerContainer}>
              <FilePicker
                label={strings.SelectFile}
                buttonLabel={strings.FilePickerButtonLabel}
                onSave={(files) => this.setState({ example3File: files?.[0], example3Changed: false })}
                onChange={(files) => {
                  console.log('File selection changed:', files);
                  this.setState({ example3Changed: true });
                }}
                context={this.props.context as any}
              />
              {this.state.example3Changed && (
                <MessageBar messageBarType={MessageBarType.info} className={styles.infoMessage}>
                  {strings.FileChangedMessage}
                </MessageBar>
              )}
            </div>
            {this._renderFileInfo(this.state.example3File, () => this.setState({ example3File: undefined, example3Changed: false }))}
          </div>

          {/* Example 4: onCancel Handler */}
          <div className={styles.exampleSection}>
            <h2 className={styles.exampleTitle}>{strings.Example4Title}</h2>
            <div className={styles.pickerContainer}>
              <FilePicker
                label={strings.SelectFile}
                buttonLabel={strings.FilePickerButtonLabel}
                onSave={(files) => this.setState({ example4File: files?.[0], example4Cancelled: false })}
                onCancel={() => {
                  console.log('File picker cancelled');
                  this.setState({ example4Cancelled: true });
                }}
                context={this.props.context as any}
              />
              {this.state.example4Cancelled && (
                <MessageBar messageBarType={MessageBarType.warning} className={styles.infoMessage}>
                  {strings.FileCancelledMessage}
                </MessageBar>
              )}
            </div>
            {this._renderFileInfo(this.state.example4File, () => this.setState({ example4File: undefined, example4Cancelled: false }))}
          </div>

          {/* Example 5: File Type Restrictions */}
          {this._renderExample(
            strings.Example5Title,
            <FilePicker
              label={strings.OnlyDocxPdfLabel}
              buttonLabel={strings.FilePickerButtonLabel}
              accepts={['.docx', '.pdf']}
              onSave={(files) => this.setState({ example5File: files?.[0] })}
              context={this.props.context as any}
            />,
            this.state.example5File,
            () => this.setState({ example5File: undefined })
          )}

          {/* Example 6: Required Field */}
          {this._renderExample(
            strings.Example6Title,
            <FilePicker
              label={strings.RequiredFileLabel}
              buttonLabel={strings.FilePickerButtonLabel}
              required={true}
              onSave={(files) => this.setState({ example6File: files?.[0] })}
              context={this.props.context as any}
            />,
            this.state.example6File,
            () => this.setState({ example6File: undefined })
          )}

          {/* Example 7: Disabled State */}
          {this._renderExample(
            strings.Example7Title,
            <FilePicker
              label={strings.DisabledPickerLabel}
              buttonLabel={strings.FilePickerButtonLabel}
              disabled={true}
              onSave={(files) => this.setState({ example7File: files?.[0] })}
              context={this.props.context as any}
            />,
            this.state.example7File,
            () => this.setState({ example7File: undefined })
          )}

          {/* Example 8: Hidden Control */}
          <div className={styles.exampleSection}>
            <h2 className={styles.exampleTitle}>{strings.Example8Title}</h2>
            <div className={styles.pickerContainer}>
              <DefaultButton
                text={`${strings.ToggleVisibilityButton} (${this.state.example8PanelOpen ? strings.HidePicker : strings.ShowPicker})`}
                onClick={() => this.setState({ example8PanelOpen: !this.state.example8PanelOpen })}
                iconProps={{ iconName: this.state.example8PanelOpen ? 'Hide' : 'View' }}
              />
              <FilePicker
                label={strings.HiddenPickerLabel}
                buttonLabel={strings.FilePickerButtonLabel}
                hidden={true}
                isPanelOpen={this.state.example8PanelOpen}
                onSave={(files) => this.setState({ example8File: files?.[0], example8PanelOpen: false })}
                onCancel={() => this.setState({ example8PanelOpen: false })}
                context={this.props.context as any}
              />
            </div>
            {this._renderFileInfo(this.state.example8File, () => this.setState({ example8File: undefined }))}
          </div>

          {/* Example 10: Tab Visibility Control */}
          <div className={styles.exampleSection}>
            <h2 className={styles.exampleTitle}>{strings.Example10Title}</h2>
            <div className={styles.toggleContainer}>
              <MessageBar messageBarType={MessageBarType.info}>
                {strings.TabVisibilityDescription}
              </MessageBar>
              <Stack tokens={{ childrenGap: 10 }} className={styles.toggleStack}>
                <Toggle
                  label={strings.HideRecentTab}
                  checked={this.state.hideRecentTab}
                  onChange={(_, checked) => this.setState({ hideRecentTab: !!checked })}
                  inlineLabel
                />
                <Toggle
                  label={strings.HideStockImages}
                  checked={this.state.hideStockImages}
                  onChange={(_, checked) => this.setState({ hideStockImages: !!checked })}
                  inlineLabel
                />
                <Toggle
                  label={strings.HideOneDriveTab}
                  checked={this.state.hideOneDriveTab}
                  onChange={(_, checked) => this.setState({ hideOneDriveTab: !!checked })}
                  inlineLabel
                />
                <Toggle
                  label={strings.HideSiteFilesTab}
                  checked={this.state.hideSiteFilesTab}
                  onChange={(_, checked) => this.setState({ hideSiteFilesTab: !!checked })}
                  inlineLabel
                />
                <Toggle
                  label={strings.HideLocalUploadTab}
                  checked={this.state.hideLocalUploadTab}
                  onChange={(_, checked) => this.setState({ hideLocalUploadTab: !!checked })}
                  inlineLabel
                />
                <Toggle
                  label={strings.HideLocalMultipleUploadTab}
                  checked={this.state.hideLocalMultipleUploadTab}
                  onChange={(_, checked) => this.setState({ hideLocalMultipleUploadTab: !!checked })}
                  inlineLabel
                />
                <Toggle
                  label={strings.HideLinkUploadTab}
                  checked={this.state.hideLinkUploadTab}
                  onChange={(_, checked) => this.setState({ hideLinkUploadTab: !!checked })}
                  inlineLabel
                />
              </Stack>
            </div>
            <div className={styles.pickerContainer}>
              <FilePicker
                label={strings.TabVisibilityLabel}
                buttonLabel={strings.FilePickerButtonLabel}
                onSave={(files) => this.setState({ example10File: files?.[0] })}
                context={this.props.context as any}
                hideRecentTab={this.state.hideRecentTab}
                hideStockImages={this.state.hideStockImages}
                hideOneDriveTab={this.state.hideOneDriveTab}
                hideSiteFilesTab={this.state.hideSiteFilesTab}
                hideLocalUploadTab={this.state.hideLocalUploadTab}
                hideLocalMultipleUploadTab={this.state.hideLocalMultipleUploadTab}
                hideLinkUploadTab={this.state.hideLinkUploadTab}
              />
            </div>
            {this._renderFileInfo(this.state.example10File, () => this.setState({ example10File: undefined }))}
          </div>
        </div>
      </section>
    );
  }

  private _renderExample = (
    title: string,
    picker: JSX.Element,
    file: IFilePickerResult | undefined,
    onClear: () => void
  ): JSX.Element => {
    return (
      <div className={styles.exampleSection}>
        <h2 className={styles.exampleTitle}>{title}</h2>
        <div className={styles.pickerContainer}>
          {picker}
        </div>
        {this._renderFileInfo(file, onClear)}
      </div>
    );
  }

  private _renderFileInfo = (
    file: IFilePickerResult | undefined,
    onClear: () => void
  ): JSX.Element | null => {
    if (!file) {
      return (
        <MessageBar messageBarType={MessageBarType.info} className={styles.noFileMessage}>
          {strings.NoFileSelectedMessage}
        </MessageBar>
      );
    }

    return (
      <div className={styles.selectedFileSection}>
        <h3 className={styles.sectionTitle}>{strings.SelectedFileLabel}</h3>
        <div className={styles.fileInfo}>
          <div className={styles.fileInfoRow}>
            <span className={styles.fileInfoLabel}>{strings.FileNameLabel}:</span>
            <span className={styles.fileInfoValue}>{file.fileName}</span>
          </div>
          {file.fileAbsoluteUrl && (
            <div className={styles.fileInfoRow}>
              <span className={styles.fileInfoLabel}>{strings.FileUrlLabel}:</span>
              <a 
                href={file.fileAbsoluteUrl} 
                target="_blank" 
                rel="noopener noreferrer"
                className={styles.fileInfoLink}
              >
                {file.fileAbsoluteUrl}
              </a>
            </div>
          )}
          {file.fileSize && (
            <div className={styles.fileInfoRow}>
              <span className={styles.fileInfoLabel}>{strings.FileSizeLabel}:</span>
              <span className={styles.fileInfoValue}>
                {this._formatFileSize(file.fileSize)}
              </span>
            </div>
          )}
        </div>
        <div className={styles.buttonGroup}>
          <PrimaryButton
            text={strings.ClearSelectionLabel}
            onClick={onClear}
            iconProps={{ iconName: 'Clear' }}
          />
        </div>
      </div>
    );
  }

  private _formatFileSize = (bytes: number): string => {
    if (bytes === 0) return `0 ${strings.BytesLabel}`;
    
    const k = 1024;
    const sizes = [strings.BytesLabel, 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    
    return `${Math.round(bytes / Math.pow(k, i) * 100) / 100} ${sizes[i]}`;
  }
}
