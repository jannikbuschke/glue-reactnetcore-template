import { Button } from "antd";
import * as React from "react";
import { connect } from "react-redux";
import { routerActions } from "react-router-redux";

export interface INavigateButtonProps {
  type: "replace" | "push";
  to: string;
}

export const NavigateButton = connect(
  state => ({}),
  (dispatch: any, ownProps: any) => ({ dispatch, ...ownProps })
)((props: INavigateButtonProps & { dispatch: any }) => (
  <Button
    // {...props}
    // tslint:disable-next-line:jsx-no-lambda
    onClick={() => {
      switch (props.type) {
        case "push":
          props.dispatch(routerActions.push(props.to));
          break;
        case "replace":
          props.dispatch(routerActions.replace(props.to));
          break;
      }
    }}
  >
    new
  </Button>
));
