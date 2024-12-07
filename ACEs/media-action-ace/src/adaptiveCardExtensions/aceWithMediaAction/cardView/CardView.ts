import {
  BaseComponentsCardView,
  ComponentsCardViewParameters,
  BasicCardView,
  MediaType,
  IActionArguments
} from '@microsoft/sp-adaptive-card-extension-base';
import * as strings from 'AceWithMediaActionAdaptiveCardExtensionStrings';
import {
  IAceWithMediaActionAdaptiveCardExtensionProps,
  IAceWithMediaActionAdaptiveCardExtensionState
} from '../AceWithMediaActionAdaptiveCardExtension';

export class CardView extends BaseComponentsCardView<
	IAceWithMediaActionAdaptiveCardExtensionProps,
	IAceWithMediaActionAdaptiveCardExtensionState,
	ComponentsCardViewParameters
> {
	public get cardViewParameters(): ComponentsCardViewParameters {
    const { filesUploaded } = this.state;
    // Map the selected file/s to a string
    const fileStrings = filesUploaded?.map(f => f.fileName)?.join("\r\n");

    const mediaType: MediaType = this.properties.mediaType ? MediaType[this.properties.mediaType as keyof typeof MediaType] : MediaType.Document;

		return BasicCardView({
			cardBar: {
				componentName: "cardBar",
				title: this.properties.title,
			},
			header: {
				componentName: "text",
				text:
					strings.PrimaryText +
					(filesUploaded.length > 0 ? `\r\n${fileStrings}` : ""),
			},
			footer: {
				componentName: "cardButton",
				title: strings.SelectFile,
				action: {
					type: "VivaAction.SelectMedia",
					parameters: {
						mediaType: mediaType,
						allowMultipleCapture: true,
					},
				},
			},
		});
	}

	onAction(action: IActionArguments): void {
    if (action.type === "VivaAction.SelectMedia") {
      const files = action.media;

      this.setState({
        filesUploaded: files
      });
    }
  }
}
