import * as React from 'react';

export interface ICustomComponentProps {
  children: React.ReactElement<ICustomComponentChildProps>[];
}

export interface ICustomComponentChildProps {
  label: string;
}

export interface ICustomComponentTitleProps extends ICustomComponentChildProps {
  showBigger: boolean;
}

export class Title extends React.Component<ICustomComponentTitleProps, {}> {
  public render(): React.ReactElement<ICustomComponentTitleProps> {
    const showBigger = this.props.showBigger;
    let result = undefined;

    if (showBigger) {
      result = <h1>{this.props.label}</h1>;
    }
    else {
      result = <h2>{this.props.label}</h2>;
    }

    return (
      <div>
        {result}
      </div>
    );
  }
}

export class Child extends React.Component<ICustomComponentChildProps, {}> {
  public render(): React.ReactElement<ICustomComponentChildProps> {
    return (
      <div>
        <p>{this.props.label}</p>
      </div>
    );
  }
}

export class CustomComponent extends React.Component<ICustomComponentProps, {}> {
  public render(): React.ReactElement<ICustomComponentProps> {
    return (
      <section>
        {this.props.children}
        {/* <Title label={this.props.title.props.label} showBigger={true} />
        <Child label={this.props.children.props.label} /> */}
      </section>
    );
  }
}
