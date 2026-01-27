import * as React from 'react';
import * as ReactDom from 'react-dom';
import { Version } from '@microsoft/sp-core-library';
import {
  type IPropertyPaneConfiguration,
  PropertyPaneTextField
} from '@microsoft/sp-property-pane';
import { BaseClientSideWebPart } from '@microsoft/sp-webpart-base';
import { PropertyFieldOrder } from '@pnp/spfx-property-controls/lib/PropertyFieldOrder';

import * as strings from 'PnPPropertyPaneOrderingWebPartStrings';
import PnPPropertyPaneOrdering from './components/PnPPropertyPaneOrdering';
import { IPnPPropertyPaneOrderingProps } from './components/IPnPPropertyPaneOrderingProps';

export interface IPnPPropertyPaneOrderingWebPartProps {
	orderedMarioCharacters: Array<{ text: string; iconName: string }>;
	// Minimal
	minimalOrder: Array<any>;
	// Disabled
	disabledOrder: Array<any>;
	// No Arrows
	noArrowsOrder: Array<any>;
	// No Drag Drop
	noDragDropOrder: Array<any>;
	// Custom Icons
	customIconsOrder: Array<any>;
	customUpIcon: string;
	customDownIcon: string;
	// Custom render
	customRenderOrder: Array<any>;
}

export default class PnPPropertyPaneOrderingWebPart extends BaseClientSideWebPart<IPnPPropertyPaneOrderingWebPartProps> {

  public render(): void {
    // Initialize default Mario characters for all instances
    const defaultMarioCharacters = [
        {"text": "Mario", "iconName": "Contact"},
        {"text": "Luigi", "iconName": "ContactCard"},
        {"text": "Princess Peach", "iconName": "Crown"},
        {"text": "Bowser", "iconName": "DragonRoaring"},
        {"text": "Yoshi", "iconName": "Dinosaur"},
        {"text": "Toad", "iconName": "MushroomIcon"}
      ];

    // Initialize all PropertyFieldOrder instances if not set
    if (!this.properties.minimalOrder || this.properties.minimalOrder.length === 0) {
      this.properties.minimalOrder = [...defaultMarioCharacters];
    }
    if (!this.properties.disabledOrder || this.properties.disabledOrder.length === 0) {
      this.properties.disabledOrder = [...defaultMarioCharacters];
    }
    if (!this.properties.noArrowsOrder || this.properties.noArrowsOrder.length === 0) {
      this.properties.noArrowsOrder = [...defaultMarioCharacters];
    }
    if (!this.properties.noDragDropOrder || this.properties.noDragDropOrder.length === 0) {
      this.properties.noDragDropOrder = [...defaultMarioCharacters];
    }
    if (!this.properties.customIconsOrder || this.properties.customIconsOrder.length === 0) {
      this.properties.customIconsOrder = [...defaultMarioCharacters];
    }
    if (!this.properties.customRenderOrder || this.properties.customRenderOrder.length === 0) {
      this.properties.customRenderOrder = [...defaultMarioCharacters];
    }

    // Initialize default custom icon names if not set
    if (!this.properties.customUpIcon) this.properties.customUpIcon = 'ChevronUpSmall';
    if (!this.properties.customDownIcon) this.properties.customDownIcon = 'ChevronDownSmall';

    // Use the first instance (minimalOrder) for the main display
    this.properties.orderedMarioCharacters = this.properties.minimalOrder;

    const element: React.ReactElement<IPnPPropertyPaneOrderingProps> = React.createElement(
      PnPPropertyPaneOrdering,
      {
        orderedMarioCharacters: this.properties.orderedMarioCharacters,
        minimalOrder: this.properties.minimalOrder,
        disabledOrder: this.properties.disabledOrder,
        noArrowsOrder: this.properties.noArrowsOrder,
        noDragDropOrder: this.properties.noDragDropOrder,
        customIconsOrder: this.properties.customIconsOrder,
        customRenderOrder: this.properties.customRenderOrder,
        strings: strings
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
            description: strings.DemoPageDescription
          },
          groups: [
            {
              groupName: strings.MinimalOrderGroupName,
              groupFields: [
                PropertyFieldOrder('minimalOrder', {
                  key: 'minimalOrderFieldId',
                  label: strings.MinimalOrderLabel,
                  items: this.properties.minimalOrder,
                  textProperty: 'text',
                  properties: this.properties,
                  onPropertyChange: this.onPropertyPaneFieldChanged
                })
              ]
            },
            {
              groupName: strings.DisabledOrderGroupName,
              groupFields: [
                PropertyFieldOrder('disabledOrder', {
                  key: 'disabledOrderFieldId',
                  label: strings.DisabledOrderLabel,
                  items: this.properties.disabledOrder,
                  textProperty: 'text',
                  disabled: true,
                  properties: this.properties,
                  onPropertyChange: this.onPropertyPaneFieldChanged
                })
              ]
            },
            {
              groupName: strings.NoArrowsOrderGroupName,
              groupFields: [
                PropertyFieldOrder('noArrowsOrder', {
                  key: 'noArrowsOrderFieldId',
                  label: strings.NoArrowsOrderLabel,
                  items: this.properties.noArrowsOrder,
                  textProperty: 'text',
                  removeArrows: true,
                  properties: this.properties,
                  onPropertyChange: this.onPropertyPaneFieldChanged
                })
              ]
            },
            {
              groupName: strings.NoDragDropOrderGroupName,
              groupFields: [
                PropertyFieldOrder('noDragDropOrder', {
                  key: 'noDragDropOrderFieldId',
                  label: strings.NoDragDropOrderLabel,
                  items: this.properties.noDragDropOrder,
                  textProperty: 'text',
                  disableDragAndDrop: true,
                  properties: this.properties,
                  onPropertyChange: this.onPropertyPaneFieldChanged
                })
              ]
            },
            {
              groupName: strings.CustomIconsOrderGroupName,
              groupFields: [
                PropertyFieldOrder('customIconsOrder', {
                  key: 'customIconsOrderFieldId',
                  label: strings.CustomIconsOrderLabel,
                  items: this.properties.customIconsOrder,
                  textProperty: 'text',
                  moveUpIconName: this.properties.customUpIcon,
                  moveDownIconName: this.properties.customDownIcon,
                  properties: this.properties,
                  onPropertyChange: this.onPropertyPaneFieldChanged
                }),
                PropertyPaneTextField('customUpIcon', {
                  label: strings.CustomUpIconLabel,
                  value: this.properties.customUpIcon
                }),
                PropertyPaneTextField('customDownIcon', {
                  label: strings.CustomDownIconLabel,
                  value: this.properties.customDownIcon
                })
              ]
            },
            {
              groupName: strings.CustomRenderGroupName,
              groupFields: [
                PropertyFieldOrder('customRenderOrder', {
                  key: 'customeRenderOrderFieldId',
                  label: strings.CustomRenderLabel,
                  items: this.properties.customRenderOrder,
                  onRenderItem: this.renderMarioCharacter,
                  properties: this.properties,
                  onPropertyChange: this.onPropertyPaneFieldChanged,
                })
              ]
            }
          ]
        }
      ]
    };
  }

  private renderMarioCharacter = (item: {text: string, iconName: string}, index: number): JSX.Element => {
    // Map character names to emoji icons as a reliable fallback
    const emojiMap: {[key: string]: string} = {
      'Mario': '🍄',
      'Luigi': '👑', 
      'Princess Peach': '👸',
      'Bowser': '🐲',
      'Yoshi': '🦕',
      'Toad': '🍄'
    };
    
    const emoji = emojiMap[item.text] || '⭐';
    
    return React.createElement('span', {
      style: { display: 'flex', alignItems: 'center' }
    },
      React.createElement('span', {
        style: { marginRight: '8px', fontSize: '16px' }
      }, emoji),
      item.text
    );
  }
}
