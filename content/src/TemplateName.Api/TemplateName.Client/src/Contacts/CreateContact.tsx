import * as React from 'react';
import { FormikDebug } from '@jbuschke/formik-antd';
import { DefaultContactEditor } from './DefaultContactEditor';
import {
  DetailView,
  createPostSubmitHandler,
  PostAction,
  ValidationErrors,
} from '@jbuschke/react-glue';
import { createValidationHandler } from '../Validation/createValidationHandler';

export interface Contact {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
}

const validationHandler = createValidationHandler(
  '/api/Contacts/validate-create-contact?api-version=1.0',
);
const submitHandler = createPostSubmitHandler(
  '/api/Contacts/create-contact?api-version=1.0',
);

export const CreateContact = (props: any) => {
  return (
    <DetailView
      initialValues={{
        email: '',
        firstName: '',
        lastName: '',
        phone: '',
      }}
      validate={validationHandler}
      onSubmit={submitHandler}
      renderActions={props => (
        <PostAction onClick={props.handleSubmit} loading={props.isSubmitting} />
      )}
      renderContent={() => (
        <>
          <DefaultContactEditor />
          <div style={{ marginTop: 15 }}>
            <FormikDebug />
          </div>
        </>
      )}
    />
  );
};
