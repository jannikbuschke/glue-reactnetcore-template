import * as React from "react";
import {
  Input,
  FormikDebug,
  SubmitButton,
  FormItem,
  ResetButton
} from "@jbuschke/formik-antd";
import { Formik } from "formik";
import { message, Button } from "antd";

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
        email: "",
        firstName: "",
        lastName: "",
        phone: ""
      }}
      validate={values => {
        return values.firstName ? undefined : { firstName: "required" };
      }}
      onSubmit={async values => {
        const response = await fetch("/api/Contacts/create?api-version=1.0", {
          method: "POST",
          body: JSON.stringify(values),
          headers: { "content-type": "application/json" }
        });
        if (response.ok) {
          message.success("success");
        } else {
          message.error("error: " + response.statusText);
        }
      }}
    >
      <div>
        <div style={{ display: "grid", gridGap: 10, maxWidth: 400 }}>
          <h2>Create Contact</h2>
          <Button.Group>
            <SubmitButton>Create</SubmitButton>
            <ResetButton>Reset</ResetButton>
          </Button.Group>
          <FormItem name="firstName" label="Firstname">
            <Input name="firstName" />
          </FormItem>
          <FormItem name="lastName" label="Lastname">
            <Input name="lastName" />
          </FormItem>
          <FormItem name="email" label="Email">
            <Input name="email" />
          </FormItem>
          <FormItem name="phone" label="Phone">
            <Input name="phone" />
          </FormItem>
        </div>
        <div>
          <FormikDebug />
        </div>
      </div>
    </Formik>
  );
};
