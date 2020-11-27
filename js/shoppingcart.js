$(function(){

    if(localStorage.getItem("goods")){
        var goodsArr=JSON.parse(localStorage.getItem("goods"))
        
        $.ajax({
            url:"../date/carts.json",
            dataType:"json",
            type:"get",
            success:function(data){
             
                $.each(goodsArr,function(goodindex,gooditem){
                    $.each(data,function(index,item){
                        var arr=item.price
                        if(gooditem.code===item.code){
                            var dom=``;
                           dom+=
                    `<div class="catitem">
                              <div class="catitem-w1">
                                  <input type="checkbox" class="ipt">
                              </div>
                              <div class="catitem-w2">
                                  <div class="pic"><img src="${item.imgurl}" alt=""></div>
                                  <div class="namecon">
                                      <p>${item.title}</p>
                                      <h3>1个装</h3>
                                      <i></i>
                                  </div>
                              </div>
                              <div class="catitem-w3">
                                  <h2>
                                   <span>
                                       <span>￥${item.price}</span>
                                   </span>
                                  </h2>
                              </div>
                              <div class="catitem-w4">
                                    <div class="textcon">
                                  <span class="next">-</span>
                                  <span code="${item.code}" class="change">${gooditem.num}</span>
                                  <span class="prev">+</span>
                                </div>
                                
                              </div>
                              <div class="catitem-w5">
                                  <p price="${item.price}">￥${arr*gooditem.num}</p>
                              </div>
                              <div class="catitem-w6">
                                  <a href="#">移入收藏夹</a>
                                  <a href="javascript:;" code="${item.code}" class="w6">删除</a>
                              </div>
                          </div>`    
                          $(".cat").append(dom);
                } 
                        })             
                    })
                        /* })  */ 
                            }
                                })

            //删除
            $(".cat").on("click",".catitem-w6 .w6",function(){
                $(this).parent().parent().remove()
                var code=$(this).attr("code")
                $.each(goodsArr,function(index,item){
                    if(item.code===code){
                        goodsArr.splice(index,1)
                        return false
                    }
                })
                if(goodsArr.length>0){
                 localStorage.setItem("goods",JSON.stringify(goodsArr))   
                }else{
                    localStorage.removeItem("goods")
                    var nodata = `<div class="emptystatus">
                    <div class="emptyCart"></div>
                    <div class="emptyText">购物车还是空滴</div>
                    <p>
                      <span>登录</span>
                      <a href="#">继续逛</a>
                    </p>
                </div>`
                    $('.cat').html(nodata)
                }
               alert( "商品移出成功")
            })

    //增加
    $(".cat").on("click",".catitem-w4 .textcon .prev",function(){  
    var num=$(this).siblings(".change").text();
    num++;
    $(this).siblings(".change").text(num);
    var newNum= $(this).siblings(".change").text();
    var  price=$(this).parent().parent().siblings(".catitem-w5").children("p").attr("price")
    var lastprice=price*newNum;
    $(this).parent().parent().siblings(".catitem-w5").children("p").text("￥"+lastprice)

    if( $(this).parent().parent().siblings(".catitem-w1").children("input").prop("checked")){
    var sumprice=0;
    $(".catitem-w1 input").each(function(index,item){
        if($(item).prop("checked")){
            sumprice+=Number($(item).parent().siblings(".catitem-w5").children("p").text().split("￥").splice(1,1)) 
            $(".cbthr h6 span .cbthrnum").text(sumprice)   
           
        }
            })
                }


    var code=$(this).siblings(".change").attr("code");
    $.each(goodsArr,function(index,item){
        if(item.code===code){
            goodsArr[index].num=num
            localStorage.setItem("goods",JSON.stringify(goodsArr))
        }
            })      
    })


    //减少
    $(".cat").on("click",".catitem-w4 .textcon .next",function(){
    var num=$(this).siblings(".change").text();
    num--;
    if(num<1){
        alert("本商品一件起售")
        return false
    }
    $(this).siblings(".change").text(num);
    var newNum= $(this).siblings(".change").text();//数量
    var  price=$(this).parent().parent().siblings(".catitem-w5").children("p").attr("price")
    var lastprice=price*newNum;//总额
    $(this).parent().parent().siblings(".catitem-w5").children("p").text("￥"+lastprice)
    
    if( $(this).parent().parent().siblings(".catitem-w1").children("input").prop("checked")){
        var sumprice=0;
       $(".catitem-w1 input").each(function(index,item){
            if($(item).prop("checked")){
                sumprice+=Number($(item).parent().siblings(".catitem-w5").children("p").text().split("￥").splice(1,1)) 
                $(".cbthr h6 span .cbthrnum").text(sumprice)   
            }
                })
                    }

    var code=$(this).siblings(".change").attr("code");
    $.each(goodsArr,function(index,item){
        if(item.code===code){
            goodsArr[index].num=num
            localStorage.setItem("goods",JSON.stringify(goodsArr))
        }
            })
                 })


     //点击显示价格
     $(".cat").on("click",".catitem-w1 .ipt",function(){
        var price=0;
       $(".catitem-w1 input:checked").each(function(index,item){
           price+= Number($(item).parent().siblings(".catitem-w5").children("p").text().split("￥").splice(1,1))
            $(".cbthr h6 span .cbthrnum").text(price)             
        })  
    })

    
    //判断多选框为全选时全选框选中，不全选就不选中
    $(".cat").on("click",".catitem-w1 .ipt",function(){
        var flag=true
       /*  var price=0 */
         $(".catitem-w1 .ipt").each(function(index,item){
             if(!$(item).prop("checked")){
                 $(".tt .w-w1 input").prop("checked",false)
                 $(".cartbot .cbone input").prop("checked",false) 
                 flag=false;
                 return false;
             }
         })
       
         if(flag){
             $(".tt .w-w1 input").prop("checked",true)
             $(".cartbot .cbone input").prop("checked",true)
         }
     })
 
     //上面点击全选就全选
     $(".tt .w-w1 input").click(function(){
         if($(this).prop("checked")){
             $(".cat .catitem-w1 .ipt").prop("checked",true)
             $(".cartbot .cbone input").prop("checked",true)
                 var number=goodsArr.length
                 $(".cbone span .cbonenum").text(number)
                 var price=0;
                 $(".catitem-w1 input:checked").each(function(index,item){
                    price+=  Number($(item).parent().siblings(".catitem-w5").children("p").text().split("￥").splice(1,1))
                     $(".cbthr h6 span .cbthrnum").text(price)
                 })
         }else{
             $(".cartbot .cbone input").prop("checked",false)
             $(".cat .catitem-w1 .ipt").prop("checked",false)
             $(".cbone span .cbonenum").text(0)
             $(".cbthr h6 span .cbthrnum").text(0)
         }
     })
     //下面点击全选就全选
     $(".cartbot .cbone input").click(function(){
         if($(this).prop("checked")){
             $(".cat .catitem-w1 .ipt").prop("checked",true)
             $(".tt .w-w1 input").prop("checked",true)
             var number=goodsArr.length
             $(".cbone span .cbonenum").text(number)
             var price=0;
             $(".catitem-w1 input:checked").each(function(index,item){
                price+=  Number($(item).parent().siblings(".catitem-w5").children("p").text().split("￥").splice(1,1))
                 $(".cbthr h6 span .cbthrnum").text(price)
             })
         }else{
             $(".cat .catitem-w1 .ipt").prop("checked",false)
             $(".tt .w-w1 input").prop("checked",false)
             $(".cbone span .cbonenum").text(0)
             $(".cbthr h6 span .cbthrnum").text(0)
         }
     })

     //
     $(".cat").on("click",".catitem catitem-w1 input",function(){
            var sumprice=0;
        $(".catitem input").each(function(index,value){
            if($(value).prop("checked")){
                sumprice+=Number($(item).parent().siblings(".catitem-w5").children("p").text().split("￥").splice(1,1)) 
                $(".cbthr h6 span .cbthrnum").text(sumprice)   
            }else{
                $(".cbthr h6 span .cbthrnum").text(0) 
            }
        })

     })

     //件数统计
    $(".cat").on("click",".catitem-w1 input",function(){
        $(this).each(function(index,item){
            if($(item).prop("checked")){
                var number=index+1
                $(".cbone span .cbonenum").text(number)    
            }else{
                $(".cbone span .cbonenum").text(0)
              /*   var price=0;
                $(".catitem-w1 input:checked").each(function(index,item){
                   price+=  Number($(item).parent().siblings(".catitem-w5").children("p").text().split("￥").splice(1,1))
                    $(".cbthr h6 span .cbthrnum").text(price) */
                $(".cbthr h6 span .cbthrnum").text(0)
                /* }) */
            }
        })
    })
    $(".cat").on("click",".catitem-w1 input",function(){
        $(".catitem-w1 input:checked").each(function(index,item){
                var number=index+1
                $(".cbone span .cbonenum").text(number) 
        })
    })

                                 
    }else{
        var nodata = `<div class="emptystatus">
        <div class="emptyCart"></div>
        <div class="emptyText">购物车还是空滴</div>
        <p>
          <span>登录</span>
          <a href="#">继续逛</a>
        </p>
    </div>`
        $('.cat').html(nodata)
        }
    
    
  /*   var end=document.querySelector(".end")
    window.onscroll=function(){
    var stop=document.documentElement.scrollTop || document.body.scrollTop
       
    if(stop>=65){
        end.style.position = "fixed";
        end.style.bottom = 60;
    }
    else{
        end.style.position = "static";
        }   
    } */
    
    
        })
    
    
    