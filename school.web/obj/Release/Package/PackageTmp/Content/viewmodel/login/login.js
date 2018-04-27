/**
登陆框VM
**/
var loginViewModel = function (gloabinfo) {

    var self = this, name = '', password = '', serverurl = '', param = '';


    //    if (usercookie) { name = usercookie.username, password = usercookie.userpwd; }
    //    this.username = ko.observable(name).extend({
    //        minLength: { params: 2, message: "名称最小长度为2个字符" },
    //        maxLength: { params: 30, message: "名称最大长度为30个字符" },
    //        required: { params: true, message: '请输入用户' }
    //    });
    //    this.pwd = ko.observable(password).extend({
    //        minLength: { params: 6, message: "密码长度为6个字符" },
    //        maxLength: { params: 6, message: "密码长度为6个字符" },
    //        required: { params: true, message: '请输入密码' }
    //    });
    //    this.isremember = ko.observable(false);
    //    this.usernamefocus = ko.observable(true);
    //    this.usernameerror = ko.computed(function () {
    //        return !(self.username.isValid());
    //    })
    //    this.usernamemsg = ko.computed(function () {
    //        return self.username.error();
    //    })
    //    this.pwdfocus = ko.observable(false);
    //    this.pwderror = ko.computed(function () {
    //        return !(self.pwd.isValid());
    //    })
    //    this.pwdmsg = ko.computed(function () {
    //        return self.pwd.error();
    //    })

    $("#password").focus(function () {
        $("#left_hand").animate({
            left: "150",
            top: " -38"
        }, { step: function () {
            if (parseInt($("#left_hand").css("left")) > 140) {
                $("#left_hand").attr("class", "left_hand");
            }
        }
        }, 2000);
        $("#right_hand").animate({
            right: "-64",
            top: "-38px"
        }, { step: function () {
            if (parseInt($("#right_hand").css("right")) > -70) {
                $("#right_hand").attr("class", "right_hand");
            }
        }
        }, 2000);
    });
    //失去焦点
    $("#password").blur(function () {
        $("#left_hand").attr("class", "initial_left_hand");
        $("#left_hand").attr("style", "left:100px;top:-12px;");
        $("#right_hand").attr("class", "initial_right_hand");
        $("#right_hand").attr("style", "right:-112px;top:-12px");
    });


    //触发回车键
    this.enterpress = function (data, event) {

        if (event.keyCode === 13) {

            if ($.trim($("#username").val()) == "" && $.trim($("#password").val()) == "") {
                var ii = layer.alert('请输入用户名', 8, function () {
                    $("#username").focus();
                    layer.close(ii);
                });


            }
            else if ($.trim($("#username").val()) != "" && $.trim($("#password").val()) == "") {
                $("#password").focus();

            }
            else {
                self.submit();
            }

        }
        return true;
    }


    this.submit = function () {
        var index;
        if (isCheck()) {

            $.ajax({
                type: "POST",
                url: "/Login/UserLogin",
                data: { "username": $.trim($("#username").val()), "password": $.trim($("#password").val()) },
                beforeSend: function (XMLHttpRequest) { index = layer.load(3); $('#btnLogin').attr("disabled", true); $('#btnReset').attr("disabled", true); },
                success: function (data) {

                    if (data.indexOf("error:") == -1) {

                        window.location.href = "/Home/Index";
                    }
                    else {
                        layer.alert(data.replace("error:", ""), 8);
                        $('#btnLogin').attr("disabled", false);
                        $('#btnReset').attr("disabled", false);
                    }
                    layer.close(index);
                },
                error: function () {
                    layer.alert("服务器没有返回数据，可能服务器忙，请重试",8);
                    $('#btnLogin').attr("disabled", false);
                    $('#btnReset').attr("disabled", false);
                    layer.close(index);
                }
            });

        }
        else {
            return false;
        }
    }
    this.reset = function () {
        
        $("#username").val("");
        $("#password").val("");
    }


    var isCheck = function () {
        var cg = true;
        var flag;
        try {

            if ($.trim($("#username").val()) == "") {
                //$("#username").focus();
                flag = 0;
                throw ("请输入用户名");
            }
            //            else {
            //                if (name.length < 2) {
            //                    throw ("用户名最小长度为2个字符");
            //                }
            //                if (name.length > 30) {
            //                    throw ("用户名最大长度为30个字符");
            //                }
            //                $("#password").focus();
            //            }
            if ($.trim($("#password").val()) == "") {
                //$("#password").focus();
                flag = 1;
                throw ("请输入密码");
            }
            //            else {
            //                if (pwd.length < 6) {
            //                    throw ("密码长度为6个字符");
            //                }
            //                if (pwd.length > 6) {
            //                    throw ("密码长度为6个字符");
            //                }
            //            }

        } catch (e) {
            var ii = layer.alert(e, 8, function () {
                switch (flag) {
                    case 0:
                        $("#username").focus();
                        break;
                    case 1:
                        $("#password").focus();
                        break;
                    default:
                        break;
                }

                layer.close(ii);
            });
            cg = false;
        }
        return cg;
    }

}
