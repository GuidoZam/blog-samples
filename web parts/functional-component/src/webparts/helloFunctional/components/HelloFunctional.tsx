import * as React from 'react';
import styles from './HelloFunctional.module.scss';
import type { IHelloFunctionalProps } from './IHelloFunctionalProps';
import * as strings from 'HelloFunctionalWebPartStrings';

const HelloFunctional: React.FC<IHelloFunctionalProps> = (props) => {
  const [count, setCount] = React.useState(0);

  return (
    <section className={styles.helloFunctional}>
      <div>
        <h3>{strings.Title}</h3>
        <div>
          {strings.FunctionalMessage}
        </div>
        <div style={{ marginTop: '1em' }}>
          <div>{strings.Counter}: {count}</div>
          <button className={styles.counterButton} onClick={() => setCount(count + 1)}>
            {strings.Increment}
          </button>
          <button className={styles.counterButton} style={{ marginLeft: '0.5em' }} onClick={() => setCount(0)}>
            {strings.Reset}
          </button>
        </div>
      </div>
    </section>
  );
};

export default HelloFunctional;
