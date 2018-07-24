// 菜单配置
// headerMenuConfig：头部导航配置
import config from './config.json';

const headerMenuConfig = [
  // {
  //   name: '首页',
  //   to: '/',
  //   icon: 'home',
  // }
];

function getMenu(config, parent = '') {
  const res = config.map(({ name, path, icon, children, hideMenu }) => {
    if (hideMenu) return null;
    const parentPath = parent ? parent + '/' : '/';
    const menu = {
      name,
      icon,
      path: parentPath + path,
    };
    if (children) {
      menu.children = getMenu(children, menu.path);
    }
    return menu;
  });
  return res.filter(item => item);
}

const asideMenuConfig = getMenu(config);

export { headerMenuConfig, asideMenuConfig };
