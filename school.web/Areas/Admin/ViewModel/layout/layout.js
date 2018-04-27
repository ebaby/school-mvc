/**
登陆框VM
**/
var layoutViewModel = function () {
    var self = this;

    self.username = ko.observable('管理员');
    self.menuItems = ko.observableArray([]);

    self.Init = function () {

        //self.getusername();
        //self.loadMenus();

    };


    self.getusername = function () {
        $.get("/Login/GetName", function (data) {
            if (data != "") {
                self.username(data);
            }
        });

    };

    self.loginout=function () {
        var ii = layer.confirm("确定要退出吗", function () {
            $.ajax({
                type: "POST",
                url: "/Login/UserLoginOut",
                data: {},
                dataType:'json',
                //beforeSend: function (XMLHttpRequest) {  },
                success: function (result) {
                    if (result.code == 0) {

                        LinkContent('/Login/LoginOut', '');
                        //window.location.href = "/Login/LoginOut";
                    }
                    else {
                        //$.messager.alert('提示', data.replace("error:", ""));
                        layer.alert(result.msg,8);
                    }
                },
                error: function () { alert("服务器没有返回数据，可能服务器忙，请重试"); }
            });

            layer.close(ii);
        });

    }

    self.loadMenus = function () {
        $.ajax({
            type: "get",
            url: "/Admin/GetAllMenus",
            data: {},
            //dataType: 'json',
            //beforeSend: function (XMLHttpRequest) {  },
            success: function (data) {

                //$.each(json, function () {
                //    self.menuItems.push(this);
                //});

                if (data != "") {
                    $("#my_menu").html(data);
                    myMenu = new SDMenu("my_menu").init();
                } else { $("#my_menu").html(""); }
            },
            error: function () { alert("服务器没有返回数据，可能服务器忙，请重试"); }
        });
    };


    self.openLayer = function () {
        var index = layer.open({
            type: 1,
            title: '修改密码',
            //closeBtn: 1,
            area: '500px',
            //skin: 'layui-layer-nobg', //没有背景色
            shadeClose: false,
            content: $('#dlgpwd')
        });
        $("#btnClose").click(function () {
            layer.close(index);
        });
    };


    self.checkPwd=function () {
        var cg = true;
        try {
            if ($.trim($("#opwd").val()) == "") {
                throw ("请添加旧密码");
            }
            if ($.trim($("#npwd").val()) == "") {
                throw ("请添加新密码");
            }
            if ($.trim($("#cpwd").val()) == "") {
                throw ("请添加确认密码");
            }
            if ($.trim($("#cpwd").val()) != $.trim($("#npwd").val())) {
                throw ("确认密码与新密码不符。");
            }

        }
        catch (e) {
            cg = false;
            layer.alert(e, 8);
        }
        return cg;
    }

    self.updpwd=function () {
        if (self.checkPwd()) {
            var ii = layer.confirm("确定要修改密码吗", function () {
                var index;

                $.ajax({
                    type: "POST",
                    url: "/Admin/UpdatePwd",
                    data: { "newpwd": $.trim($("#npwd").val()), "oldpwd": $.trim($("#opwd").val()) },
                    beforeSend: function (XMLHttpRequest) {
                        $("#btnUpd").attr("disabled", true); index = index = layer.load(1, {
                            shade: [0.1, '#fff'] //0.1透明度的白色背景
                        });
                    },
                    success: function (data) {

                        if (data.indexOf("error:") == -1) {
                            layer.alert("保存成功", 1);
                            $("#opwd").val("");
                            $("#npwd").val("");
                            $("#cpwd").val("");
                            $('#dlgpwd').dialog('close');
                        }
                        else {
                            layer.alert(data.replace("error:", ""), 8);
                            $("#btnUpd").attr("disabled", false);
                        }
                        layer.close(index);


                    },
                    error: function () { alert("服务器没有返回数据，可能服务器忙，请重试+updpwd"); $("#btnUpd").attr("disabled", false); }
                });

                layer.close(ii);
            });

        }
    }


}
