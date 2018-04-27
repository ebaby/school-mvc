
var loginViewModel = function () {
    var self = this;

    self.apiPath = ko.observable('/webapi/API.ashx');
    self.apiAouthPath = ko.observable(window.globalConfig.oapi);
    self.username = ko.observable('');
    self.password = ko.observable('');
    //self.verifycode = ko.observable();
    //self.piccodepath = ko.observable('/webapi/verifycode?v=' + new Date().getTime());

    //self.message = ko.observable('');;

    self.accountfocus = ko.observable(true);
    self.passwordfocus = ko.observable(false);
    self.codefocus = ko.observable(false);

    self.Init = function () {

    };

    self.enterpress = function (data, event) {
        //self.message('');
        window.location.href = "layout.html"
        return;
        if (event.keyCode === 13) {
            var name = $.trim($("#username").val());
            var pwd = $.trim($("#password").val());
            //var code = $.trim($("#verifycode").val());

            if (name === "") {
                self.accountfocus(true);
                self.passwordfocus(false);
                self.codefocus(false);
                //alert("请输入帐号");
                //self.message('请输入帐号');
                toastr.error('请输入帐号', '');
            }
            else if (name != "" && pwd == "") {
                self.accountfocus(false);
                self.passwordfocus(true);
                self.codefocus(false);
                //self.pwdmsg('请输入密码');
                //toastr.error('请输入密码', '');
            }
                //else if (name != "" && pwd != "" && code == "") {
                //    self.accountfocus(false);
                //    self.passwordfocus(true);
                //    self.codefocus(true);
                //    //self.codemsg('请输入验证码');
                //    //toastr.error('请输入验证码', '');
                //}
            else if (name != "" && pwd != "") {
                self.submit();
            }


        }
        return true;

    };


    self.submit = function (i,j) {
        if (self.isValid()) {
            $.ajax({
                type: 'POST',
                url: self.apiAouthPath() + "OAuth/General/Token_Get",
                dataType: "json",
                data: { clientid: window.globalConfig.clientid, signature: encrypt(), LoginPass: "", appver: "", phonemodel: "", machinecode: "", imsi: "", systemver: "", browser: "" },
                beforeSend: function (XMLHttpRequest) { $(j.target).attr("disabled", true); $(j.target).removeClass("green"); },

            }).done(function (json) {
                json = convertKeysToCamelCase(json);
                if (json.code === 0) {
                    var token = json.data.Access_Token;
                    window.localStorage.token = token;

                    self.login();
                }

            }).fail(function (xhr, type) {

            }).complete(function () {
                $(j.target).attr("disabled", false);
                $(j.target).addClass("green");
            });

        }

    };

    self.login = function () {
        if (self.isValid())
        {
            $.ajax({
                type: 'POST',
                url: self.apiAouthPath() + 'Account/User/UnionOffice/UnionOffice_Login',
                dataType: "json",
                data: { Token: window.localStorage.token, LoginUserName: $.trim($("#username").val()), LoginPass: $.trim($("#password").val()) },
                
            }).done(function (json) {
                json = convertKeysToCamelCase(json);
                if (json.code === 0) {
                    //window.localStorage.userinfo = JSON.stringify(json.data[0]);
                    window.localStorage.uoid = json.data.uoid;
                    window.location.href = "/layout.html";
                } else {
                    //alert(json.msg);
                    //self.message(json.msg);
                    toastr.error(json.msg, '')
                }
            }).fail(function (xhr, type) {

            });

        }

    };


    self.isValid = function () {
        var cg = true;
        try {
            var name = $.trim($("#username").val());
            var pwd = $.trim($("#password").val());
            //var code = $.trim($("#verifycode").val());

            if (name == "") {
                throw ("请输入帐号");
                //self.phonemsg('请输入帐号');
            }
            if (pwd == "") {
                throw ("请输入密码");
                //self.pwdmsg('请输入密码');
            }
            //if (code == "") {
            //    throw ("请输入验证码");
            //    //self.codemsg('请输入验证码');
            //}

        } catch (e) {
            cg = false;
            //self.message(e);
            toastr.error(e, '')
            //alert(e);
        }
        return cg;

    };


    self.forgetOpen = function () {
        $("#basic").fadeIn('slow');
        if (!$("#basic").hasClass('in')) {
            $("#basic").addClass('in');
        }
    };

    self.forgetClose = function () {
        $("#basic").fadeOut('slow');
        if ($("#basic").hasClass('in')) {
            $("#basic").removeClass('in');
        }
    };


};
