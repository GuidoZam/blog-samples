import * as React from 'react';
import type { IMaskedTextFieldSampleProps } from './IMaskedTextFieldSampleProps';
import { MaskedTextField } from '@fluentui/react';

export default class MaskedTextFieldSample extends React.Component<IMaskedTextFieldSampleProps, {}> {
  public render(): React.ReactElement<IMaskedTextFieldSampleProps> {

    // Returns multiple samples of how to use the MaskedTextField control to validate a phone number, a VAT number and a date
    return (
      <section>
        <MaskedTextField
          label="Phone number"
          mask="(999) 999-9999"
          maskChar=" "
          placeholder="Phone number"
          required={true}
          errorMessage="Please enter a valid phone number"
          />
        <MaskedTextField
          label="VAT number"
          mask="** 9999999999999"
          maskChar=" "
          placeholder="VAT number"
          required={true}
          errorMessage="Please enter a valid VAT number"
          />
        <MaskedTextField
          label="Date"
          mask="99/99/9999"
          maskChar=" "
          placeholder="Date"
          required={true}
          errorMessage="Please enter a valid date"
          />
      </section>
    );
  }
}
