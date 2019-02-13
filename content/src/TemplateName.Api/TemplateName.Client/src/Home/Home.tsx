import * as React from 'react';
import { List, Card, Collapse } from 'antd';

interface ItemModel {
  link?: string;
  title: string;
  purpose: string;
  alternatives?: string;
}

const Item = ({ item }: { item: ItemModel }) => (
  <Card title={item.purpose} hoverable={true}>
    <Card.Meta
      title={<a href="">{item.title}</a>}
      description={
        item.alternatives
          ? 'alternatives: ' + item.alternatives
          : 'no good alternatives known'
      }
    />
  </Card>
);

const Items = ({ items }: { items: ItemModel[] }) => (
  <List
    itemLayout="vertical"
    grid={{ column: 1, gutter: 15 }}
    dataSource={items}
    renderItem={item => (
      <List.Item>
        <Card title={item.purpose} hoverable={true}>
          <Card.Meta
            title={
              <a href={item.link} target="_blank">
                {item.title}
              </a>
            }
            description={
              item.alternatives
                ? 'alternatives: ' + item.alternatives
                : 'no good alternatives known'
            }
          />
        </Card>
      </List.Item>
    )}
  />
);

export const Home = (props: any) => {
  return (
    <div>
      <div style={{ textAlign: 'center' }}>
        <h1
          style={{
            fontSize: '65px',
            fontWeight: 600,
            lineHeight: '46px',
            margin: '8px 0 28px',
            letterSpacing: 0,
            fontFamily:
              "Avenir,-apple-system,BlinkMacSystemFont,'Segoe UI','PingFang SC','Hiragino Sans GB','Microsoft YaHei','Helvetica Neue',Helvetica,Arial,sans-serif,'Apple Color Emoji','Segoe UI Emoji','Segoe UI Symbol',sans-serif",
          }}
        >
          Glue Toolkit
        </h1>
        <h3
          style={{
            color: '#7b7e80',
            marginBottom: 40,
            lineHeight: '30px',
            fontSize: '25px',
          }}
        >
          a modular setup for rapid enterprise web app development
        </h3>
      </div>
      <Collapse defaultActiveKey={['1']}>
        <Collapse.Panel header="Core External Libraries" key="1">
          <div
            style={{
              width: 'auto',
              display: 'grid',
              gridTemplateColumns: 'repeat(4,1fr)',
              gridGap: 10,
            }}
          >
            <Items
              items={[
                {
                  title: 'Antd',
                  purpose: 'UI controls',
                  alternatives: 'Semantic UI, Material UI, Office UI Fabric',
                  link: 'https://ant.design/docs/react/introduce',
                },
                {
                  title: 'Formik',
                  purpose: 'Form state',
                  alternatives: 'JSON schema form, Context Api',
                  link: 'https://github.com/jaredpalmer/formik',
                },
                {
                  title: 'Reach Router',
                  purpose: 'Clientside routing',
                  alternatives: 'react-router',
                  link: 'https://reach.tech/router',
                },
              ]}
            />
            <Items
              items={[
                {
                  title: 'dx-grid',
                  purpose: 'Data grid',
                  alternatives: 'antd table',
                  link:
                    'https://devexpress.github.io/devextreme-reactive/react/grid/docs/guides/getting-started/',
                },
                {
                  title: 'styled-components',
                  purpose: 'css styling',
                  alternatives: 'emotion, glamorous',
                  link: 'https://www.styled-components.com/',
                },
                {
                  purpose: 'clientside typing',
                  title: 'typescript',
                  link:
                    'https://www.typescriptlang.org/docs/handbook/basic-types.html',
                },
              ]}
            />
            <Items
              items={[
                {
                  title: 'Mediatr',
                  purpose: 'CQRS/Mediator pattern',
                  link: 'https://github.com/jbogard/MediatR/wiki',
                },
                {
                  title: 'Odata',
                  purpose: 'conventional api',
                  alternatives: 'Graph QL',
                  link:
                    'https://www.odata.org/getting-started/understand-odata-in-6-steps/',
                },
                {
                  title: 'Swagger/NSwag',
                  purpose: 'api documentation/typesafe clients',
                  alternatives: 'Graph QL',
                  link: 'https://github.com/RSuter/NSwag',
                },
              ]}
            />
            <Items
              items={[
                {
                  title: 'xUnit',
                  purpose: 'Unit/Integration/Acceptance tests',
                  link: 'https://xunit.github.io/#documentation',
                },
                {
                  title: 'Serilog',
                  purpose: 'Logging',
                  link: 'https://serilog.net/',
                },
                {
                  title: 'Entity Framework Core',
                  purpose: 'ORM',
                  alternatives: 'dapper',
                  link: 'https://docs.microsoft.com/en-us/ef/core/',
                },
              ]}
            />
          </div>
        </Collapse.Panel>
        <Collapse.Panel header="Integration and Utility Libraries" key="2">
          <div
            style={{
              width: 'auto',
              display: 'grid',
              gridTemplateColumns: 'repeat(4,1fr)',
              gridGap: 10,
            }}
          >
            <Items
              items={[
                {
                  purpose: 'integration',
                  title: 'formik-antd',
                  link: 'https://codesandbox.io/s/ooo94m4q5y',
                },
                { title: 'dx-odata-grid', purpose: 'integration' },
              ]}
            />
            <Items
              items={[
                {
                  purpose: 'integration',
                  title: 'formik-asp',
                },
                {
                  purpose: 'integration',
                  title: 'reach-router-antd-layout',
                },
              ]}
            />
            <Items
              items={[
                {
                  purpose: 'clientside date/time',
                  title: 'momentjs',
                  link: 'https://momentjs.com/',
                },
                {
                  purpose: 'immutable state utility',
                  title: 'immer',
                  link: 'https://github.com/mweststrate/immer',
                },
              ]}
            />
            <Items
              items={[
                {
                  purpose: 'mapping DTOs and Entities',
                  title: 'AutoMapper',
                  link: 'https://github.com/AutoMapper/AutoMapper',
                },
                {
                  title: 'Asp Net Versioning',
                  purpose: 'API Versioning',
                  link:
                    'https://github.com/Microsoft/aspnet-api-versioning/wiki/New-Services-Quick-Start#aspnet-core',
                },
              ]}
            />
          </div>
        </Collapse.Panel>
        <Collapse.Panel header="Project Setup" key="3">
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: '30% 30% 30%',
              gridGap: 15,
            }}
          >
            <Card
              title={
                <a
                  href="https://en.wikipedia.org/wiki/Monorepo"
                  target="_blank"
                >
                  Monorepo
                </a>
              }
            >
              <Card.Meta title="all modules that are relevant to the project and are likely to change during the project, will have their sourcecode in one repository" />
            </Card>
            <Card
              title={
                <a href="https://github.com/lerna/lerna" target="_blank">
                  Lerna
                </a>
              }
            >
              <Card.Meta title="Links local Node Packages" />
            </Card>
            <Card
              title={
                <a
                  href="https://git-scm.com/book/en/v2/Git-Tools-Submodules"
                  target="_blank"
                >
                  Git submodules
                </a>
              }
            >
              <Card.Meta title="include other (generic) repositories" />
            </Card>
          </div>
        </Collapse.Panel>
        <Collapse.Panel header="Modules" key="4">
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: '25% 25% 25% 25%',
              gridGap: 15,
            }}
          >
            <Card
              title={
                <a href="" target="_blank">
                  Async Notifications
                </a>
              }
            >
              <Card.Meta title="TODO" />
            </Card>
            <Card
              title={
                <a href="" target="_blank">
                  Workflows
                </a>
              }
            >
              <Card.Meta title="TODO" />
            </Card>
            <Card
              title={
                <a href="" target="_blank">
                  AuditLog / Action History
                </a>
              }
            >
              <Card.Meta title="TODO" />
            </Card>
            <Card
              title={
                <a href="" target="_blank">
                  Extensions: PS / CS Script Plugins
                </a>
              }
            >
              <Card.Meta title="TODO" />
            </Card>
          </div>
        </Collapse.Panel>
      </Collapse>
    </div>
  );
};
