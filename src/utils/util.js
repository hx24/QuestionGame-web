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


function getCookie(name) 
{ 
    var arr,reg=new RegExp("(^| )"+name+"=([^;]*)(;|$)"); 
　　 return (arr=document.cookie.match(reg))?unescape(arr[2]):null;
}

export function delCookie(name) 
{ 
    var exp = new Date(); 
    exp.setTime(exp.getTime() - 1); 
    var cval=getCookie(name); 
    if(cval!=null) 
        document.cookie= name + "="+cval+";expires="+exp.toGMTString(); 
}