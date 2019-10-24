import * as React from "react";
import "./App.css";
import { Menu, Icon } from "antd";
import { Introduction } from "./Introduction";
import { Link, Router } from "@reach/router";
import { CreateContact } from "./Contacts/CreateContact";

function App() {
  return (
    <div
      style={{
        display: "grid",
        gridTemplateRows: "auto 1fr",
        gridTemplateColumns: "220px 1fr"
      }}
    >
      <Menu
        mode="horizontal"
        style={{ gridColumnStart: 1, gridColumnEnd: 3 }}
        selectedKeys={[]}
      >
        <Menu.Item key="mail">
          <Icon type="mail" />
          Mail
        </Menu.Item>
        <Menu.SubMenu
          title={
            <span>
              <Icon type="setting" />
              Settings
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
      <Menu>
        <Menu.Item>
          <Link to="/contacts/create">
            <Icon type="user" />
            Create contact
          </Link>
        </Menu.Item>
      </Menu>
      <div style={{ padding: 10 }}>
        <Router primary={false}>
          <Introduction path="/" />
          <CreateContact path="/contacts/create" />
        </Router>
      </div>
    </div>
  );
}

export default App;
