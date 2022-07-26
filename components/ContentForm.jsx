import React from 'react';
import { connect } from 'dva';
import { Button, Divider, Form, Input, Row, Col } from 'antd';
import lodash from 'lodash';

/**
 * 公用页面
 */
@connect((state) => state)
export default class ContentForm extends React.Component {
  formRef = React.createRef();

  /**
   * 根据选中菜单查找在数组中的位置
   */
  getChild = (id, menus, changedValue) => {
    menus.forEach((item) => {
      if (item.id === id) {
        item.title = changedValue;
      } else {
        if (item.children && item.children.length !== 0) {
          this.getChild(id, item.children, changedValue);
        }
      }
    });
  };

  /**
   * 更改菜单名称事件
   */
  onClick = () => {
    const { selected_menu, menus } = this.props['MenuModel'];
    const changedValue = this.formRef.getFieldValue('putIn');
    const id = selected_menu.id;
    const cloneMenus = lodash.cloneDeep(menus);
    this.getChild(id, cloneMenus, changedValue);
    selected_menu.title = changedValue;
    this.props.dispatch({ type: 'MenuModel/updateState', payload: { menus: cloneMenus, selected_menu: lodash.cloneDeep(selected_menu) } });
  };

  render() {
    const { selected_menu } = this.props['MenuModel'];
    return (
      <React.Fragment>
        <span style={{}}>{selected_menu.title}</span>
        <Divider />
        <Form
          ref={(ref) => {
            this.formRef = ref;
          }}
        >
          <Row gutter={24}>
            <Col span={6}>
              <Form.Item name={'putIn'}>
                <Input />
              </Form.Item>
            </Col>
            <Col span={6}>
              <Button onClick={this.onClick}>保存</Button>
            </Col>
          </Row>
        </Form>
      </React.Fragment>
    );
  }
}
