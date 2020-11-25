$(function () {

    // 去注册
    $("#gotoRegi").click(function () {
        //注册区域显示
        $(".regiBox").show();
        //登录区域隐藏
        $(".loginBox").hide();
    });
    // 去登录
    $("#gotoLogin").click(function () {
        //注册区域显示
        $(".regiBox").hide();
        //登录区域隐藏
        $(".loginBox").show();
    });

    //从layui中获取到form表单的功能
    let form = layui.form;
    let layer = layui.layer;
    //表单校验
    form.verify({
        //我们既支持上述函数式的方式，也支持下述数组的形式
        //数组的两个值分别代表：[正则匹配、匹配不符时的提示文字]
        pass: [
            /^[\S]{6,12}$/
            , '密码必须6到12位，且不能出现空格'
        ],
        //再次确认密码的校验  需要和密码框的内容保持一致===》函数写法
        repass: function (value, item) {
            //value：表单的值、item：表单的DOM对象 
            let pwd = $(".regiBox input[name=password]").val();
            if (value !== pwd) {
                return '两次输入的密码不一致！';
            }
        },
    });

    //注册ajax代码

    $('#regiForm').on('submit', function (e) {
        e.preventDefault();
        //收集表单属性
        let data = $(this).serialize();
        //console.log(data);
        //直接发送ajax请求
        $.ajax({
            type: "POST",
            url: "/api/reguser",
            data,
            success: function (res) {

                console.log(res);
                if (res.status !== 0) {
                    return layer.msg('注册失败' + res.message)

                }
                layer.msg('注册成功');
                //注册成功，返回登录界面
                $("#gotoLogin").click();
            }
        })
    })

    //登录的ajax代码
    $("#loginForm").on('submit', function (e) {
        e.preventDefault();
        let data = $(this).serialize();
        // console.log(data);

        $.ajax({
            type: "POST",
            url: "/api/login",
            data,
            success: function (res) {
                console.log(res);
                if (res.status !== 0) {
                    return layer.msg('登录失败')

                }
                //     layer.msg('登录成功，即将前往后台主页');
                //     localStorage.setItem("token", res.token);
                //     //跳转页面
                //     location.href = "index.html";

                localStorage.setItem("token", res.token);
                layer.msg(
                    "登录成功，即将去后台主页",
                    {
                        time: 2000, //2秒关闭（如果不配置，默认是3秒）
                    },
                    function () {
                        // 关闭后做的事情 ==> 跳转页面
                        location.href = "index.html";
                    }
                )
            }
        })
    })
})