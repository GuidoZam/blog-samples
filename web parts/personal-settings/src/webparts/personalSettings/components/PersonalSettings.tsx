import * as React from 'react';
import styles from './PersonalSettings.module.scss';
import type { IPersonalSettingsProps } from './IPersonalSettingsProps';
import { PrimaryButton, DefaultButton } from '@fluentui/react/lib/Button';
import { TextField } from '@fluentui/react/lib/TextField';
import { MessageBar, MessageBarType } from '@fluentui/react/lib/MessageBar';
import { IDriveItem } from '../services/GraphInterfaces';
import * as strings from 'PersonalSettingsWebPartStrings';

interface IPersonalSettingsState {
  items: IDriveItem[];
  loading: boolean;
  message: string;
  messageType: MessageBarType;
  settingsData: string;
  loadingContent: boolean;
}

export default class PersonalSettings extends React.Component<IPersonalSettingsProps, IPersonalSettingsState> {
  private readonly SETTINGS_FILE_NAME = 'personal-settings.json';

  constructor(props: IPersonalSettingsProps) {
    super(props);
    
    this.state = {
      items: [],
      loading: false,
      message: '',
      messageType: MessageBarType.info,
      settingsData: '',
      loadingContent: false
    };
  }

  public componentDidMount(): void {
  }

  private async loadSettings(): Promise<void> {
    const result = await this.props.graphService.readJsonFile<any>(this.SETTINGS_FILE_NAME);
    
    if (result.success && result.data) {
      this.setState({
        settingsData: JSON.stringify(result.data, null, 2)
      });
    } else {
      // If file doesn't exist or there's an error, initialize with default settings
      const defaultSettings = {
        theme: "light",
        notifications: true,
        lastUpdated: new Date().toISOString()
      };
      this.setState({
        settingsData: JSON.stringify(defaultSettings, null, 2)
      });
      
      // Only show error message if it's not a "file not found" type error
      if (result.error && !result.error.includes('not found') && !result.error.includes('does not exist')) {
        this.setState({
          message: `Note: Could not load existing settings (${result.error}). Using defaults.`,
          messageType: MessageBarType.warning
        });
      }
    }
  }

  private onContentChange = (event: React.FormEvent<HTMLInputElement | HTMLTextAreaElement>, newValue?: string): void => {
    const content = newValue || '';
    this.setState({
      settingsData: content
    });
  }

  private async saveContent(): Promise<void> {
    const content = this.state.settingsData;
    
    if (!content.trim()) {
      this.setState({
        message: 'No content to save',
        messageType: MessageBarType.warning
      });
      return;
    }

    this.setState({ loadingContent: true });
    
    // Default to saving as JSON config file
    let fileName = this.SETTINGS_FILE_NAME;
    let contentType = 'application/json';
    
    // Try to parse as JSON to validate
    try {
      JSON.parse(content);
    } catch {
      // If not valid JSON, save as text file
      fileName = 'content.txt';
      contentType = 'text/plain';
    }
    
    const result = await this.props.graphService.uploadFile(
      fileName,
      content,
      contentType
    );
    
    if (result.success) {
      this.setState({
        loadingContent: false,
        settingsData: '',
        message: `Successfully saved to ${fileName}`,
        messageType: MessageBarType.success
      });
    } else {
      this.setState({
        loadingContent: false,
        message: result.error || 'Failed to save content',
        messageType: MessageBarType.error
      });
    }
  }

  private dismissMessage = (): void => {
    this.setState({ message: '' });
  }

  public render(): React.ReactElement<IPersonalSettingsProps> {
    const { loading, message, messageType, settingsData, loadingContent } = this.state;

    return (
      <section className={styles.personalSettings}>
        <h2>{strings.Title}</h2>
        
        {message && (
          <MessageBar
            messageBarType={messageType}
            onDismiss={this.dismissMessage}
            dismissButtonAriaLabel="Close"
          >
            {message}
          </MessageBar>
        )}

        <div style={{ marginTop: '20px' }}>
          <div style={{ marginBottom: '10px' }}>
            <PrimaryButton
              text={strings.SaveConfig}
              onClick={() => this.saveContent()}
              disabled={loading || loadingContent}
            />
            <DefaultButton
              text={strings.LoadConfig}
              onClick={() => this.loadSettings()}
              disabled={loading}
              style={{ marginLeft: '10px' }}
            />
          </div>
          
          <TextField
            label={strings.ConfigLabel}
            multiline
            rows={10}
            value={settingsData}
            onChange={this.onContentChange}
            placeholder={strings.ConfigContentPlaceholder}
            disabled={loadingContent}
          />
          
          {loadingContent && (
            <div style={{ marginTop: '10px' }}>
              <em>{strings.Loading}</em>
            </div>
          )}
        </div>
      </section>
    );
  }
}
