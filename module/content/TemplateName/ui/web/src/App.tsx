import React from 'react';
import './App.css';
import { Layout, Menu, Breadcrumb, Icon } from 'antd';
import { Route, BrowserRouter, Link } from 'react-router-dom';
import useSWR, { SWRConfig } from 'swr';

const { Header, Content, Footer, Sider } = Layout;

export async function getJson(key: string) {
  const r = await fetch(key);
  if (!r.ok) {
    console.error('http error', r.status + ' ' + r.statusText, r);
    return Promise.reject('error: ' + r.status + ' ' + r.statusText);
  }
  const data = await r.json();
  return data;
}


function Sidebar() {
  return (
    <Sider>
      <Menu theme="dark" defaultSelectedKeys={['1']} mode="inline">
        <Menu.Item key="1">
          <Link to="/all">
            <Icon type="pie-chart" />
            <span>All</span>
          </Link>
        </Menu.Item>
      </Menu>
    </Sider>
  );
}

function Main() {
  return (
    <Layout>
      <Header style={{ background: '#fff', padding: 0 }} />
      <Content style={{ margin: '0 16px' }}>
        <Breadcrumb style={{ margin: '16px 0' }}></Breadcrumb>
        <div>
          <Route exact={true} path={['/all', '/']}>
            <div>Hello World</div>
          </Route>
        </div>
      </Content>
      <Footer style={{ textAlign: 'center' }}>TemplateName</Footer>
    </Layout>
  );
}

function App() {

  return (
    <SWRConfig
      value={{
        refreshInterval: 0,
        fetcher: getJson,
      }}>
      <BrowserRouter basename={'__configuration'}>
        <Layout style={{ minHeight: '100vh' }}>
          <Sidebar />
          <Main />
        </Layout>
      </BrowserRouter>
    </SWRConfig>
  );
}

export default App;
