import * as React from 'react';
import { InputField } from '@jbuschke/formik-antd';
import { FormItem } from '../Validation/FormItem';

export const DefaultContactEditor = () => (
  <div>
    <FormItem name="firstName" label="Firstname">
      <InputField name="firstName" />
    </FormItem>
    <FormItem name="lastName" label="Lastname">
      <InputField name="lastName" />
    </FormItem>
    <FormItem name="email" label="Email">
      <InputField name="email" />
    </FormItem>
    <FormItem name="phone" label="Phone">
      <InputField name="phone" />
    </FormItem>
  </div>
);
