import * as React from 'react';
import {
  InputField,
  InputNumberField,
  SwitchField,
  TextAreaField,
  DateEditor,
  EnumStringEditor,
  FormikDebug,
} from '@jbuschke/formik-antd';
import { Formik } from 'formik';
import { Divider } from 'antd';
import './SampleForm.css';

export const SampleForm = (props: any) => {
  return (
    <Formik
      initialValues={{
        email: 'sample@email.com',
        index: 5,
        applyForNewsletter: false,
        description: 'lorem ipsum',
        date: null,
      }}
      onSubmit={values => console.log('values', values)}
    >
      <div className="split">
        <div>
          <h3>Simple fields</h3>
          <div className="field-container">
            <span>InputField</span>
            <InputField name="email" />
            <span>TextAreaField</span>
            <TextAreaField name="description" />
            <span>InputNumberField</span>
            <InputNumberField name="index" />
            <span>SwitchField</span>
            <div>
              <SwitchField name="applyForNewsletter" />
            </div>
            <span>DateField</span>
            <DateEditor name="date" />
            <h3 style={{ gridColumnStart: 1, gridColumnEnd: 3 }}>
              Lists and enums
            </h3>
            <span>RadioGroupField</span>
            <EnumStringEditor
              name="enumString"
              dataSource={[
                { displayName: 'Val 1', value: 'val1' },
                { displayName: '5', value: 5 },
              ]}
            />
          </div>
        </div>
        <Divider type="vertical" style={{ height: '100%' }} />
        <div>
          <FormikDebug />
        </div>
      </div>
    </Formik>
  );
};
