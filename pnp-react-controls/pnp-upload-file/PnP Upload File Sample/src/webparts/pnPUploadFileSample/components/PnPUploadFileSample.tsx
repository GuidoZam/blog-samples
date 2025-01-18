import * as React from 'react';
import * as strings from 'PnPUploadFileSampleWebPartStrings';
import styles from './PnPUploadFileSample.module.scss';
import type { IPnPUploadFileSampleProps } from './IPnPUploadFileSampleProps';
import {
  UploadFiles,
} from '@pnp/spfx-controls-react/lib/UploadFiles';
import { Toggle } from '@fluentui/react';
import { IPnPUploadFileSampleState } from './IPnPUploadFileSampleState';

export default class PnPUploadFileSample extends React.Component<IPnPUploadFileSampleProps, IPnPUploadFileSampleState> {
  constructor(props: IPnPUploadFileSampleProps) {
    super(props);

    this.state = {
      useTheme: true,
    };
  }

  public render(): React.ReactElement<IPnPUploadFileSampleProps> {
    const { context, themeVariant } = this.props;
    const { useTheme } = this.state;

    return (
      <section className={styles.pnPUploadFileSample}>
        <div>
          <h3>{strings.Title}</h3>
          <div>
            <Toggle 
              label={strings.UseThemeToggle}
              onText={strings.UseThemeToggleOn}
              offText={strings.UseThemeToggleOff}
              checked={useTheme}
              onChange={(_, checked) => this.setState({ useTheme: checked ?? false })} />
          </div>
          <UploadFiles
            context={context}
            title={strings.UploadFiles}
            themeVariant={(useTheme === true ? themeVariant : undefined)} 
            onUploadFiles={(files) => {
              const dialogMessage = strings.DialogMessage.replace('{0}', files.length.toString());
              alert(dialogMessage);
              console.log(files);
            }}
          />
        </div>
      </section>
    );
  }
}
