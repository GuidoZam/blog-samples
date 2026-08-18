import * as React from 'react';
import * as ReactDom from 'react-dom';
import { Version } from '@microsoft/sp-core-library';
import {
  IPropertyPaneConfiguration,
  PropertyPaneTextField
} from '@microsoft/sp-property-pane';
import { BaseClientSideWebPart } from '@microsoft/sp-webpart-base';
import {
	PropertyFieldListPicker,
	PropertyFieldListPickerOrderBy,
} from "@pnp/spfx-property-controls/lib/PropertyFieldListPicker";
import * as strings from 'ViewPickerWebPartStrings';
import ViewPicker from './components/ViewPicker';
import { IViewPickerProps } from './components/IViewPickerProps';

export interface IViewPickerWebPartProps {
  description: string;
  listId: string;
	defaultSelectedView: string;
}

export default class ViewPickerWebPart extends BaseClientSideWebPart<IViewPickerWebPartProps> {

  public render(): void {
    const element: React.ReactElement<IViewPickerProps> = React.createElement(
      ViewPicker,
      {
        description: this.properties.description,
        context: this.context,
        listId: this.properties.listId,
				defaultSelectedView: this.properties.defaultSelectedView
      }
    );

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
								PropertyPaneTextField("description", {
									label: strings.DescriptionFieldLabel,
								}),
								PropertyFieldListPicker("listId", {
									label: strings.ListIdFieldLabel,
									selectedList: this.properties.listId,
									includeHidden: false,
									orderBy: PropertyFieldListPickerOrderBy.Title,
									onPropertyChange: this.onPropertyPaneFieldChanged.bind(this),
									properties: this.properties,
									context: this.context as any,
									key: "listIdFieldId",
								}),
								PropertyPaneTextField("defaultSelectedView", {
									label: strings.DefaultSelectedViewFieldLabel,
								}),
							],
						},
					],
				},
			],
		};
  }
}
