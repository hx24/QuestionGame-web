// 以下文件格式为描述路由的协议格式
// 你可以调整 routerConfig 里的内容
// 变量名 routerConfig 为 iceworks 检测关键字，请不要修改名称

import HeaderAsideFooterResponsiveLayout from './layouts/HeaderAsideFooterResponsiveLayout';
import RoundList from './pages/RoundList';
import NotFound from './pages/NotFound';
import RoundDetail from './pages/RoundDetail';
import Login from './pages/Login';

const routerConfig = [
  {
    path: '/round',
    layout: HeaderAsideFooterResponsiveLayout,
    component: RoundList,
    children: [
      {
        path: 'list',
        layout: HeaderAsideFooterResponsiveLayout,
        component: RoundList,
      },
    ],
  },
  {
    path: '/round/:id',
    layout: HeaderAsideFooterResponsiveLayout,
    component: RoundDetail,
  },
  {
    path: '*',
    layout: HeaderAsideFooterResponsiveLayout,
    component: NotFound,
  },
];

export default routerConfig;
