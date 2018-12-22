import { RouteComponentProps } from "react-router";

export interface INavBarItem {
  displayName: string;
  path: string;
}

export interface IEntityItem {
  path: string;
  detail:
    | React.ComponentType<RouteComponentProps<any>>
    | React.ComponentType<any>
    | any;
  list:
    | React.ComponentType<RouteComponentProps<any>>
    | React.ComponentType<any>
    | any;
  new:
    | React.ComponentType<RouteComponentProps<any>>
    | React.ComponentType<any>
    | any;
}

export interface ILinkItem {
  displayName: string;
  path: string;
}
