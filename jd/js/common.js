
// �����ռ�
var itcast={
    //��һ�����Ӱ󶨹��ɽ����¼�(ʵ��css3�ļ�������)
    //box:���¼��Ķ���
    //callback: ���ɽ����¼���������ִ��ʲô����
    addTransitionEnd:function(box,callback){
    //   �ж��û����ݵ��Ƿ���һ������

        if(box&&typeof(box)=='object'){
        //    ���� box�ǿ��õ�
        //    ��box�� �¼�

       box.addEventListener("transitionEnd",function(){
                //if(callback){
                //    callback();
                //}
                //���callback������ִ��

                callback&&callback();

       });

       box.addEventListener("webkitTransitionEnd",function(){
                //if(callback){
                //    callback();
                //}
                //���callback������ִ��

                callback&&callback();

       });
     }
   },


    //tap�¼�
    //box :��˭���¼�
    //callback tap �¼� ������Ҫִ�еĲ���

    tap:function(box,callback){
        if(box&&typeof(box)=="object"){
            var startTime=0;
            var isMove=false;

            box.addEventListener("touchstart",function(){
            //    ��ȡʱ���
                startTime=Date.now();
            })

            box.addEventListener("touchmove",function(){
                isMove=true;

            })

            box.addEventListener("touchend",function(){
            //    �ж��Ƿ�Ϊ����¼�
                if(!isMove&&Date.now()-startTime<150){
                    //ִ�е���¼����߼�
                    callback&&callback();
                }
                //��������
                isMove=false;
                startTime=0;
            });
        }
    }
}