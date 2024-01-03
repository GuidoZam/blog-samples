import * as React from 'react';
import styles from './HelloWorld.module.scss';
import type { IHelloWorldProps } from './IHelloWorldProps';
import * as _old from 'lodash-old';
import * as _ from 'lodash-new';
import { IHelloWorldState } from './IHelloWorldState';
import { PrimaryButton } from '@fluentui/react';

export default class HelloWorld extends React.Component<IHelloWorldProps, IHelloWorldState> {
  // Sample source elements
  private characters = [
    { 'user': 'Mario', 'age': 25, 'active': true },
    { 'user': 'Luigi', 'age': 30, 'active': false },
    { 'user': 'Bowser', 'age': 34, 'active': true }
  ];

  /**
   *
   */
  constructor(props: IHelloWorldProps) {
    super(props);
    
    this.state = {
      results: []
    };
  }

  public render(): React.ReactElement<IHelloWorldProps> {

    return (
      <section className={styles.helloWorld}>
        <div>
          <h3>Let's filter Super Mario characters!</h3>
          <div>
            <h4>Characters</h4>
            <ul>
              {this.characters.map((character, index) => {
                return <li key={index}>{character.user}</li>;
              })}
            </ul>
          </div>
          <PrimaryButton onClick={() => this.showResults()}>Show results</PrimaryButton>
          {this.state.results && this.state.results.length > 0 && <div>
            <h4>Results</h4>
            <ul>
              {this.state.results.map((result, index) => {
                return <li key={index}>{result}</li>;
              })}
            </ul>
          </div>}
        </div>
      </section>
    );
  }

  private showResults(): void {
    // New package version
    const a = _.find(this.characters, { 'age': 34, 'active': true });
    const b = _.find(this.characters, 'active');

    console.log(a);
    console.log(b);

    // Old package version
    const c = _old.findWhere(this.characters, { 'age': 25, 'active': true })
    const d = _old.findWhere(this.characters, { 'active': false });

    console.log(c);
    console.log(d);

    this.setState({
      results: [
        a?.user!,
        b?.user!,
        c?.user!,
        d?.user!,
      ]
    });
  }
}
