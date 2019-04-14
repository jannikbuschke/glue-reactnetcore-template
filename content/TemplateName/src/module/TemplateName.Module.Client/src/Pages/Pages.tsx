import * as React from "react";
import { Route, Switch } from "react-router";
import { IEntityItem } from "./types";

const MasterDetailContainer = (props: any) => (
  <div
    style={{
      display: "grid",
      gridGap: "20px",
      gridTemplateColumns: "repeat(2, 1fr)",
      margin: "30px"
    }}
  >
    {props.children}
  </div>
);

interface IProps {
  items: IEntityItem[];
}

const Pages = (props: IProps) => (
  <MasterDetailContainer>
    {props.items.map((item: IEntityItem, index) => (
      <React.Fragment>
        <Route path={`${item.path}`} component={item.list} />
        <Switch>
          <Route exact={true} path={`${item.path}/new`} component={item.new} />
          <Route
            exact={true}
            path={`${item.path}/:id`}
            component={item.detail}
          />
        </Switch>
      </React.Fragment>
    ))}
  </MasterDetailContainer>
);

export { Pages };
