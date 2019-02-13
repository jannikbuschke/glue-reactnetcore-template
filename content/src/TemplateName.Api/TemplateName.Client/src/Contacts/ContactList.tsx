import {
  PageContainer,
  PageContentContainer,
  PageActionContainer,
  NavigateButton,
} from '@jbuschke/react-glue';
import './ContactList.css';

import { List } from '@jbuschke/dx-odata-grid';

import * as React from 'react';
import { Link } from '@reach/router';

export const ContactList = () => (
  <PageContainer>
    <PageContentContainer>
      <PageActionContainer>
        <NavigateButton type="primary" to="/contacts/new" />
      </PageActionContainer>
      <div className="contact-list">
        <List
          filters={{
            id: { disabled: true },
            email: {
              dataType: 'string',
              operand: 'contains',
            },
            firstName: {
              dataType: 'string',
              operand: 'contains',
            },
            lastName: {
              dataType: 'string',
              operand: 'contains',
            },
          }}
          odataPath={`/odata/Contacts`}
          additionalParameters={['api-version=1.0']}
          columns={[
            {
              name: 'id',
              title: 'ID',
              getCellValue: row => (
                <Link to={`${'/contacts'}/${row.id}`}>
                  {row.id.substring(0, 8)}
                </Link>
              ),
            },
            {
              name: 'firstName',
              title: 'First Name',
            },
            {
              name: 'lastName',
              title: 'Last Name',
            },
            { name: 'email', title: 'Email' },
            { name: 'phone', title: 'Phone' },
          ]}
        />
      </div>
    </PageContentContainer>
  </PageContainer>
);
