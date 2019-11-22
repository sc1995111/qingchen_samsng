<?php
    header("Content-type:text/html;charset=utf-8");
    $resDate = array("code" => 0, "message" => "");
    $username = $_POST["username"];
    $password = $_POST["password"];


    $link = mysql_connect("localhost", "root", "123456");
    if(!$link){
        $resDate["code"] = 1;
        $resDate["message"] = "服务器忙";
        echo json_encode($resDate);
        exit;
    }

    mysql_set_charset("utf8");
    mysql_select_db("qd_1908");

    $strss = md5($password);
    $sql = "SELECT * FROM users WHERE username='{$username}' AND passwords='{$strss}'";
    $res = mysql_query($sql);
    $row = mysql_fetch_assoc($res);
    if(!$row){
        $resDate["code"] = 2;
        $resDate["message"] = "账号或者密码错误";
        echo json_encode($resDate);
        exit;
    }else{
        $resDate["message"] = "登陆成功";
        echo json_encode($resDate);
        exit;
    }
?>