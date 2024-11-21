import { DisplayMode } from "@microsoft/sp-core-library";
import { WebPartContext } from "@microsoft/sp-webpart-base";

export interface IPnPPlaceholderControlProps {
  context: WebPartContext;
  displayMode: DisplayMode;
}
