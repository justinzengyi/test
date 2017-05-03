
// 命名空间
var itcast={
    //给一个盒子绑定过渡结束事件(实现css3的兼容问题)
    //box:绑定事件的对象
    //callback: 过渡结束事件，触发后执行什么操作
    addTransitionEnd:function(box,callback){
    //   判断用户传递的是否是一个对象

        if(box&&typeof(box)=='object'){
        //    到此 box是可用的
        //    给box绑定 事件

       box.addEventListener("transitionEnd",function(){
                //if(callback){
                //    callback();
                //}
                //如果callback存在则执行

                callback&&callback();

       });

       box.addEventListener("webkitTransitionEnd",function(){
                //if(callback){
                //    callback();
                //}
                //如果callback存在则执行

                callback&&callback();

       });
     }
   },


    //tap事件
    //box :给谁绑定事件
    //callback tap 事件 触发侯要执行的操作

    tap:function(box,callback){
        if(box&&typeof(box)=="object"){
            var startTime=0;
            var isMove=false;

            box.addEventListener("touchstart",function(){
            //    获取时间戳
                startTime=Date.now();
            })

            box.addEventListener("touchmove",function(){
                isMove=true;

            })

            box.addEventListener("touchend",function(){
            //    判断是否为点击事件
                if(!isMove&&Date.now()-startTime<150){
                    //执行点击事件的逻辑
                    callback&&callback();
                }
                //数据重置
                isMove=false;
                startTime=0;
            });
        }
    }
}