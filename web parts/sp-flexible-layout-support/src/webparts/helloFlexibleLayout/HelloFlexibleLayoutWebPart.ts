import * as React from 'react';
import * as ReactDom from 'react-dom';
import { Version } from '@microsoft/sp-core-library';
import { BaseClientSideWebPart } from '@microsoft/sp-webpart-base';

import HelloFlexibleLayout from './components/HelloFlexibleLayout';
import { IHelloFlexibleLayoutProps } from './components/IHelloFlexibleLayoutProps';

export interface IHelloFlexibleLayoutWebPartProps {
}

export default class HelloFlexibleLayoutWebPart extends BaseClientSideWebPart<IHelloFlexibleLayoutWebPartProps> {
  protected async onInit(): Promise<void> {
    const packageSolution: any = await require("../../../config/package-solution.json");
    console.log(`HelloFlexibleLayoutWebPart: v.${packageSolution.solution.version}`);
  }

  public render(): void {
    const element: React.ReactElement<IHelloFlexibleLayoutProps> = React.createElement(
      HelloFlexibleLayout,
      {}
    );

    ReactDom.render(element, this.domElement);
  }

  protected onDispose(): void {
    ReactDom.unmountComponentAtNode(this.domElement);
  }

  protected get dataVersion(): Version {
    return Version.parse('1.0');
  }
}
