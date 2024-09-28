declare interface IStylingMgtWebPartStrings {
  Title: string;
  ChangegButtonText: string;
  PropertyPane: {
    Description: string;
    GroupName: string;
    ComponentTypeField: {
      ThemeToggleOptionText: string;
      ManualThemeToggleOptionText: string;
      CustomizeCSSTokenOptionText: string;
    }
  }
}

declare module 'StylingMgtWebPartStrings' {
  const strings: IStylingMgtWebPartStrings;
  export = strings;
}
