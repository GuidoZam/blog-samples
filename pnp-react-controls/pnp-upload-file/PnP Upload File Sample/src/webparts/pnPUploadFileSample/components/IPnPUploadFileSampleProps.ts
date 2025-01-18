import { IReadonlyTheme } from "@microsoft/sp-component-base";
import { WebPartContext } from "@microsoft/sp-webpart-base";

export interface IPnPUploadFileSampleProps {
  context: WebPartContext;
  themeVariant: IReadonlyTheme;
}
