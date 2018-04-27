
var indexViewModel = function () {
    var self = this;
    
    self.Init = function () {

        self.loadSite();

    };

    self.site = {
        id: ko.observable(0),
        phone: ko.observable(''),
        email: ko.observable(''),
        address: ko.observable(''),

    };



    self.loadSite = function () {

        $.ajax({
            type: "POST",
            url: "/Admin/Home/LoadSiteInfo",
            dataType: 'json',
            data: {  },
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
            error: function () { alert("服务器没有返回数据，可能服务器忙，请重试 + loadSite"); }
        });

    };

    self.save = function () {
       
        $.ajax({
            type: 'POST',
            url: "/Admin/SaveSite",
            data: { id: self.site.id(), phone: self.site.phone(), email: self.site.email(), address: self.site.address() },
            dataType: 'json',
            //beforeSend: function (XMLHttpRequest) { $("#btnApply").attr("disabled", true); index = layer.load(3); },
            success: function (json) {
                if (json.code === 0) {
                    layer.alert('操作成功', 1);

                }
                else {
                    $("#btnApply").attr("disabled", false);
                    layer.alert(json.msg, 3);

                }
            },
            error: function () { alert("服务器没有返回数据，可能服务器忙，请重试+Save"); $("#btnApply").attr("disabled", false); }
        });


    };

}
