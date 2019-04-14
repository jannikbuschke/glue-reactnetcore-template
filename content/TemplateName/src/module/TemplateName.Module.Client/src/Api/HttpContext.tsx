import * as React from "react";

interface IHttpContext {
  apiUrl: string;
  httpContextPath?: string;
}

export const createContext = (apiUrl: string, httpContextPath?: string) => {
  return React.createContext<IHttpContext>({ apiUrl, httpContextPath });
};
