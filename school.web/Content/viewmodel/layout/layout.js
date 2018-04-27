
var layoutViewModel = function () {
    var self = this;

    self.vm = {
        username: ko.observable(''),
        password: ko.observable(''),
        verifycode:ko.observable(''),

    };

    self.currentDate = ko.observable('');
    self.imgcode = ko.observable('');
    self.menuItems = ko.observableArray([]);
    self.tablewidth = ko.observable(0);

    self.Init = function () {

        self.loadMenus();
        self.loadSite();
        self.getDate();
        self.getImgCode();

    };


    self.site = {
        id: ko.observable(0),
        phone: ko.observable(''),
        email: ko.observable(''),
        address: ko.observable(''),

    };

    self.loginout = function () {
        var ii = layer.confirm("确定要退出吗", function () {
            $.ajax({
                type: "get",
                url: "/Login/UserLoginOut",
                data: {},
                //beforeSend: function (XMLHttpRequest) {  },
                success: function (data) {
                    if (data.indexOf("error:") == -1) {

                        LinkContent('/Login/LoginOut', '');
                        //window.location.href = "/Login/LoginOut";
                    }
                    else {
                        //$.messager.alert('提示', data.replace("error:", ""));
                        layer.alert(data.replace("error:", ""));
                    }
                },
                error: function () { alert("服务器没有返回数据，可能服务器忙，请重试"); }
            });

            layer.close(ii);
        });

    }

    self.loadMenus = function () {
        $.ajax({
            type: "POST",
            url: "/Home/LoadMenus",
            dataType:'json',
            data: {},
            //beforeSend: function (XMLHttpRequest) {  },
            success: function (json) {
                if (json.code === 0) {
                    //$("#my_menu").html(data);
                    //myMenu = new SDMenu("my_menu").init();

                    self.menuItems(json.data);
                    self.tablewidth(1004/json.data.length);

                } else {
                    //$("#my_menu").html("");
                }
            },
            error: function () { alert("服务器没有返回数据，可能服务器忙，请重试"); }
        });
    }

    self.loadSite = function () {

        $.ajax({
            type: "POST",
            url: "/Home/LoadSiteInfo",
            dataType: 'json',
            data: { },
            //beforeSend: function (XMLHttpRequest) {  },
            success: function (json) {
                if (json.code === 0) {

                    self.site.id(json.data.id);
                    self.site.phone(json.data.phone);
                    self.site.email(json.data.email);
                    self.site.address(json.data.address);


                } else {
                    //$("#my_menu").html("");
                }
            },
            error: function () { alert("服务器没有返回数据，可能服务器忙，请重试"); }
        });

    };

    self.goToDetail = function (i, j) {
        $("[name='tbmenu']").css('background', '#0363B5');
        $(j.target).parent('a').parent('td').parent('tr').parent('tbody').parent('table').css('background', '#EE9A00');//images/nzcms.077.gif

        if (this.name == '首页') {
            window.location = '/Home/Index'
        } else
        {
            LinkContent(this.urlpath, { id: this.id });
        }
    };

    self.getDate = function () {
        var date = getCurrentDateTime();
        var calendar = showCal();
        self.currentDate(date + calendar);
    };

    self.getImgCode = function () {
        self.imgcode('/Home/GetImgCode?t=' + (new Date()).valueOf());
    };

    self.login = function () {
        if (self.valid()) {
            $.ajax({
                type: "POST",
                url: "/Admin/Login/UserLogin",
                data: { "username": $.trim($("#username").val()), "password": $.trim($("#password").val()) },
                beforeSend: function (XMLHttpRequest) { $('#btnLogin').attr("disabled", true); $('#btnReset').attr("disabled", true); },
                success: function (data) {

                    if (data.indexOf("error:") == -1) {

                        window.open("/Admin/Home/Index");
                    }
                    else {
                        toastr.error(data.replace("error:", ""), '');
                        //layer.alert(data.replace("error:", ""), 8);
                        //$('#btnLogin').attr("disabled", false);
                        //$('#btnReset').attr("disabled", false);
                    }
                    layer.close(index);
                },
                error: function () {
                    //layer.alert("服务器没有返回数据，可能服务器忙，请重试", 8);
                    $('#btnLogin').attr("disabled", false);
                    $('#btnReset').attr("disabled", false);
                    //layer.close(index);
                }
            });
        }
    };

    self.valid = function () {
        var cg = true;
        try {
            if (self.vm.username() == '') {
                throw ("请添加用户名");
            }
            if (self.vm.password() == '') {
                throw ("请添加密码");
            }
            if (self.vm.verifycode()=='') {
                throw ("请添加验证码");
            }
            //else if (self.vm.verifycode() != self.imgcode()) {
            //    throw ("验证码错误");
            //}

        } catch (e) {
            cg = false;
            //self.errorMessage(e);
            toastr.error(e, '');
        }
        return cg;
    };

}
