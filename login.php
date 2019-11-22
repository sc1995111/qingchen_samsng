<?php
    header("Content-type:text/html;charset=utf-8");
    /* 创建一个变量去接收错误信息 */
    $resDate = array("code" => 0, "message" => "");

    /* 获取js传入服务器的数据 */
    $username = $_POST["username"];
    $password = $_POST["password"];
    $idcard = $_POST["idcard"];
    $tel = $_POST["tel"];
    $creatData = $_POST["date"];

    /* 验证提交过来的数据 */



    /* 连接数据库 */
    $link = mysql_connect("localhost", "root", "123456");
    if(!$link){
        $resDate["code"] = 1;
        $resDate["message"] = "服务器忙";
        echo json_encode($resDate);
        exit;
    }
    /* 访问字符集 */
    mysql_set_charset("utf8");
    /* 选择数据库 */
    mysql_select_db("qd_1908");
    /* 判断数据库中有没有重名的username */
    $sql = "SELECT * FROM users WHERE username='{$username}'";
    $res = mysql_query($sql);
    /* 取出一行数据进行判断是否有同名的数据 */
    $row = mysql_fetch_assoc($res);//返回的是一个布尔值
    /*  */
    if($row){
        $resDate["code"] = 2;
        $resDate["message"] = "用户名重复";
        echo json_encode($resDate);
        exit;
    }
    /* 密码hd5加密 */
    $strss = md5($password);
    // echo $strss;
    /* 注册sql语句 */
    // $sql = "INSERT INTO users(username,passwords,idcard,tel,create_time) VALUES('{$username}','{$strss}','{$idcard}','{$tel}','{$date}')"
    $sql = "INSERT INTO users(username,passwords,idcard,tel,create_time) VALUES('{$username}','{$strss}',{$idcard},'{$tel}','{$creatData}')";
    // echo $sql;
    /* 发送语句 */
    $res = mysql_query($sql);
    // echo $res;
    //判断是否可以成功
    if(!$res){
        $resDate["code"] = 3;
        $resDate["message"] = "服务器忙";
        echo json_encode($resDate);
        exit;
    }else{
        $resDate["code"] = 0;
        $resDate["message"] = "注册成功";
        echo json_encode($resDate);
    }

    /* 关闭数据库 */
    mysql_close($link);
?>