window.onload = function () {
//    ��ҳͷ��  ����ҳ�����  ��ɫ
    setHeader();

//    ����ʱ
    dowmTime();

//    �ֲ�ͼ

    banner();

}

function setHeader() {
//    �Ѱ���Ļ�������¼�
//    ҳ������� ͷ��������ɫ�����ı�
//    ��������ĸ߶�С��  banner�ĸ߶�  �򽥱� ,���򲻱�ɫ
    var opacity = 0;

//    ��ȡheader����

    var header = document.querySelector(".header-in");

//    ��ȡbanner�ĸ߶�
    var banner = document.querySelector(".jd-banner");

//    ��ȡbanner���ӵĸ߶�
    var H = banner.offsetHeight;

    window.onscroll = function () {
        //    ��ȡ��Ļ�Ĺ����߶�
        var top = document.body.scrollTop;

        if (top < H) {
            opacity = top / H * 0.85;
        } else {
            //����banner�ĸ߶�
            opacity = 0.85;
        }

        //    ��͸�������ø�����
        header.style.background = "rgba(201,21,35," + opacity + ")";
    }
}

//����ʱ

function dowmTime() {
    var time = 24 * 60 * 60;
    var spans = document.querySelectorAll(".sk-time span");
    //����ʱ
    //    ��ʱ��
    var timer = setInterval(function () {
        time--;
        //    ��Ҫʱ��ת��  ʱ����
        var h = Math.floor(time / 3600);
        var m = Math.floor(time % 3600 / 60);
        var s = Math.floor(time % 60);


        //    ʱ���ʽת�� 00:000:00 ��ʽ
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


//�ֲ�ͼ

function banner() {
//    ͨ����ʱ�������ֲ�ͼ������
//    �Ǳ����
//    �߽���  0-9
//    �����л��ֲ�ͼ   touch
//    ����������� С����Ļ��1/3 ,������ȥ
//    ����1/3  �л�ͼƬ

    //    ��ȡ��Ҫ�õ��ı�ǩ
    var banner = document.querySelector(".jd-banner");
    //  ul
    var imgBox = document.querySelector(".imgBox");
    //  ol  li �Ǳ�
    var points = document.querySelectorAll(".points li");
//    banner �Ŀ��
    var W = banner.offsetWidth;
//    ����index  ��ŵ�ǰ��ʾͼƬ������ֵ
    var index = 1;

    //console.log(W);
    //����imgBox��λ��
    var setTranslateX=function(x){
        imgBox.style.transform = "translateX(" + x + "px)";
        //    ����webkit�ں˵������      -webkit-  -o-  -moz-  -ms-
        imgBox.style.webkitTransform = "translateX(" + x + "px)";
    }
//    ��ӹ���Ч��
    var addTransition=function(){
        imgBox.style.transition = "all 0.2s";
        imgBox.style.webkitTransition = "all 0.2s";
    }

//    ɾ������Ч��
    var removeTransition=function(){
        imgBox.style.transition="none";
        imgBox.style.webkitTransition="none";
    }

//    ��ʱ��  ��װ����
    var turn=function(){
    //    ���ֲ�ͼ�л��ĺ�������
        index++;
        var left=-index*W;

    //    �л�ǰ��ӹ���Ч��
        addTransition();
    //    �л��ֲ�ͼ  ʵ��css3��Ч��
        setTranslateX(left);
    }

//    -------��ʱ��ģ��--------
    var timer = setInterval(turn,1000);
    //-----��ӹ��ɽ����¼�
//    ���� imgBox �Ĺ�������¼�
// ����ִ�����ˣ��ж������Ƿ�Խ��

    imgBox.addEventListener('transitionEnd',function(){
        //console.log(2);
    })

    itcast.addTransitionEnd(imgBox,function () {
        //       �ж������Ƿ�Խ��
        console.log(2)
        if (index >= 9) {
            index = 1;

        }
        if (index <= 0) {
            index = 8;
        }

        //    ������ת
        var left=-index*W;
        // ɾ������Ч��
        removeTransition();
        //�л��ֲ�ͼ  ��css3��ʵ��
        setTranslateX(left);

    //    �ýǱ�ͬ��
        setPoints(index);

    });
    //-------�Ǳ�ͬ��--------
    function  setPoints(index){
    //    ���� ���� �ų�������  ͻ����ʾ�Լ�
        for(var i=0;i<points.length;i++){

            points[i].classList.remove('current');
        }
    //    ͻ����ʾ�Լ�
        points[index-1].classList.add('current');
    }
    //-------���������Ĳ���---------

    var startX=0;
    var moveX=0;
    var distanceX=0;

    banner.addEventListener("touchstart",function(e){
    //    ��¼��ʼ�Ĵ���λ��
        startX= e.targetTouches[0].clientX;
    //    �����ʱ��
        clearInterval(timer);
    });

    banner.addEventListener("touchmove",function(e){
        moveX= e.targetTouches[0].clientX;
    //    ��������
        distanceX=moveX-startX;
    //    imgBox �������λ��
        setTranslateX(-index*W+distanceX);
    });

    banner.addEventListener("touchend",function(){
    //    imgBox  �������� �����л�ͼƬ����һ��  ��һ�ţ�;
    //    ��������ľ������Ļ��ȵ�1/3 �л�ͼƬ
    //    distanceX>0 ��һ��
    //    distanceX< 0 ��һ��
        if(Math.abs(distanceX)>W/3){
            if(distanceX>0){
            //    ��һ��
                index--;

            }

            if(distanceX<0){
                //��һ��
                index++;
            }
        }

        var left=-index*W;
    //    ��ӹ���Ч��
        addTransition();
    //    �� imgBox λ��
        setTranslateX(left);

    //    ������ʱ��
        timer=setInterval(turn,1000);
    })

}












