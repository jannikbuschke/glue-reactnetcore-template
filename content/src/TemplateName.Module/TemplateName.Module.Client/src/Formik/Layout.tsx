import * as React from "react";
import styled from "styled-components";

export const PageContainer = (props: any) => <div style={{}} {...props} />;
export const PageHeader = (props: any) => <h1 {...props} />;

export const PageContentContainer = (props: any) => (
  <ErrorBoundary {...props} />
);

const StyledActionContainer = styled.div`
  display: flex;
  // margin: 20px;
  // padding: 20px;
  & > * {
    margin: 10px;
  }
`;

export const PageActionContainer = (props: any) => (
  <StyledActionContainer {...props} />
);

export class ErrorBoundary extends React.Component {
  public state = { hasError: false };

  public componentDidCatch(error: any, info: any) {
    // Display fallback UI
    this.setState({ hasError: true });
    // You can also log the error to an error reporting service
    // tslint:disable-next-line:no-console
    console.error(error, info);
  }

  public render() {
    if (this.state.hasError) {
      // You can render any custom fallback UI
      return <h1>Something went wrong.</h1>;
    }
    return this.props.children;
  }
}
