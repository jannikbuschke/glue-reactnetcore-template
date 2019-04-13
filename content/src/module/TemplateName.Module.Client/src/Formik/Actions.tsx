import * as React from "react";

import { Button, message, Popconfirm } from "antd";

import { FormikActions, FormikValues } from "formik";
import { Dispatch } from "redux";
import { routerActions } from "react-router-redux";

export const createPatchSubmitHandler = (url: string) => async (
  values: FormikValues,
  actions: FormikActions<any>
) => {
  try {
    const response = await patchJson(url, values);
    if (response.ok) {
      message.success("Saved");
    } else {
      message.error(response.statusText);
    }
  } catch (E) {
    // tslint:disable-next-line:no-console
    console.log("error", E);
    message.error(E.toString());
  } finally {
    actions.setSubmitting(false);
  }
};

export const patchJson = async (url: string, payload: any) =>
  fetch(url, {
    body: JSON.stringify(payload),
    headers: { "Content-Type": "application/json" },
    method: "PATCH"
  });

export const PatchAction = (props: {
  onClick: (e?: any | undefined) => void;
  loading: boolean;
}) => <Button {...props}>Save</Button>;

export class DeleteAction extends React.Component<{ url: string }> {
  public state = { loading: false };
  public render() {
    const { loading } = this.state;
    return (
      <Popconfirm
        title="Are you sure you want to delete this item?"
        onConfirm={async () => {
          this.setState({ loading: true });
          const response = await fetch(this.props.url, { method: "DELETE" });
          if (response.ok) {
            this.setState({ loading: false });
            message.success("Success");
            // navigate back
          } else {
            message.error(response.statusText);
          }
        }}
      >
        <Button loading={loading} type="danger">
          Delete
        </Button>
      </Popconfirm>
    );
  }
}

export const createPostSubmitHandler = (
  url: string,
  dispatch?: Dispatch<any>
) => async (values: FormikValues, actions: FormikActions<any>) => {
  try {
    const response = await postJson(url, values);
    message.success("Success");
    const payload = await response.json();
    if (dispatch) {
      dispatch(routerActions.replace(payload.id));
    }
  } catch (E) {
    console.log("error", E);
    message.error(E.toString());
  } finally {
    actions.setSubmitting(false);
  }
};

export const postJson = async (url: string, payload: any) =>
  fetch(url, {
    body: JSON.stringify(payload),
    headers: { "Content-Type": "application/json" },
    method: "POST"
  });

export const PostAction = (props: any) => <Button {...props}>Create</Button>;
