window.onload = function () {
//    网页头部  随着页面滚动  变色
    setHeader();

//    倒计时
    dowmTime();

//    轮播图

    banner();

}

function setHeader() {
//    把绑定屏幕滚动的事件
//    页面滚动是 头部背景颜色发生改变
//    如果滚动的高度小于  banner的高度  则渐变 ,否则不变色
    var opacity = 0;

//    获取header盒子

    var header = document.querySelector(".header-in");

//    获取banner的高度
    var banner = document.querySelector(".jd-banner");

//    获取banner盒子的高度
    var H = banner.offsetHeight;

    window.onscroll = function () {
        //    获取屏幕的滚动高度
        var top = document.body.scrollTop;

        if (top < H) {
            opacity = top / H * 0.85;
        } else {
            //超出banner的高度
            opacity = 0.85;
        }

        //    把透明度设置给盒子
        header.style.background = "rgba(201,21,35," + opacity + ")";
    }
}

//倒计时

function dowmTime() {
    var time = 24 * 60 * 60;
    var spans = document.querySelectorAll(".sk-time span");
    //倒计时
    //    定时器
    var timer = setInterval(function () {
        time--;
        //    需要时间转换  时分秒
        var h = Math.floor(time / 3600);
        var m = Math.floor(time % 3600 / 60);
        var s = Math.floor(time % 60);


        //    时间格式转换 00:000:00 格式
        spans[0].innerHTML = Math.floor(h / 10);
        spans[1].innerHTML = Math.floor(h % 10);

        spans[3].innerHTML = Math.floor(m / 10);
        spans[4].innerHTML = Math.floor(m % 10);

        spans[6].innerHTML = Math.floor(s / 10);
        spans[7].innerHTML = Math.floor(s % 10);

        if (time < 0) {
            time = 0;
            clearInterval(timer);
        }

    }, 1000);
}


//轮播图

function banner() {
//    通过定时器控制轮播图动起来
//    角标控制
//    边界检测  0-9
//    滑动切换轮播图   touch
//    如果滑动距离 小于屏幕的1/3 ,吸附回去
//    大于1/3  切换图片

    //    获取需要用到的标签
    var banner = document.querySelector(".jd-banner");
    //  ul
    var imgBox = document.querySelector(".imgBox");
    //  ol  li 角标
    var points = document.querySelectorAll(".points li");
//    banner 的宽度
    var W = banner.offsetWidth;
//    定义index  存放当前显示图片的索引值
    var index = 1;

    //console.log(W);
    //设置imgBox的位移
    var setTranslateX=function(x){
        imgBox.style.transform = "translateX(" + x + "px)";
        //    兼容webkit内核的浏览器      -webkit-  -o-  -moz-  -ms-
        imgBox.style.webkitTransform = "translateX(" + x + "px)";
    }
//    添加过渡效果
    var addTransition=function(){
        imgBox.style.transition = "all 0.2s";
        imgBox.style.webkitTransition = "all 0.2s";
    }

//    删除过渡效果
    var removeTransition=function(){
        imgBox.style.transition="none";
        imgBox.style.webkitTransition="none";
    }

//    定时器  封装函数
    var turn=function(){
    //    是轮播图切换的核心数据
        index++;
        var left=-index*W;

    //    切换前添加过渡效果
        addTransition();
    //    切换轮播图  实现css3的效果
        setTranslateX(left);
    }

//    -------定时器模块--------
    var timer = setInterval(turn,1000);
    //-----添加过渡结束事件
//    监听 imgBox 的过渡完成事件
// 动画执行完了，判断数据是否越界

    imgBox.addEventListener('transitionEnd',function(){
        //console.log(2);
    })

    itcast.addTransitionEnd(imgBox,function () {
        //       判断数据是否越界
        console.log(2)
        if (index >= 9) {
            index = 1;

        }
        if (index <= 0) {
            index = 8;
        }

        //    快速跳转
        var left=-index*W;
        // 删除过渡效果
        removeTransition();
        //切换轮播图  用css3来实现
        setTranslateX(left);

    //    让角标同步
        setPoints(index);

    });
    //-------角标同步--------
    function  setPoints(index){
    //    排他 首先 排除所有人  突出显示自己
        for(var i=0;i<points.length;i++){

            points[i].classList.remove('current');
        }
    //    突出显示自己
        points[index-1].classList.add('current');
    }
    //-------触屏滚动的操作---------

    var startX=0;
    var moveX=0;
    var distanceX=0;

    banner.addEventListener("touchstart",function(e){
    //    记录起始的触屏位置
        startX= e.targetTouches[0].clientX;
    //    清楚定时器
        clearInterval(timer);
    });

    banner.addEventListener("touchmove",function(e){
        moveX= e.targetTouches[0].clientX;
    //    计算距离差
        distanceX=moveX-startX;
    //    imgBox 跟随鼠标位移
        setTranslateX(-index*W+distanceX);
    });

    banner.addEventListener("touchend",function(){
    //    imgBox  吸附回来 或者切换图片（上一张  下一张）;
    //    如果滑动的距大于屏幕宽度的1/3 切换图片
    //    distanceX>0 上一张
    //    distanceX< 0 下一张
        if(Math.abs(distanceX)>W/3){
            if(distanceX>0){
            //    上一张
                index--;

            }

            if(distanceX<0){
                //下一张
                index++;
            }
        }

        var left=-index*W;
    //    添加过渡效果
        addTransition();
    //    让 imgBox 位移
        setTranslateX(left);

    //    开启定时器
        timer=setInterval(turn,1000);
    })

}












