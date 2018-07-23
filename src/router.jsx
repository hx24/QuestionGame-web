/**
 * 定义应用路
 */
import { Switch, Route} from 'react-router-dom';
import routerConfig from './routerConfig';
import React from 'react';

function renderRouterConfigV4(router, contextPath) {
  const routeChildren = [];
  const renderRoute = (routeItem, routeContextPath) => {
    let routePath;
    if (!routeItem.path) {
      // eslint-disable-next-line
      console.error('route must has `path`');
    } else if (routeItem.path === '/' || routeItem.path === '*') {
      routePath = routeItem.path;
    } else {
      routePath = `/${routeContextPath}/${routeItem.path}`.replace(/\/+/g, '/');
    }

    routeChildren.push(
      <Route
          component={routeItem.component}
          exact
          key={routePath}
          path={routePath}
      />
    );

    // 存在子路由，递归当前路径，并添加到路由中
    if (Array.isArray(routeItem.children)) {
      routeItem.children.forEach((r) => {
        renderRoute( r, routePath);
      });
    }
  };

  router.forEach((r) => {
    renderRoute(r, contextPath);
  });

  return <Switch>{routeChildren}</Switch>;
}

export default renderRouterConfigV4(routerConfig, '/');