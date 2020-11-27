$(function () {
    let form = layui.form;
    let layer = layui.layer;
    //发送Ajax

    getInfo();
    //封装发送获取信息的ajax
    function getInfo() {
        $.ajax({
            url: "/my/userinfo",
            success: function (res) {
                //console.log(res);
                if (res.status !== 0) {

                    return layer.msg('获取用户基本信息失败！')
                }

                //获取成功
                form.val("userForm", res.data);
            }

        });


    };

    //重置功能
    $("#resetBtn").click(function (e) {
        e.preventDefault();
        //在次发送ajax获取数据，填充到form中
        getInfo();
    });

    //提交表单数据-修改用户信息
    $("#userForm").submit(function (e) {
        e.preventDefault();
        let data = $(this).serialize();
        //console.log(data);

        $.ajax({

            type: "POST",
            url: "/my/userinfo",
            data,
            success: function (res) {
                console.log(res);

                if (res.status != 0) {
                    return layer.msg("修改用户信息失败");
                }
                layer.msg("修改用户信息成功");

                //通过window.parent来获取到父页面（既 index.html）
                window.parent.getAvatarAndName();
                // console.log(window.parent.getAvatarAndName);
            }
        })
    });

    //添加表单校验功能

    form.verify({
        nickname: function (value, item) {
            console.log(value);
            if (value.length > 6) {

                return "昵称长度必须在1~6字符之间";
            }

        }
    });
});