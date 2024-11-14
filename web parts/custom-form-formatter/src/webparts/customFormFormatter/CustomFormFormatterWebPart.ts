import * as React from 'react';
import * as ReactDom from 'react-dom';
import { Version } from '@microsoft/sp-core-library';
import {
  type IPropertyPaneConfiguration,
  PropertyPaneTextField
} from '@microsoft/sp-property-pane';
import { BaseClientSideWebPart } from '@microsoft/sp-webpart-base';
import {
	PropertyFieldCodeEditor,
	PropertyFieldCodeEditorLanguages,
} from "@pnp/spfx-property-controls/lib/PropertyFieldCodeEditor";
import * as strings from 'CustomFormFormatterWebPartStrings';
import CustomFormFormatter from './components/CustomFormFormatter';
import { ICustomFormFormatterProps } from './components/ICustomFormFormatterProps';

export interface ICustomFormFormatterWebPartProps {
	siteUrl: string;
	listId: string;
	contentTypeId: string;
	jsonHeaderFormat: string;
	jsonBodyFormat: string;
	jsonFooterFormat: string;
}

export default class CustomFormFormatterWebPart extends BaseClientSideWebPart<ICustomFormFormatterWebPartProps> {

  public render(): void {
    const element: React.ReactElement<ICustomFormFormatterProps> =
			React.createElement(CustomFormFormatter, {
				siteUrl: this.properties.siteUrl,
				listId: this.properties.listId,
				contentTypeId: this.properties.contentTypeId,
				jsonHeaderFormat: this.properties.jsonHeaderFormat,
        jsonBodyFormat: this.properties.jsonBodyFormat,
        jsonFooterFormat: this.properties.jsonFooterFormat
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
							groupName: strings.BasicGroupName,
							groupFields: [
								PropertyPaneTextField("siteUrl", {
									label: strings.SiteUrlFieldLabel,
								}),
								PropertyPaneTextField("listId", {
									label: strings.TargetListFieldLabel,
								}),
								PropertyPaneTextField("contentTypeId", {
									label: strings.ContentTypeFieldLabel,
								}),
								PropertyFieldCodeEditor("jsonHeaderFormat", {
									label: strings.JsonHeaderFormatFieldLabel,
									panelTitle: strings.JsonHeaderFormatFieldLabel,
									initialValue: this.properties.jsonHeaderFormat,
									onPropertyChange: this.onPropertyPaneFieldChanged,
									properties: this.properties,
									disabled: false,
									key: "jsonHeaderFormatFieldId",
									language: PropertyFieldCodeEditorLanguages.JSON,
									options: {
										wrap: false,
									},
								}),
								PropertyFieldCodeEditor("jsonBodyFormat", {
									label: strings.JsonBodyFormatFieldLabel,
									panelTitle: strings.JsonBodyFormatFieldLabel,
									initialValue: this.properties.jsonBodyFormat,
									onPropertyChange: this.onPropertyPaneFieldChanged,
									properties: this.properties,
									disabled: false,
									key: "jsonBodyFormatFieldId",
									language: PropertyFieldCodeEditorLanguages.JSON,
									options: {
										wrap: false,
									},
								}),
								PropertyFieldCodeEditor("jsonFooterFormat", {
									label: strings.JsonFooterFormatFieldLabel,
									panelTitle: strings.JsonFooterFormatFieldLabel,
									initialValue: this.properties.jsonFooterFormat,
									onPropertyChange: this.onPropertyPaneFieldChanged,
									properties: this.properties,
									disabled: false,
									key: "jsonFooterFormatFieldId",
									language: PropertyFieldCodeEditorLanguages.JSON,
									options: {
										wrap: false,
									},
								}),
							],
						},
					],
				},
			],
		};
  }
}
