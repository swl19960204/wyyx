$(function(){

    ajax({
      url: "../data/goods.json",
      type: 'get',
      cache: false,
      dataType: 'json',
      success: function (data){
        for(var i=0;i<2;i++){
          var str=``;
                str+=`
                    <div class="swiper-slide">
                      <div class="newmain">
                      <ul class="newlist">
                        <li>
                          <div class="hd">
                          <a href=""><img src="${data[0].imgurl}" id="imgfirst" alt="">
                          <img src="${data[4].imgurl}" id="imgtwo" alt="">
                          </a>
                           </div>
                        <div class="bd">
                          <h4>${data[0].title}</h4><span>${data[0].price}</span>
                        </div>
                      </li>
                      <li class="litwo">
                          <div class="hd">
                          <a href="javascript:;"><img src="${data[1].imgurl}" id="imgfirst" alt="">
                          <img src="${data[5].imgurl}" id="imgtwo" alt="">
                          </a>
                           </div>
                        <div class="bd">
                          <h4>${data[1].title}</h4><span>${data[1].price}</span>
                        </div>
                      </li>
                      <li>
                          <div class="hd">
                          <a href=""><img src="${data[2].imgurl}" id="imgfirst" alt="">
                          <img src="${data[6].imgurl}" id="imgtwo" alt="">
                          </a>
                           </div>
                        <div class="bd">
                          <h4>${data[2].title}</h4><span>${data[2].price}</span>
                        </div>
                      </li>
                      <li>
                          <div class="hd">
                          <a href=""><img src="${data[3].imgurl}" id="imgfirst" alt="">
                          <img src="${data[7].imgurl}" id="imgtwo" alt="">
                          </a>
                           </div>
                        <div class="bd">
                          <h4>${data[3].title}</h4><span>${data[3].price}</span>
                        </div>
                      </li>
                      </ul>
                  </div>
                </div>`;
            $("#swp").append(str);
        }
      }
    })
    //切换类名显示对应的图片和背景颜色     
    $("#swp").on("mouseenter",".newlist li",function(){
      $(this).children(".hd").children("a").children("#imgfirst").css("display","none")
      $(this).children(".hd").children("a").children("#imgtwo").css("display","block")
      $(this).children(".bd").css("backgroundColor","#F4F0EA")
      $(this).children(".bd").css("backgroundColor","#F4F0EA")
    })
    $("#swp").on("mouseleave",".newlist li",function(){
      $(this).children(".hd").children("a").children("#imgtwo").css("display","none")
      $(this).children(".hd").children("a").children("#imgfirst").css("display","block")
      $(this).children(".bd").css("backgroundColor","#ffffff")
  })

  //悬浮
  var list=document.querySelector(".indexside");
  var func=document.querySelector(".funcs");
  var funbig=document.querySelector(".funbig");
  window.onscroll=function(){
    var stop=document.documentElement.scrollTop || document.body.scrollTop;
    if(stop>=176){
      func.style.display="block";
      funbig.style.display="block";
      func.style.position="fixed";
      funbig.style.position="fixed";
      var functop=0+"px";
      func.style.top=functop;
      funbig.style.top=functop;
    }else{
      func.style.display="none";
      funbig.style.display="none";
    }
    if(stop>=614){
      list.style.position="fixed";
      var t=10+"px";
      list.style.top=t;
    }else{
      list.style.position="absolute";
      var newt=614+"px";
      list.style.top=newt;
    }
}


  //跳转详情页面
  $("#swp").on("click",".swiper-slide .newmain .newlist .litwo",function(){
            location.href="http://127.0.0.1:5500/pages/goodsdetails.html"
  })


  //点击弹出登录界面,关闭登录界面
  $(".mainfirst .signup").click(function(){
    $(".signin").css("display","block")
    $(".signin").css("position","fixed")
    /* $("body").css("backgroundColor","blue") */
/*     $("body").css("zIndex","98") */
  })
  $(".signin .signdel").click(function(){
    $(this).parent().parent().css("display","none")
  })


  //登录
$(".login").click(function(){
  $.ajax({
      url: "http://localhost/code/wyyx/dist/php/register.php",
      type: 'get',
      /* cache: false, */
      /* dataType: 'json', */
      data:{
        emailname:$(".emailname").val(),
        emailpass:$(".emailpass").val(),
        type:"login"
    },  
      success: function (json){
        $(".phpinfotion .phpinfo").text(JSON.parse(json).message)
       /*  console.log(JSON.parse(json).message); */
       if(JSON.parse(json).code==0){
        /* location.reload(); */
        $(".signin").css("display","none")
        $(".mainfirst .signup").text($(".emailname").val())

       }
      
      },
  })
})

  //注册
  $(".register").click(function(){
  $.ajax({
      url: "http://localhost/code/wyyx/dist/php/register.php",
      type: 'get',
      /* cache: false, */
      /* dataType: 'json', */
      data:{
        emailname:$(".emailname").val(),
        emailpass:$(".emailpass").val(),
        type:"register"
    },  
      success: function (json){
        $(".phpinfotion .phpinfo").text(JSON.parse(json).message)
       /*  console.log(json.message); */
       if(JSON.parse(json).code==6){
        /* location.reload(); */
        $(".signin").css("display","none")
        $(".mainfirst .signup").text($(".emailname").val())
       }
      },
  })
})
//倒计时
var  d= $('.timehour');
var f =$('.timemin');
var m =$('.timesec');
function countTime(time){
  setInterval(function(){
     var nowTime = new Date().getTime();
     var endTime = new Date(time).getTime();
     var res = parseInt(endTime - nowTime);
      //补零
       function db(item){
           return  item <10 ? "0"+item : item;
       }
       var  houre=res/1000/60/60;//得到小时
       var dd = db(parseInt(houre/24));
       var hh =db( parseInt((houre/24 - dd) * 24));
       var ff = db(parseInt(((houre/24 - dd) * 24 - hh) * 60));
       var mm=db( parseInt((((houre/24 - dd) * 24 - hh) * 60 - ff) * 60));
          d.text(hh);
          f.text(ff);
           m.text(mm);
        if(res<0){
         d.text('00');
         f.text('00');
         m.text('00');
           }

  },1000)
}
countTime("2020-11-30 22:00:00");



})