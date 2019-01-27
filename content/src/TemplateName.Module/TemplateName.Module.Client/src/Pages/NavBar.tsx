import { Menu } from "antd";
import { ClickParam } from "antd/lib/menu";
import * as React from "react";
import { connect } from "react-redux";
import { push } from "react-router-redux";
import { ILinkItem } from "./types";

// tslint:disable-next-line:no-empty-interface
interface IDispatchProps {
  items: ILinkItem[];
  dispatch: any;
}
interface IOwnProps {
  items: ILinkItem[];
}

class NavBarComponent extends React.Component<IDispatchProps> {
  public render() {
    return (
      <Menu
        style={{ height: "100%" }}
        mode="inline"
        // tslint:disable-next-line:jsx-no-lambda
        onClick={(param: ClickParam) => {
          this.props.dispatch(push(param.key));
        }}
      >
        {this.props.items.map(item => {
          return <Menu.Item key={item.path}>{item.displayName}</Menu.Item>;
        })}
      </Menu>
    );
  }
}

const NavBar = connect(
  (state, ownProps) => ({}),
  (dispatch: any, ownProps: IOwnProps): IDispatchProps => ({
    dispatch,
    ...ownProps
  })
)(NavBarComponent);
export { NavBar };
