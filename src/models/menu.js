import { RadarChartOutlined, GithubOutlined } from '@ant-design/icons';

export default {
  namespace: 'MenuModel',

  state: {
    selected_menu: {}, //菜单选中后存储于此
    menus: [
      {
        key: 1,
        id: 1,
        title: '菜单一',
        path: '/',
        children: [
          {
            key: 11,
            id: 11,
            title: '子菜单1-1',
            path: '/menu1',
          },
          {
            key: 12,
            id: 12,
            title: '子菜单1-2',
            path: '/menu2',
          },
        ],
      },
      {
        key: 2,
        id: 2,
        title: '菜单二',
        path: '/',
        children: [
          {
            key: 21,
            id: 21,
            title: '子菜单2-1',
            path: '/menu3',
          },
          {
            key: 22,
            id: 22,
            title: '子菜单2-2',
            path: '/menu4',
          },
        ],
      },
    ],
  },

  subscriptions: {},

  effects: {
    /**
     *异步更新状态事件
     */
    *updateMenuTitle({ payload }, { call, put }) {
      yield put({ type: 'updateState', payload });
    },
  },

  reducers: {
    updateState(state, { payload }) {
      return { ...state, ...payload };
    },
  },
};
