import Loadable from 'react-loadable';
import MyLoadingComponent from '../../components/MyLoadingComponent';

const Layout = Loadable({
    loader: () => import(`./Layout`), 
    loading: MyLoadingComponent,
    errorComponent: null,
    delay: 200   // 延迟200ms显示loading组件，防止闪烁
})


export default Layout;