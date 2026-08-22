declare interface IProgressStepsIndicatorWebPartStrings {
  PropertyPaneDescription: string;
  BasicGroupName: string;
  DescriptionFieldLabel: string;

  Title: string;
  
  // Scenario Titles
  BasicFiveSteps: string;
  ThreeStepProcess: string;
  DynamicNavigation: string;

  // Scenario Descriptions
  BasicFiveStepsDescription: string;
  ThreeStepProcessDescription: string;
  
  // Labels and Descriptions
  SelectStepLabel: string;
  CurrentStepLabel: string;
  PreviousButton: string;
  NextButton: string;
  ResetButton: string;
  
  // Step Descriptions for Scenario 1 (5 steps)
  Step1_Planning: string;
  Step2_Design: string;
  Step3_Development: string;
  Step4_Deployment: string;
  Step5_Monitoring: string;
  
  // Step Descriptions for Scenario 2 (3 steps)
  Step1_GetStarted: string;
  Step2_Configure: string;
  Step3_Complete: string;
  
  // Step Descriptions for Scenario 4 (6 steps)
  Step1_Start: string;
  Step2_Requirements: string;
  Step3_Build: string;
  Step4_Validation: string;
  Step5_Deploy: string;
  Step6_Support: string;
}

declare module 'ProgressStepsIndicatorWebPartStrings' {
  const strings: IProgressStepsIndicatorWebPartStrings;
  export = strings;
}
