<?php

header("Content-type:text/html;charset=utf8");
header("Access-Control-Allow-Origin:*");

$responseDate=array("code"=>0,"message"=>"");

$emailname=$_GET["emailname"];
$emailpass=$_GET["emailpass"];
$type = $_GET['type'];

if(!$emailname){
    $responseDate["code"]=1;
    $responseDate["message"]="用户名不能为空";
    echo json_encode($responseDate);
    exit;
}
if(!$emailpass){
    $responseDate["code"]=2;
    $responseDate["message"]="密码不能为空";
    echo json_encode($responseDate);
    exit;
}

$link = mysqli_connect('localhost','root','root','work');

if (!$link){
    echo "连接失败";
    $responseDate["code"]=3;
    $responseDate["message"]="数据库链接失败";
    echo json_encode($responseDate);
    exit;
}

mysqli_set_charset( $link, "utf8" );

//登录
if($type === 'login') {// 查询sql语句
    $login_sql = "select * from register where emailname='$emailname' and emailpass='$emailpass'";
    // 执行sql语句
    $login_res = mysqli_query($link,$login_sql);
    $login_arr = mysqli_fetch_all($login_res,1);
    if (count($login_arr) > 0) {
        $responseDate["code"]=0;
        $responseDate["message"]="登录成功";
        echo json_encode($responseDate);
    } else {
        $responseDate["code"]=4;
        $responseDate["message"]="账号或密码错误";
        echo json_encode($responseDate);
    }
  }

// 注册
if ($type === 'register') {
    // 先查询注册的账号是否已存在
    $query_sql = "select * from register where emailname='$emailname'";
    $query_res = mysqli_query($link,$query_sql);
    $query_arr = mysqli_fetch_all($query_res,1);
    if (count($query_arr) > 0) {
        $responseDate["code"]=5;
        $responseDate["message"]="账号已被占用";
        echo json_encode($responseDate);
    }else{

 
      // 可以注册，插入数据
      /* $str=md5(md5(md5($emailpass)."xxx")."yyy"); */
      $insert_sql = "INSERT INTO register(emailname,emailpass) VALUES ('$emailname','$emailpass')";
      $insert_res = mysqli_query($link,$insert_sql);
     
      /* $insert_arr = mysqli_fetch_all($insert_res,1); */
      $num = mysqli_affected_rows($link);
  /*  if (count($insert_arr) > 0){
    $responseDate["code"]=7;
    $responseDate["message"]="注册失败";
    echo json_encode($responseDate); 
  }  */
  
      if ($num>0){
        $responseDate["code"]=6;
        $responseDate["message"]="注册成功";
        echo json_encode($responseDate);
      } else {
        $responseDate["code"]=7;
        $responseDate["message"]="注册失败";
        echo json_encode($responseDate); 
      }
    }
  }

// 关闭连接
mysqli_close($link);

?>