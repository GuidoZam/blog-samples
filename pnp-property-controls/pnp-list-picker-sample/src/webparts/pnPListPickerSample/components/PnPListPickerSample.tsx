import * as React from 'react';
import * as strings from 'PnPListPickerSampleWebPartStrings';
import styles from './PnPListPickerSample.module.scss';
import type { IPnPListPickerSampleProps } from './IPnPListPickerSampleProps';

export default class PnPListPickerSample extends React.Component<IPnPListPickerSampleProps> {
  public render(): React.ReactElement<IPnPListPickerSampleProps> {
    const {
      minimal,
      list,
      lists,
      orderByList,
      hiddenList,
      onErrorList,
      extendedList
    } = this.props;

    return (
      <section className={styles.pnPListPickerSample}>
        <div>
          <h2>{strings.Title}</h2>
          <div>
            {strings.MinimalSelectedList}: {minimal === undefined || minimal.length === 0 ? strings.NoListSelected : minimal}
          </div>
          <div>
            {strings.ListSelectedList}: {list === undefined || list.length === 0 ? strings.NoListSelected : list}
          </div>
          <div>
            {strings.ListsSelectedList}: {lists === undefined || lists.length === 0 && strings.NoListSelected}
            {lists && lists.length > 0 && <ul>{lists.map((l, i) => <li key={i}>{l}</li>)}</ul>}
          </div>
          <div>
            {strings.OrderBySelectedList}: {orderByList === undefined || orderByList.length === 0 ? strings.NoListSelected : orderByList}
          </div>
          <div>
            {strings.HiddenSelectedList}: {hiddenList === undefined || hiddenList.length === 0 ? strings.NoListSelected : hiddenList}
          </div>
          <div>
            {strings.OnErrorSelectedList}: {onErrorList === undefined || onErrorList.length === 0 ? strings.NoListSelected : onErrorList}
          </div>
          <div>
            {strings.ExtendedListPickerFieldLabel}:
            {extendedList && 
            <ul>
              <li>{extendedList.id}</li>
              <li>{extendedList.title}</li>
              <li>{extendedList.url}</li>
            </ul>}
          </div>
        </div>
      </section>
    );
  }
}
