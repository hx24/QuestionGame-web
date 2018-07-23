// 以下文件格式为描述路由的协议格式
// 规定页面都必须添加到pages中文件夹中， 且在页面根文件夹中的index.js导出 
import config from  './config.json';
import {getComponentAsync} from './utils/util';

function getFilterRouterConfig(config){
  return config.map(({path,componentDir,children})=>{
    if(!componentDir){
      console.error(`${path}未设置component路径`);
      return null;
    }
    const asyncRouter =  {
      path,
      component: getComponentAsync(componentDir),
    }
    if(children){
      asyncRouter.children=getFilterRouterConfig(children);
    }
    return asyncRouter;
  })
}

export default getFilterRouterConfig(config);







// import HeaderAsideFooterResponsiveLayout from './layouts/HeaderAsideFooterResponsiveLayout';
// import RoundList from './pages/RoundList';
// import RoundDetail from './pages/RoundDetail';
// import Login from './pages/Login';

// const routerConfig1 = [
//   {
//     path: '/login',
//     component: Login,
//   },
//   {
//     path: '/round',
//     layout: HeaderAsideFooterResponsiveLayout,
//     component: RoundList,
//     children: [
//       {
//         path: 'list',
//         layout: HeaderAsideFooterResponsiveLayout,
//         component: RoundList,
//       },
//     ],
//   },
//   {
//     path: '/round/:id',
//     layout: HeaderAsideFooterResponsiveLayout,
//     component: RoundDetail,
//   },
//   {
//     path: '*',
//     layout: HeaderAsideFooterResponsiveLayout,
//     component: NotFound,
//   },
// ];