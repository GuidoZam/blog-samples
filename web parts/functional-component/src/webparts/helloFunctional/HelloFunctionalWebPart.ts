import * as React from 'react';
import * as ReactDom from 'react-dom';
import { Version } from '@microsoft/sp-core-library';
import { BaseClientSideWebPart, IPropertyPaneConfiguration, PropertyPaneToggle } from '@microsoft/sp-webpart-base';
import HelloFunctional from './components/HelloFunctional';
import HelloClass from './components/HelloClass';
import { IHelloFunctionalProps } from './components/IHelloFunctionalProps';
import { IHelloClassProps } from './components/IHelloClassProps';

export interface IHelloFunctionalWebPartProps {
  useClassComponent: boolean;
}

export default class HelloFunctionalWebPart extends BaseClientSideWebPart<IHelloFunctionalWebPartProps> {

  public render(): void {
    const element = this.properties.useClassComponent
      ? React.createElement(HelloClass, {} as IHelloClassProps)
      : React.createElement(HelloFunctional, {} as IHelloFunctionalProps);

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
            description: 'Component Switcher'
          },
          groups: [
            {
              groupName: 'Settings',
              groupFields: [
                PropertyPaneToggle('useClassComponent', {
                  label: 'Use class component',
                  onText: 'Class',
                  offText: 'Functional'
                })
              ]
            }
          ]
        }
      ]
    };
  }
}
