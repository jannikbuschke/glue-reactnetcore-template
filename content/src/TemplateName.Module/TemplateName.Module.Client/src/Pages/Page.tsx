import * as React from "react";
import {
  PageContainer,
  PageHeader,
  PageContentContainer,
  PageActionContainer
} from "../Formik/Layout";
import { Formik, FormikProps } from "formik";

interface IPageProps {
  title?: string;
  children: any;
}

export const Page = (props: IPageProps) => (
  <PageContainer>
    <PageHeader>{props.title}</PageHeader>
    {props.children}
  </PageContainer>
);

interface IDetailViewProps {
  title?: string;
  initialValues: any;
  onSubmit: any;
  validate?: any;
  validateOnChange?: boolean;
  validateOnBlur?: boolean;
  renderActions: (props: FormikProps<any>) => any;
  renderContent: (props: FormikProps<any>) => any;
}

export const DetailView = (props: IDetailViewProps) => (
  <Page title={props.title}>
    <Formik
      initialValues={props.initialValues}
      validate={props.validate}
      onSubmit={props.onSubmit}
      validateOnBlur={props.validateOnBlur}
      validateOnChange={props.validateOnChange}
      render={(formProps: FormikProps<any>) => (
        <PageContentContainer>
          <PageActionContainer>
            {props.renderActions(formProps)}
          </PageActionContainer>
          {props.renderContent(formProps)}
        </PageContentContainer>
      )}
    />
  </Page>
);
