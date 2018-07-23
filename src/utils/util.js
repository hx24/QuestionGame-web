import Loadable from 'react-loadable';
import MyLoadingComponent from '../components/MyLoadingComponent';

export function getComponentAsync(componentDir){  // 动态加载
    if(!componentDir)return null;
    return Loadable({
        loader: () => import(`../pages/${componentDir}`), 
        loading: MyLoadingComponent,
        errorComponent: null,
        delay: 200   // 延迟200ms显示loading组件，防止闪烁
    })
}