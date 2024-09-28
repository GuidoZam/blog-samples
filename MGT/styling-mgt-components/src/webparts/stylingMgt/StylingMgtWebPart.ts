import * as React from 'react';
import * as ReactDom from 'react-dom';
import { Version } from '@microsoft/sp-core-library';
import { BaseClientSideWebPart } from '@microsoft/sp-webpart-base';
import * as strings from "StylingMgtWebPartStrings";
import { Providers, customElementHelper } from "@microsoft/mgt-element";
import { SharePointProvider } from "@microsoft/mgt-sharepoint-provider";
import { lazyLoadComponent } from "@microsoft/mgt-spfx-utils";
import { PropertyPaneDropdown } from '@microsoft/sp-property-pane';

customElementHelper.withDisambiguation("styling-mgt-components");

const StylingMgtThemeToggleComponent = React.lazy(
	() =>
		import(
			/* webpackChunkName: 'mgt-react-component' */
			"./components/StylingMgtThemeToggle/StylingMgtThemeToggle"
		)
);

const StylingMgtManualThemeToggleComponent = React.lazy(
	() =>
		import(
			/* webpackChunkName: 'mgt-react-component' */
			"./components/StylingMgtManualThemeToggle/StylingMgtManualThemeToggle"
		)
);

const StylingMgtCustomizeCSSTokenComponent = React.lazy(
	() =>
		import(
			/* webpackChunkName: 'mgt-react-component' */
			"./components/StylingMgtCustomizeCSSToken/StylingMgtCustomizeCSSToken"
		)
);

export interface IStylingMgtWebPartProps {
	componentType: string;
}

export default class StylingMgtWebPart extends BaseClientSideWebPart<IStylingMgtWebPartProps> {

	public render(): void {
    let element: any = undefined;

    switch (this.properties.componentType) {
      case "StylingMgtManualThemeToggle":
        element = lazyLoadComponent(StylingMgtManualThemeToggleComponent, {});
        break;
			case "StylingMgtCustomizeCSSToken":
				element = lazyLoadComponent(StylingMgtCustomizeCSSTokenComponent, {});
				break;
      default:
        element = lazyLoadComponent(StylingMgtThemeToggleComponent, {});
        break;
    }

		ReactDom.render(element, this.domElement);
	}

	protected onInit(): Promise<void> {
		if (!Providers.globalProvider) {
			Providers.globalProvider = new SharePointProvider(this.context);
		}

		return super.onInit();
	}

	protected onDispose(): void {
		ReactDom.unmountComponentAtNode(this.domElement);
	}

	protected get dataVersion(): Version {
		return Version.parse("1.0");
	}

  protected getPropertyPaneConfiguration(): any {
    return {
			pages: [
				{
					header: {
						description: strings.PropertyPane.Description,
					},
					groups: [
						{
							groupName: strings.PropertyPane.GroupName,
							groupFields: [
								PropertyPaneDropdown("componentType", {
									label: "Component Type",
									options: [
										{
											key: "StylingMgtThemeToggle",
											text: strings.PropertyPane.ComponentTypeField.ThemeToggleOptionText,
										},
                    {
                      key: "StylingMgtManualThemeToggle",
                      text: strings.PropertyPane.ComponentTypeField.ManualThemeToggleOptionText,
                    },
										{
											key: "StylingMgtCustomizeCSSToken",
											text: strings.PropertyPane.ComponentTypeField.CustomizeCSSTokenOptionText,
										}
									],
								}),
							],
						},
					],
				},
			],
		};
  }
}
