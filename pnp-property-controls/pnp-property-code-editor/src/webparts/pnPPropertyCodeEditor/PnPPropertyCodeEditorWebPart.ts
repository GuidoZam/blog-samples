import * as React from 'react';
import * as ReactDom from 'react-dom';
import { Version } from '@microsoft/sp-core-library';
import {
  PropertyPaneHorizontalRule,
  type IPropertyPaneConfiguration
} from '@microsoft/sp-property-pane';
import { BaseClientSideWebPart } from '@microsoft/sp-webpart-base';
import * as strings from 'PnPPropertyCodeEditorWebPartStrings';
import PnPPropertyCodeEditor from './components/PnPPropertyCodeEditor';
import { IPnPPropertyCodeEditorProps } from './components/IPnPPropertyCodeEditorProps';
import {
	PropertyFieldCodeEditor,
  PropertyFieldCodeEditorLanguages,
} from "@pnp/spfx-property-controls/lib/PropertyFieldCodeEditor";

export interface IPnPPropertyCodeEditorWebPartProps {
	basicValue: string;
	initialValue: string;
  languageValue: string;
  disabledValue: string;
  readonlyValue: string;
  optionsValue: string;
}

export default class PnPPropertyCodeEditorWebPart extends BaseClientSideWebPart<IPnPPropertyCodeEditorWebPartProps> {

  public render(): void {
    const element: React.ReactElement<IPnPPropertyCodeEditorProps> =
			React.createElement(PnPPropertyCodeEditor, {
				basicValue: this.properties.basicValue,
        initialValue: this.properties.initialValue,
        languageValue: this.properties.languageValue,
        disabledValue: this.properties.disabledValue,
        readonlyValue: this.properties.readonlyValue,
        optionsValue: this.properties.optionsValue,
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
								PropertyFieldCodeEditor("basicValue", {
									label: strings.BasicValueLabel,
									panelTitle: strings.BasicValueFieldPanelTitle,
									properties: this.properties,
									key: "basicValueField",
									onPropertyChange: this.onPropertyPaneFieldChanged,
								}),
								PropertyPaneHorizontalRule(),
								PropertyFieldCodeEditor("initialValue", {
									label: strings.InitialValueLabel,
									panelTitle: strings.InitialValueFieldPanelTitle,
									properties: this.properties,
									key: "initialValueField",
									onPropertyChange: this.onPropertyPaneFieldChanged,
									initialValue: "console.log('Hello, world!');",
								}),
								PropertyPaneHorizontalRule(),
								PropertyFieldCodeEditor("languageValue", {
									label: strings.LanguageValueLabel,
									panelTitle: strings.LanguageValueFieldPanelTitle,
									properties: this.properties,
									key: "languageValueField",
									onPropertyChange: this.onPropertyPaneFieldChanged,
									language: PropertyFieldCodeEditorLanguages.JSON,
								}),
								PropertyPaneHorizontalRule(),
								PropertyFieldCodeEditor("disabledValue", {
									label: strings.DisabledValueLabel,
									panelTitle: strings.DisabledValueFieldPanelTitle,
									properties: this.properties,
									key: "disabledValueField",
									onPropertyChange: this.onPropertyPaneFieldChanged,
									language: PropertyFieldCodeEditorLanguages.Sass,
									initialValue: "body {\n  background-color: #f0f0f0;\n}",
									disabled: true,
								}),
								PropertyPaneHorizontalRule(),
								PropertyFieldCodeEditor("readonlyValue", {
									label: strings.ReadonlyValueLabel,
									panelTitle: strings.ReadonlyValueFieldPanelTitle,
									properties: this.properties,
									key: "readonlyValueField",
									onPropertyChange: this.onPropertyPaneFieldChanged,
									language: PropertyFieldCodeEditorLanguages.XML,
									initialValue: 
                  `<options>\n\t<option value='1'>Option 1</option>\n\t<option value='2'>Option 2</option>\n</options>`,
									options: {
										readOnly: true,
									},
								}),
								PropertyPaneHorizontalRule(),
								PropertyFieldCodeEditor("optionsValue", {
									label: strings.OptionsValueLabel,
									panelTitle: strings.OptionsValueFieldPanelTitle,
									properties: this.properties,
									key: "optionsValueField",
									onPropertyChange: this.onPropertyPaneFieldChanged,
									language: PropertyFieldCodeEditorLanguages.TypeScript,
									options: {
										selectionStyle: "line",
										highlightActiveLine: false,
										showLineNumbers: false,
										cursorStyle: "wide",
										wrap: true
									},
								}),
								PropertyPaneHorizontalRule(),
							],
						},
					],
				},
			],
		};
  }
}
