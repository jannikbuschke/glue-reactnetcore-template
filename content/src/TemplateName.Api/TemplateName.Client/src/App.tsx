import * as React from 'react';
import './App.css';
import { Menu, Icon } from 'antd';
import { SampleForm } from './SampleForm';
import { Link, Router } from '@reach/router';
import { CreateContact } from './Contacts/CreateContact';

class App extends React.Component {
  public render() {
    return (
      <div
        style={{
          display: 'grid',
          gridTemplateRows: 'auto 1fr',
          gridTemplateColumns: '280px 1fr',
        }}
      >
        <Menu
          mode="horizontal"
          style={{ gridColumnStart: 1, gridColumnEnd: 3 }}
          selectedKeys={[]}
        >
          <Menu.Item key="mail">
            <Icon type="mail" />
            Navigation One
          </Menu.Item>
          <Menu.Item key="app" disabled>
            <Icon type="appstore" />
            Navigation Two
          </Menu.Item>
          <Menu.SubMenu
            title={
              <span>
                <Icon type="setting" />
                Navigation Three - Submenu
              </span>
            }
          >
            <Menu.ItemGroup title="Item 1" selectedKeys={['setting:1']}>
              <Menu.Item key="setting:1">Option 1</Menu.Item>
              <Menu.Item key="setting:2">Option 2</Menu.Item>
            </Menu.ItemGroup>
            <Menu.ItemGroup title="Item 2">
              <Menu.Item key="setting:3">Option 3</Menu.Item>
              <Menu.Item key="setting:4">Option 4</Menu.Item>
            </Menu.ItemGroup>
          </Menu.SubMenu>
        </Menu>
        <Menu>
          <Menu.Item key="user">
            <Link to="contacts">
              <Icon type="user" />
              Contacts
            </Link>
          </Menu.Item>

          <Menu.SubMenu
            title={
              <span className="submenu-title-wrapper">
                <Icon type="setting" />
                Navigation Three - Submenu
              </span>
            }
          >
            <Menu.ItemGroup title="Item 1">
              <Menu.Item key="setting:1">Option 1</Menu.Item>
              <Menu.Item key="setting:2">Option 2</Menu.Item>
            </Menu.ItemGroup>
            <Menu.ItemGroup title="Item 2">
              <Menu.Item key="setting:3">Option 3</Menu.Item>
              <Menu.Item key="setting:4">Option 4</Menu.Item>
            </Menu.ItemGroup>
          </Menu.SubMenu>
        </Menu>
        <Router>
          <SampleForm path="/" />
          <CreateContact path="/contacts" />
        </Router>
        )}
      </div>
    );
  }
}

export default App;
