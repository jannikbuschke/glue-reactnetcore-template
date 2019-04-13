import { Select } from 'antd';
import { DatePicker, Input, InputNumber, Form } from 'antd';
import * as React from 'react';

import { Field, FieldProps, FormikProps } from 'formik';
import { DataLoader } from '../Api';

export const FormikDebug = () => (
  <Field>{({ form }: any) => JSON.stringify(form, null, 2)}</Field>
);

export const DateEditor = (props: any) => (
  <Field {...props}>
    {(p: FieldProps) => (
      <DatePicker
        value={p.field.value}
        // tslint:disable-next-line:jsx-no-lambda
        onChange={date => {
          p.form.setFieldValue(props.name, date);
        }}
      />
    )}
  </Field>
);

export const StringEditor = (props: any) => (
  <Field {...props}>
    {({ field, form }: { field: any; form: FormikProps<any> }) => {
      const hasError = form.errors && form.errors[field.name.toLowerCase()];
      if (hasError) {
        return (
          <Form.Item
            label={props.label}
            validateStatus="error"
            hasFeedback={false}
            help={form.errors[field.name.toLowerCase()]}
          >
            <Input {...props} {...field} />
          </Form.Item>
        );
      }
      return <Input {...props} {...field} />;
    }}
  </Field>
);

interface IValidationErrorsProps {
  showOnlyIfTouched?: boolean;
}

export const ValidationErrors = ({
  showOnlyIfTouched = true,
}: IValidationErrorsProps) => (
  <Field>
    {({ form }: { form: FormikProps<any> }) => {
      const errorKeys = Object.keys(form.errors);
      if (!errorKeys.length) {
        return null;
      }
      return (
        <div style={{ color: 'red' }}>
          <ul>
            {errorKeys.map(
              key =>
                (form.touched[key] || !showOnlyIfTouched) && (
                  <li key={key}>{form.errors[key]}</li>
                ),
            )}
          </ul>
        </div>
      );
    }}
  </Field>
);

export const NumberEditor = (props: any) => (
  <Field {...props}>
    {(p: FieldProps) => {
      return (
        <InputNumber
          {...props}
          {...p.field}
          onChange={
            // tslint:disable-next-line:jsx-no-lambda
            value => p.form.setFieldValue(props.name, value)
          }
        />
      );
    }}
  </Field>
);

export const Text = (props: any) => (
  <Field {...props}>
    {(p: FieldProps) => {
      return (
        <>
          <label>{props.label ? props.label : ' '}:</label>{' '}
          <span>{p.field.value ? p.field.value.toString() : ' '}</span>
        </>
      );
    }}
  </Field>
);

interface IProps {
  name: string;
  url: string;
  placeholder?: string;
}

export class ReferenceEditor extends React.Component<IProps> {
  public render() {
    return (
      <DataLoader url={this.props.url}>
        {({ data }: any) => (
          <Field name={this.props.name}>
            {(fieldProps: FieldProps<any>) => (
              <Select
                showSearch={true}
                style={{ width: '100%' }}
                value={
                  fieldProps.field.value === null
                    ? undefined
                    : fieldProps.field.value
                }
                allowClear={true}
                placeholder={this.props.placeholder}
                defaultActiveFirstOption={false}
                showArrow={true}
                filterOption={false}
                // tslint:disable-next-line:jsx-no-lambda
                onChange={(value: any) => {
                  fieldProps.form.setFieldValue(this.props.name, value);
                }}
                notFoundContent={null}
              >
                {data && data.value
                  ? data.value.map((i: any) => {
                      return <Select.Option key={i.id}>{i.name}</Select.Option>;
                    })
                  : null}
              </Select>
            )}
          </Field>
        )}
      </DataLoader>
    );
  }
}
