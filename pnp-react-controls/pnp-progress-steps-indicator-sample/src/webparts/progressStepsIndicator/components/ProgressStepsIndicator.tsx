import * as React from 'react';
import styles from './ProgressStepsIndicator.module.scss';
import type { IProgressStepsIndicatorProps } from './IProgressStepsIndicatorProps';
import type { IProgressStepsIndicatorState } from './IProgressStepsIndicatorState';
import { ProgressStepsIndicator } from '@pnp/spfx-controls-react/lib/ProgressStepsIndicator';
import { PrimaryButton, DefaultButton } from '@fluentui/react/lib/Button';
import * as strings from 'ProgressStepsIndicatorWebPartStrings';

export default class ProgressStepsIndicatorComponent extends React.Component<IProgressStepsIndicatorProps, IProgressStepsIndicatorState> {
  
  constructor(props: IProgressStepsIndicatorProps) {
    super(props);
    
    this.state = {
      currentStep1: 0,
      currentStep2: 1,
      currentStep3: 0
    };
  }

  private _onPreviousStep = (): void => {
    this.setState((prevState) => ({
      currentStep3: Math.max(0, prevState.currentStep3 - 1)
    }));
  }

  private _onNextStep = (): void => {
    this.setState((prevState) => ({
      currentStep3: Math.min(5, prevState.currentStep3 + 1)
    }));
  }

  private _onResetSteps = (): void => {
    this.setState({ currentStep3: 0 });
  }

  public render(): React.ReactElement<IProgressStepsIndicatorProps> {
    const fiveSteps = [
      { id: 0, title: "Step 1", description: strings.Step1_Planning },
      { id: 1, title: "Step 2", description: strings.Step2_Design },
      { id: 2, title: "Step 3", description: strings.Step3_Development },
      { id: 3, title: "Step 4", description: strings.Step4_Deployment },
      { id: 4, title: "Step 5", description: strings.Step5_Monitoring }
    ];

    const threeSteps = [
      { id: 0, title: "Step 1", description: strings.Step1_GetStarted },
      { id: 1, title: "Step 2", description: strings.Step2_Configure },
      { id: 2, title: "Step 3", description: strings.Step3_Complete }
    ];

    const sixSteps = [
      { id: 0, title: "Step 1", description: strings.Step1_Start },
      { id: 1, title: "Step 2", description: strings.Step2_Requirements },
      { id: 2, title: "Step 3", description: strings.Step3_Build },
      { id: 3, title: "Step 4", description: strings.Step4_Validation },
      { id: 4, title: "Step 5", description: strings.Step5_Deploy },
      { id: 5, title: "Step 6", description: strings.Step6_Support }
    ];

    return (
      <section className={`${styles.progressStepsIndicator}`}>
        <div className={styles.container}>
          <h1 className={styles.title}>{strings.Title}</h1>

          {/* Scenario 1: Basic Five-Step Process */}
          <div className={styles.section}>
            <h2 className={styles.sectionTitle}>{strings.BasicFiveSteps}</h2>
            <p className={styles.sectionDescription}>
              {strings.BasicFiveStepsDescription}
            </p>
            <ProgressStepsIndicator 
              steps={fiveSteps}
              currentStep={this.state.currentStep1}
            />
            <div className={styles.selection}>
              {strings.CurrentStepLabel}: <strong>{fiveSteps[this.state.currentStep1].description}</strong>
            </div>
          </div>

          {/* Scenario 2: Three-Step Process (Step 2 Active) */}
          <div className={styles.section}>
            <h2 className={styles.sectionTitle}>{strings.ThreeStepProcess}</h2>
            <p className={styles.sectionDescription}>
              {strings.ThreeStepProcessDescription}
            </p>
            <ProgressStepsIndicator 
              steps={threeSteps}
              currentStep={this.state.currentStep2}
            />
            <div className={styles.selection}>
              {strings.CurrentStepLabel}: <strong>{threeSteps[this.state.currentStep2].description}</strong>
            </div>
          </div>

          {/* Scenario 4: Dynamic Navigation with Controls */}
          <div className={styles.section}>
            <h2 className={styles.sectionTitle}>{strings.DynamicNavigation}</h2>
            <p className={styles.sectionDescription}>
              {strings.SelectStepLabel}
            </p>
            <ProgressStepsIndicator 
              steps={sixSteps}
              currentStep={this.state.currentStep3}
            />
            <div className={styles.selection}>
              {strings.CurrentStepLabel}: <strong>{sixSteps[this.state.currentStep3].description}</strong>
            </div>
            <div className={styles.buttonGroup}>
              <DefaultButton 
                text={strings.PreviousButton}
                onClick={this._onPreviousStep}
                disabled={this.state.currentStep3 === 0}
              />
              <PrimaryButton 
                text={strings.NextButton}
                onClick={this._onNextStep}
                disabled={this.state.currentStep3 === sixSteps.length - 1}
              />
              <DefaultButton 
                text={strings.ResetButton}
                onClick={this._onResetSteps}
              />
            </div>
          </div>
        </div>
      </section>
    );
  }
}
