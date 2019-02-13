import * as React from 'react';
import { DefaultContactEditor } from './DefaultContactEditor';
import { Field, Formik } from 'formik';
import { Button } from 'antd';

const SubmitAction = () => (
  <Field>
    {(field, form) => (
      <Button style={{ marginTop: 15 }} onClick={field.form.handleSubmit}>
        Submit
      </Button>
    )}
  </Field>
);

export const EditContact = () => (
  <Formik initialValues={{}} onSubmit={() => {}}>
    <>
      <h3>Edit Contact</h3>
      <DefaultContactEditor />
      <SubmitAction />
    </>
  </Formik>
);
