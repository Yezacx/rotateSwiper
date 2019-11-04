/**
 * Created by hp on 2018/1/2.
 */
//scroll()封装
function scroll(){
    return {
        "top": window.pageYOffset||document.documentElement.scrollTop||document.body.scrollTop,
        "left": window.pageXOffset||document.documentElement.scrollLeft||document.body.scrollLeft,
    };
}

/**
 * js中注释/**enter
 */

/**
 *
 * @param ele
 */
//获取屏幕可视区域的宽高（封装版）
function client(){
    return {
        "width": window.innerWidth||document.documentElement.clientWidth||document.body.clientWidth,
        "height": window.innerHeight||document.documentElement.clientHeight||document.body.clientHeight
    }
}

//显示
function show(ele){
    ele.style.display = "block";
}
//隐藏
function hide(ele){
    ele.style.display = "none";
}

//兼容方法获取元素样式
function getStyle(ele,attr){
    if(window.getComputedStyle){
        return window.getComputedStyle(ele,null)[attr];
    }
    return ele.currentStyle[attr];
}


//取消冒泡
/*event = event||window.event;
if(event&&event.stopPropagation){
    event.stopPropagation();
}else{
    event.cancelBubble = true;
    event.cancelBubble = true;
}*/

//兼容获取事件触动时，被传递过来的对象
var aaa = event.target||event.srcElement;

//缓动框架多属性封装
function animate(ele,json,fn){
    clearInterval(ele.timer);
    ele.timer = setInterval(function () {
        var bool = true;
        for(var k in json){
            var leader;
            if(k ==="opacity"){
                leader = getStyle(ele,k)*100||1;
            }else{
                leader = parseInt(getStyle(ele,k)) || 0;
            }
            var step = (json[k] - leader)/10;
            step = step>0?Math.ceil(step):Math.floor(step);
            leader = leader + step;
            if(k === "opacity"){
                ele.style[k] = leader/100;
                ele.style.filter = "alpha(opacity="+leader+")";
            }else if(k ==="z-index"){
                ele.style[k] = json[k];
            }else{
                ele.style[k] = leader + "px";
            }
            if(json[k] !== leader){
                bool = false;
            }
        }
        if(bool){
            clearInterval(ele.timer);
            if(fn){
                fn();
            }
        }
    },25);
}
