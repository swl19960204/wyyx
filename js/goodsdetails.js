$(function(){
    
    ajax({
        url: "../date/carts.json",
        type: 'get',
        cache: false,
        dataType: 'json',
        success: function (data){
            for(var i=0;i<1;i++){
                var str=``;
                      str+=`
        <ul class="speclist">
                     <li><a href="javascript:;"><img src="${data[0].imgurl}" code="${data[0].code}" alt=""></a></li>

                    <li><a href="javascript:;"><img src="${data[1].imgurl}" code="${data[1].code}" alt=""></a></li>

                     <li><a href="javascript:;"><img src="${data[2].imgurl}" code="${data[2].code}" alt=""></a></li>

                      <li><a href="javascript:;"><img src="${data[3].imgurl}" code="${data[3].code}" alt=""></a></li>
            </ul>`
             $(".spec").append(str);
            }
        }
    })

   /*  $(".cetright").on("click",".spec .speclist img",function(){
        var _this=$(this)
        $(".spec .speclist img").each(function(index,item){
            $(".cerfive .cerfivetwo").click(function(){
                $(item).add()
            })
        })    
    }) */
 

/* function add(){ */
    $(".cetright").on("click",".spec .speclist img",function(){
        var code=$(this).attr("code");
        if(localStorage.getItem("goods")){
            var goodsArr=JSON.parse(localStorage.getItem("goods"))
        }else{
            var goodsArr=[]
        }
        var hasGoods=false;

        if(goodsArr.length>0){
            $.each(goodsArr,function(index,item){
                if(item.code===code){
                    item.num++
                    hasGoods=true
                    return false
                }
            })
        }
        if(!hasGoods){
            goodsArr.push({code:code,num:1})
        }
        localStorage.setItem("goods",JSON.stringify(goodsArr))
        alert("添加购物车成功")
    }) 
/* }
 */
        

    //放大镜
    $(".smallimg").on("mouseenter",$(".imgmask"),function(){
        $(this).children(".imgmask").css("display","block")
        $(this).siblings(".bigimg").css("display","block")
    })

    $(".smallimg").bind("mousemove",function(e){
            var l = e.clientX- $(this).offset().left-100
            var t = e.clientY-$(this).offset().top-90
                var maxl=$(this).width()-215;
                var maxT=$(this).height()-215;
                if(l<0){
                    l=0
                }
               else if(l>=maxl){
                    l=maxl
                }
               if(t<0){
                    t=0
                }
               else if(t>=maxT){
                    t=maxT
                }
                var to_l=l+"px";
                var to_t=t+"px";
                var max_l=l*-2+"px";
                var max_t=t*-2+"px";
                $(this).children(".imgmask").css({
                    left:to_l,
                    top:to_t
                  });
                $(this).siblings(".bigimg").children("img").css({
                    left:max_l,
                    top:max_t
                  });
    })
    
  $(".smallimg").on("mouseleave",$(".imgmask"),function(){
    $(this).children(".imgmask").css("display","none")
    $(this).siblings(".bigimg").css("display","none")
})

    //切换图片
    $(".imglist img").each(function(index,item){
        $(item).click(function(){
        $(".smallimg img").eq(index).addClass('show').siblings().removeClass('show')
        $(".bigimg img").eq(index).addClass('bigshow').siblings().removeClass('bigshow')
    })
})

    //显示小购物车
    $(".cp").mousedown(function(){
        $(".mincart").css("display","block")
    })
    $(".mincart").mouseleave(function(){
        $(".mincart").css("display","none")
    })




})