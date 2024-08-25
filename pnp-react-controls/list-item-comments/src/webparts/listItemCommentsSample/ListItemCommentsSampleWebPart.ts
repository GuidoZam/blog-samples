import * as React from 'react';
import * as ReactDom from 'react-dom';
import { Version } from '@microsoft/sp-core-library';
import {
  type IPropertyPaneConfiguration
} from '@microsoft/sp-property-pane';
import { BaseClientSideWebPart } from '@microsoft/sp-webpart-base';

import * as strings from "ListItemCommentsSampleWebPartStrings";
import ListItemCommentsSample from "./components/ListItemCommentsSample";
import { IListItemCommentsSampleProps } from "./components/IListItemCommentsSampleProps";

import {
	PropertyFieldListPicker,
	PropertyFieldListPickerOrderBy,
} from "@pnp/spfx-property-controls/lib/PropertyFieldListPicker";

export interface IListItemCommentsSampleWebPartProps {
	listId: string;
}

export default class ListItemCommentsSampleWebPart extends BaseClientSideWebPart<IListItemCommentsSampleWebPartProps> {
	public render(): void {
		const element: React.ReactElement<IListItemCommentsSampleProps> =
			React.createElement(ListItemCommentsSample, {
				listId: this.properties.listId,
				context: this.context
			});

		ReactDom.render(element, this.domElement);
	}

	protected onDispose(): void {
		ReactDom.unmountComponentAtNode(this.domElement);
	}

	protected get dataVersion(): Version {
		return Version.parse("1.0");
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
								PropertyFieldListPicker("listId", {
									label: strings.SelectListLabel,
									selectedList: this.properties.listId,
									includeHidden: false,
									orderBy: PropertyFieldListPickerOrderBy.Title,
									onPropertyChange: this.onPropertyPaneFieldChanged.bind(this),
									properties: this.properties,
									context: this.context,
									key: "listPickerFieldId",
								}),
							],
						},
					],
				},
			],
		};
	}
}
