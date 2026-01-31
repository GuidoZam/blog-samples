export interface IPnPPropertyPaneOrderingProps {
  orderedMarioCharacters: Array<{text: string, icon: string}>;
  minimalOrder: Array<{text: string, icon: string}>;
  disabledOrder: Array<{text: string, icon: string}>;
  noArrowsOrder: Array<{text: string, icon: string}>;
  noDragDropOrder: Array<{text: string, icon: string}>;
  customIconsOrder: Array<{text: string, icon: string}>;
  customRenderOrder: Array<{text: string, icon: string}>;
  strings: any;
}
