export interface IPnPPropertyPaneOrderingProps {
  orderedMarioCharacters: Array<{text: string, iconName: string}>;
  minimalOrder: Array<{text: string, iconName: string}>;
  disabledOrder: Array<{text: string, iconName: string}>;
  noArrowsOrder: Array<{text: string, iconName: string}>;
  noDragDropOrder: Array<{text: string, iconName: string}>;
  customIconsOrder: Array<{text: string, iconName: string}>;
  customRenderOrder: Array<{text: string, iconName: string}>;
  strings: any;
}
