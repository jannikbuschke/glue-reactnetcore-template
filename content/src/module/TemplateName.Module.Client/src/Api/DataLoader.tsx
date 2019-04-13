import { message } from "antd";
import * as React from "react";

export interface IDataLoaderProps<T> {
  url: string;
  children: (props: IDataProps<T>) => any;
  renderLoading?: () => any;
}

export interface IDataProps<T> {
  data: T | null;
  loading: boolean;
  error?: string | null;
}

interface IState<T> {
  loadingState: string;
  data: T | null;
  error?: string | null;
  url: string;
}

export class DataLoader<T> extends React.Component<
  IDataLoaderProps<T>,
  IState<T>
> {
  public static getDerivedStateFromProps(
    props: IDataLoaderProps<any>,
    state: IState<any>
  ) {
    if (state.url !== props.url) {
      return { url: props.url, loadingState: "INVALID" };
    }
    return state;
  }
  public state: IState<T> = {
    data: {} as T,
    loadingState: "INVALID",
    url: ""
  };
  public async componentDidMount() {
    this.reload();
  }

  public async componentDidUpdate() {
    if (this.state.loadingState === "INVALID") {
      this.reload();
    }
  }
  public reload = async () => {
    this.setState({ loadingState: "LOADING" });
    // tslint:disable-next-line:no-console
    console.log("load", this.props.url);
    const response = await fetch(this.props.url);
    if (response.ok) {
      const json = await response.json();
      this.setState({ data: json, loadingState: "SUCCESS", error: null });
    } else {
      this.setState({
        data: null,
        error: response.statusText,
        loadingState: "ERROR"
      });
      message.error(response.statusText);
    }
  };
  public render() {
    const { data, error, loadingState } = this.state;
    const { renderLoading } = this.props;
    const loading = loadingState === "INVALID" || loadingState === "LOADING";
    if (renderLoading && loading) {
      return renderLoading();
    }
    return this.props.children({ data, loading, error });
  }
}
