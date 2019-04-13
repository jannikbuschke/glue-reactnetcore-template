import * as React from 'react';
import { InputField, FormikDebug } from '@jbuschke/formik-antd';
import { Formik } from 'formik';
import { message, Button } from 'antd';

interface Contact {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
}

export const CreateContact = (props: any) => {
  return (
    <Formik<Contact>
      initialValues={{
        email: '',
        firstName: '',
        lastName: '',
        phone: '',
      }}
      onSubmit={async values => {
        const response = await fetch(
          '/api/Contacts/create-contact?api-version=1.0',
          {
            method: 'POST',
            body: JSON.stringify(values),
            headers: { 'content-type': 'application/json' },
          },
        );
        if (response.ok) {
          message.success('success');
        } else {
          message.error('error: ' + response.statusText);
        }
      }}
    >
      {formik => (
        <div style={{ margin: 30 }}>
          <div style={{ display: 'grid', gridGap: 10, maxWidth: 500 }}>
            <h3>Create Contact</h3>
            <span>Firstname</span>
            <InputField name="firstName" />
            <span>Lastname</span>
            <InputField name="lastName" />
            <span>Email</span>
            <InputField name="email" />
            <span>Phone</span>
            <InputField name="phone" />
            <Button onClick={() => formik.handleSubmit()}>submit</Button>
          </div>
          <div>
            <FormikDebug />
          </div>
        </div>
      )}
    </Formik>
  );
};
