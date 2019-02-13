import * as React from 'react';
import './App.css';
import { Icon, Badge } from 'antd';
import { SampleForm } from './SampleForm';
import { Router } from '@reach/router';
import { CreateContact } from './Contacts/CreateContact';
import {
  ApplicationLayout,
  HorizontalSplit,
  MasterDetailView,
} from '@jbuschke/react-glue';
import { ContactList } from './Contacts/ContactList';
import { EditContact } from './Contacts/EditContact';
import { Home } from './Home/Home';

const HelloWorld = (props: any) => <h1>Hello world</h1>;

class App extends React.Component {
  public render() {
    return (
      <ApplicationLayout
        header={[{ displayName: 'Home', to: '/', kind: 'LINK', icon: 'home' }]}
        sideBarItems={[
          {
            kind: 'LINK',
            displayName: 'Formik-Antd',
            to: '/formik-antd',
            icon: 'form',
          },
          {
            kind: 'LINK',
            displayName: 'Contacts',
            to: '/contacts',
            icon: 'user',
          },
        ]}
        headerRight={[
          {
            kind: 'CUSTOM',
            component: () => (
              <div style={{ marginRight: 15, display: 'inline' }}>
                <Badge dot={true}>
                  <Icon type="bell" />
                </Badge>
              </div>
            ),
          },
          {
            kind: 'CUSTOM',
            component: () => (
              <div style={{ marginRight: 15, display: 'inline' }}>
                <Icon type="user" />
              </div>
            ),
          },
          {
            kind: 'CUSTOM',
            component: () => <Icon type="setting" />,
          },
        ]}
      >
        <>
          <Router primary={false}>
            <Home path="/" />
          </Router>
          <HorizontalSplit templateColumns="1fr 1fr">
            <MasterDetailView
              item={{
                detail: EditContact,
                list: ContactList,
                new: CreateContact,
                path: '/contacts',
              }}
            />
          </HorizontalSplit>
          <Router primary={false}>
            <HelloWorld path="/hello-world" />
          </Router>
          <Router primary={false}>
            <SampleForm path="/formik-antd" />
          </Router>
        </>
      </ApplicationLayout>
    );
  }
}

export default App;
