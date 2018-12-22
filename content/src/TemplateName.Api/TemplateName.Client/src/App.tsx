import * as React from 'react';
import './App.css';
import { Formik } from 'formik';
import { StringEditor, FormikDebug } from '@jannikb/react-glue';
import { Menu, Icon } from 'antd';

class App extends React.Component {
  public render() {
    return (
      <div>
        <Formik
          initialValues={{ firstName: 'petr' }}
          onSubmit={() => {}}
          render={() => (
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
                  selectedKeys={['setting:1']}
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

              <div style={{ margin: 20 }}>
                <StringEditor name="firstName" />
                <pre>
                  <FormikDebug />
                </pre>
              </div>
            </div>
          )}
        />
      </div>
    );
  }
}

export default App;
