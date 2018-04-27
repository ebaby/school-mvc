$(document).ready(function () {
    $("#username").focus();
});


function login() {
    var index;
    if (check()) {

        $.ajax({
            type: "POST",
            url: "/Login/UserLogin",
            dataType:'json',
            data: { "username": $.trim($("#username").val()), "password": $.trim($("#userpwd").val()) },//, "isadmin": $("#chkAdmin").is(':checked')
            beforeSend: function (XMLHttpRequest) {
                $("#username").attr("disabled", true); $("#userpwd").attr("disabled", true); $("#btnSub").attr("disabled", true); $("#btnReset").attr("disabled", true); index = index = layer.load(1, {
                    shade: [0.1, '#fff'] //0.1透明度的白色背景
                });
            },//$("#chkAdmin").attr("disabled", true);
            success: function (result) {

                if (result.code == 0) {

                    // returnUrl('ShopManager/SellerQuery.aspx', $("#my_menu").children("div").eq(0).children("a").eq(1));
                    window.location.href = "/Home/Index";
                }
                else {
                    layer.alert(result.msg, 8);

                    $("#username").attr("disabled", false);
                    $("#userpwd").attr("disabled", false);
                    $("#btnSub").attr("disabled", false);
                    $("#btnReset").attr("disabled", false);
                    //$("#chkAdmin").attr("disabled", false);
                }
                layer.close(index);
            },
            error: function () {
                alert("服务器没有返回数据，可能服务器忙，请重试"); 
                $("#username").attr("disabled", false);
                $("#userpwd").attr("disabled", false);
                $("#btnSub").attr("disabled", false);
                $("#btnReset").attr("disabled", false);
                //$("#chkAdmin").attr("disabled", false);
                layer.close(index);
            }
        });
        
    }
    else {
        return false;
    }
}

function check() {
    var cg = true;
    try {
        if ($.trim($("#username").val()) == "") {
            throw ("请添加用户名");
        }

        if ($.trim($("#userpwd").val()) == "") {
            throw ("请添加密码");
        }

    }
    catch (e) {
        //layer.alert(e,8);
        toastr.error(e, '');
        cg = false;
    }
    return cg;
}

function keyPress(e,type) {
    if (e == 13) {
        switch (type) {
            case 1:
                $("#userpwd").focus();
                break;
            case 2:
                login();
                break;
            default:
                break;
        }
        

        e = 9;
        event.returnValue = false;
    }
}

function reset() {
    $("#username").val("");
    $("#userpwd").val("");
    $("#chkAdmin").attr("checked",false);
}
