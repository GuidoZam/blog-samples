import * as React from 'react';
import * as ReactDom from 'react-dom';
import { Version } from '@microsoft/sp-core-library';
import {
  type IPropertyPaneConfiguration,
  PropertyPaneTextField,
  PropertyPaneToggle
} from '@microsoft/sp-property-pane';
import { BaseClientSideWebPart } from '@microsoft/sp-webpart-base';

import * as strings from 'MermaidDiagramWebPartStrings';
import MermaidDiagram from './components/MermaidDiagram';
import { IMermaidDiagramProps } from './components/IMermaidDiagramProps';
import {
	PropertyFieldCodeEditor,
	PropertyFieldCodeEditorLanguages,
} from "@pnp/spfx-property-controls/lib/PropertyFieldCodeEditor";

export interface IMermaidDiagramWebPartProps {
	title: string;
	mermaidDiagram: string;
	showTitle: boolean;
	showBorder: boolean;
}

export default class MermaidDiagramWebPart extends BaseClientSideWebPart<IMermaidDiagramWebPartProps> {

  protected async onInit(): Promise<void> {
    await super.onInit();

    // Default properties values
    if (this.properties.title === undefined) {
      this.properties.title = strings.DefaultTitle;
    }

    if (this.properties.showTitle === undefined) {
      this.properties.showTitle = true;
    }

    if (this.properties.showBorder === undefined) {
      this.properties.showBorder = true;
    }
  }

  public render(): void {
    const element: React.ReactElement<IMermaidDiagramProps> =
			React.createElement(MermaidDiagram, {
        title: this.properties.title,
				mermaidDiagram: this.properties.mermaidDiagram,
				showTitle: this.properties.showTitle,
				showBorder: this.properties.showBorder
			});

    ReactDom.render(element, this.domElement);
  }

  protected onDispose(): void {
    ReactDom.unmountComponentAtNode(this.domElement);
  }

  protected get dataVersion(): Version {
    return Version.parse('1.0');
  }

  protected getPropertyPaneConfiguration(): IPropertyPaneConfiguration {
    return {
			pages: [
				{
					header: {
						description: strings.PropertyPaneDescription,
					},
					groups: [
						{
							groupName: strings.ConfigurationGroupName,
							groupFields: [
								PropertyPaneTextField("title", {
									label: strings.TitleFieldLabel,
									value: this.properties.title,
								}),
								PropertyFieldCodeEditor("mermaidDiagram", {
									label: strings.MermaidDiagramFieldLabel,
									panelTitle: strings.MermaidDiagramPanelTitle,
									initialValue: this.properties.mermaidDiagram,
									onPropertyChange: this.onPropertyPaneFieldChanged,
									properties: this.properties,
									disabled: false,
									key: "mermaidDiagramCodeEditor",
									language: PropertyFieldCodeEditorLanguages["Plain Text"],
									options: {
										wrap: false,
										fontSize: 20,
									},
								}),
							],
						},
						{
							groupName: strings.StylingGroupName,
							groupFields: [
								PropertyPaneToggle("showTitle", {
									label: strings.ShowTitleFieldLabel,
									checked: this.properties.showTitle,
								}),
								PropertyPaneToggle("showBorder", {
									label: strings.ShowBorderFieldLabel,
									checked: this.properties.showBorder,
								}),
							],
						},
					],
				},
			],
		};
  }
}
