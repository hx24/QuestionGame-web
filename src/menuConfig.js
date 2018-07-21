// 菜单配置
// headerMenuConfig：头部导航配置
// asideMenuConfig：侧边导航配置

const headerMenuConfig = [
  {
    name: '首页',
    path: '/',
    icon: 'home',
  },
  {
    name: '反馈',
    path: 'https://github.com/alibaba/ice',
    external: true,
    newWindow: true,
    icon: 'message',
  },
  {
    name: '帮助',
    path: 'https://alibaba.github.io/ice',
    external: true,
    newWindow: true,
    icon: 'bangzhu',
  },
];

const asideMenuConfig = [
  {
    name: 'Dashboard',
    path: '/',
    icon: 'home',
  },
  // {
  //   name: '文章管理',
  //   path: '/post',
  //   icon: 'copy',
  //   children: [
  //     { name: '文章列表', path: '/post/list' },
  //     { name: '添加文章', path: '/post/create' },
  //   ],
  // },
  {
    name: '场次管理',
    path: '/round',
    icon: 'cascades',
    // children: [
    //   { name: '场次列表', path: '/round/list' },
    //   { name: '添加场次', path: '/round/create' },
    // ],
  },
];

export { headerMenuConfig, asideMenuConfig };
