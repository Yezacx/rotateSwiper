/**
 * Created by hp on 2018/1/6.
 */

window.onload = function () {
    //需求：点击左右按钮，实现旋转木马
    //原理：点击右侧按钮，让3号盒子的样式赋值给2号盒子，2-1,1-5,5-4,4-3
    //左侧同理
    //步骤：1.鼠标放在轮播图上，两侧的按钮显示，移开隐藏
    //      2.让页面加载出所有盒子的样式
    //      3.把两侧按钮绑定事件（调用同一个方法，只有一个参数，true为正向旋转，false为反向旋转）
    //      4.书写函数
    //        (操作数组，正向旋转：删除数组中第一个样式，添加到最后)
    //        (操作数组，反向旋转：删除数组中最后一个样式，添加到第一个)
    var arr = [
        {   //  1
            "width":400,
            "top":70,
            "left":50,
            "opacity":20,
            "z-index":2
        },
        {  // 2
            "width":600,
            "top":120,
            "left":0,
            "opacity":80,
            "z-index":3
        },
        {   // 3
            "width":800,
            "top":100,
            "left":200,
            "opacity":100,
            "z-index":4
        },
        {  // 4
            "width":600,
            "top":120,
            "left":600,
            "opacity":80,
            "z-index":3
        },
        {   //5
            "width":400,
            "top":70,
            "left":750,
            "opacity":20,
            "z-index":2
        }
    ];
    var slide = document.getElementById("slide");
    var liArr = slide.children[0].children;
    var arrow = document.getElementById("arrow");
    var arrowArr = arrow.children;
    //设置一个开闭原则变量，点击以后修改这个值。
    var flag = true;
    //鼠标放上去显示左右按钮，移开隐藏
    slide.onmouseenter = function () {
        animate(arrow, {"opacity":100});
    }
    slide.onmouseleave = function () {
        animate(arrow, {"opacity":0});
    }
    //让页面加载出所有盒子的样式
    //3.把两侧按钮绑定事件（调用同一个方法，只有一个参数，true为正向旋转，false为反向旋转）
    move();

    arrowArr[0].onclick = function () {
        if(flag===true){
            flag = false;
            move(false);
        }
        //点击一次立刻修改为false，这样儿别人就不能在点击。（点击也不执行move()）
    }
    arrowArr[1].onclick = function () {
        if(flag===true){
            flag = false;
            move(true);
        }
    }

    function move(bool){
        if(bool!==undefined){
            if(bool){
                //操作数组
                arr.push(arr.shift());
            }else{
                arr.unshift(arr.pop());
            }
        }
        for(var i = 0;i<liArr.length;i++){
            animate(liArr[i],arr[i], function () {
                //回调函数，所有程序执行完毕，在初始化flag的值为true
                flag = true;
            });
        }
    }
}

