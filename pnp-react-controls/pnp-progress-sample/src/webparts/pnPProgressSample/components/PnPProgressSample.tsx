import * as React from 'react';
import styles from './PnPProgressSample.module.scss';
import type { IPnPProgressSampleProps } from './IPnPProgressSampleProps';
import * as strings from 'PnPProgressSampleWebPartStrings';
import { IProgressAction, Progress } from "@pnp/spfx-controls-react";
import { InitialAction, PrerequisitesAction, MainAction, FinalAction } from './actions';
import { IPnPProgressSampleState } from './IPnPProgressSampleState';
import { DefaultButton, PrimaryButton } from '@fluentui/react';

export default class PnPProgressSample extends React.Component<IPnPProgressSampleProps, IPnPProgressSampleState> {
  constructor(props: IPnPProgressSampleProps) {
    super(props);

    this.state = {
      currentActionIndex: 0
    };
  }

  public render(): React.ReactElement<IPnPProgressSampleProps> {
    const { showProgress, showIndeterminateOverallProgress, hideNotStartedActions } = this.props;
    const { currentActionIndex } = this.state;
    const actions = this._getActions();

    return (
      <section className={styles.pnPProgressSample}>
        <h3>{strings.Title}</h3>
        <div>
          <Progress
            title={strings.ProgressTitle}
            showOverallProgress={showProgress}
            showIndeterminateOverallProgress={showIndeterminateOverallProgress}
            hideNotStartedActions={hideNotStartedActions}
            actions={actions}
            currentActionIndex={this.state.currentActionIndex}
            longRunningText={strings.LongRunningText}
            longRunningTextDisplayDelay={7000}
            />
        </div>
        <div className={styles.content}>
          <DefaultButton
            text={strings.Buttons.Back}
            onClick={() => {
              const newIndex = currentActionIndex - 1 < 0 ? 0 : currentActionIndex - 1;
              this.setState({ currentActionIndex: newIndex });
            }}
            disabled={currentActionIndex === 0}
          />
          <div className={styles.contentText}>{strings.JustPlayWithButtonsText}</div>
          <PrimaryButton
            text={strings.Buttons.Next}
            onClick={() => {
              const newIndex = currentActionIndex + 1 > actions.length ? actions.length : currentActionIndex + 1;
              this.setState({ currentActionIndex: newIndex });
            }}
            disabled={currentActionIndex === (actions.length)}
          />
        </div>
      </section>
    );
  }

  private _getActions(): IProgressAction[] {
    return [
      new InitialAction(),
      new PrerequisitesAction(),
      new MainAction(),
      new FinalAction()
    ];
  }
}
