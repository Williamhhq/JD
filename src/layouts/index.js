import React from 'react';
import { connect } from 'dva';
import { Row, Layout, Menu, Col } from 'antd';
import { QuestionCircleOutlined, MenuFoldOutlined, MenuUnfoldOutlined, GithubOutlined } from '@ant-design/icons';

/**
 * 布局
 */
@connect((state) => state)
export default class LayoutIndex extends React.Component {
  state = {
    collapsed: false,
  };

  /**
   * 菜单收缩事件
   */
  collapseOnClick = () => {
    this.setState({ collapsed: !this.state.collapsed });
  };

  /**
   * 菜单点击事件
   */
  menuOnClick = (item) => {
    const { history } = this.props;
    this.props.dispatch({ type: 'MenuModel/updateState', payload: { selected_menu: item } });
    history.push(item.path);
  };

  render() {
    const { children } = this.props;
    const { menus } = this.props['MenuModel'];
    const { collapsed } = this.state;

    return (
      <Layout style={{ minHeight: '100vh' }}>
        <Layout.Header>
          <Row justify={'space-between'} align={'middle'} style={{ color: '#ffffff' }}>
            <Col style={{ fontSize: 24 }}>React</Col>
            <Col>
              <QuestionCircleOutlined style={{ marginRight: 12 }} />
              <a>admin</a>
            </Col>
          </Row>
        </Layout.Header>
        <Layout>
          <Layout.Sider collapsed={collapsed} onCollapse={(value) => this.setState({ collapsed: value })}>
            <div style={{ textAlign: 'center', backgroundColor: '#1C2327' }}>
              {collapsed ? <MenuUnfoldOutlined style={{ color: '#ffffff', fontSize: 20 }} onClick={this.collapseOnClick} /> : <MenuFoldOutlined style={{ color: '#ffffff', fontSize: 20 }} onClick={this.collapseOnClick} />}
            </div>
            <Menu theme="dark" mode="inline">
              {menus.map((item) => {
                return (
                  <Menu.SubMenu key={item.id} title={item.title} icon={<GithubOutlined />}>
                    {item.children.map((child) => {
                      return (
                        <Menu.Item key={child.id} title={child.title} onClick={() => this.menuOnClick(child)}>
                          {child.title}
                        </Menu.Item>
                      );
                    })}
                  </Menu.SubMenu>
                );
              })}
            </Menu>
          </Layout.Sider>
          <Layout style={{ padding: 24 }}>
            <Layout.Content>{children}</Layout.Content>
            <Layout.Footer style={{ textAlign: 'center' }}>SHJD ©2022 Created by HHQ</Layout.Footer>
          </Layout>
        </Layout>
      </Layout>
    );
  }
}
