$(function () {

    let layer = layui.layer;

    //获取头像和昵称
    getAvatarAndName();

    //退出功能
    $("#logouBtn").click(function () {

        layer.confirm('确认退出吗?', { icon: 3, title: '提示' }, function (index) {
            //该函数会在点击确认的时候执行
            //console.log(233);
            localStorage.removeItem("token");
            location.href = "login.html";
            layer.close(index);//关闭当前的询问框
        });
    })
});
function getAvatarAndName() {
    //获取头像和昵称基本信息
    $.ajax({
        url: "/my/userinfo",
        // // 设置请求头
        // headers: {
        //     Authorization: localStorage.getItem("token"),
        // },
        success: function (res) {
            //console.log(res);

            if (res.status !== 0) {
                return layer.msg("获取用户失败")
            }

            //需要处理头像和昵称
            //1处理名字（优先展示昵称，其次用户名）
            let name = res.data.nickname || res.data.username;
            //console.log(name);
            let first = name[0].toUpperCase();
            $("#welcome").text("欢迎" + " " + name);


            //2 处理头像
            if (res.data.user_pic) {
                //有用户头像，展示用户头像，隐藏文字头像
                $('.layui-nav-img').show().attr("src", res.data.user_pic);
                $(".text-avatar").hide();
            } else {
                //没有用户头像，隐藏用户头像，展示文字头像==》文字头像的文字来源于name的第一个字符(大写的)
                $('.layui-nav-img').hide();
                $(".text-avatar").text(first).show();
            }

        },
        complete: function (xhr) {
            if (xhr.responseJSON.status === 1 && xhr.responseJSON.message === "身份认证失败！") {
                //清除token数据
                localStorage.removeItem("token");
                //返回登录界面
                location.href = "login.html";
            }
        }
    })
}