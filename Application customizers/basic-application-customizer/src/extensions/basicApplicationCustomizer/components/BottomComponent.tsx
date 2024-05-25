import * as React from "react";
import { CommandBar, ICommandBarItemProps } from 'office-ui-fabric-react/lib/CommandBar';

export interface IBottomComponentProps { }

export default class BottomComponent extends React.Component<IBottomComponentProps> {
  constructor(props: IBottomComponentProps) {
    super(props);
  }

  public render(): JSX.Element {
    return (
      <div>
        <CommandBar
          items={this.getItems()}
        />
      </div>
    );
  }

  // Data for CommandBar  
  private getItems = (): ICommandBarItemProps[] => {
    return [
      {
        key: 'blog',
        name: 'Open Blog',
        iconProps: {
          iconName: 'Globe'
        },
        href: 'http://iamguidozam.blog/',
        target: '_blank'
      },
      {
        key: 'pnpGettingStarted',
        name: 'Getting started',
        iconProps: {
          iconName: 'Heart'
        },
        href: 'https://pnp.github.io/blog/post/spfx-03-getting-started-with-spfx-extensions-for-spo/',
        target: '_blank'
      }
    ];
  }
}  