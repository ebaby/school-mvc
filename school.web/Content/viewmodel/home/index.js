
var indexViewModel = function () {
    var self = this;

    self.shopname = ko.observable([]);
    self.address = ko.observable([]);

    self.menuids = ko.observableArray([ 1002, 1004,1005]);
    self.menuInfo = ko.observableArray([]);


    self.Init = function () {

        self.loadMenuInfo();

    };
    
    //self.getMenus = function () {
    //    $.each(self.menuids, function () {
    //        self.loadMenu(this);
    //    });
    //};
    
    self.loadMenuInfo = function () {
        var formData = new FormData();
        formData.append("menuids", self.menuids());
        fetch("/Home/LoadMenuInfo", {
            method: 'post',
            body: formData
        }).then(function (response) {
            if (response.ok) {
                response.json().then(function (json) {

                    if (json.code == 0) {

                        ko.utils.arrayForEach(json.data, function (o) {
                            var obj = {
                                id: o.id,
                                name: o.name,
                                urlpath: o.urlpath,
                                article: self.loadArticleList(o.id),
                            };
                            
                            self.menuInfo.push(obj);
                        });
                        
                        
                    }
                });
            }
        }).catch(function (err) {
            // 出错了;等价于 then 的第二个参数,但这样更好用更直观 :(
        });

        //$.ajax({
        //    type: "POST",
        //    url: "/Home/LoadMenuInfo",
        //    dataType: 'json',
        //    data: { menuids: self.menuids() },
        //    //beforeSend: function (XMLHttpRequest) {  },
        //    success: function (json) {
        //        if (json.code === 0) {debugger

        //            self.menuItems.push(json.data);
                  

        //        } else {
        //            //$("#my_menu").html("");
        //        }
        //    },
        //    error: function () { alert("服务器没有返回数据，可能服务器忙，请重试"); }
        //});

    };

    self.loadArticleList = function (id) {
        var result = [];

        var formData = new FormData();
        formData.append("menuid", id);
        
        fetch("/Home/LoadArticleList", {
            method: 'post',
            body: formData
        }).then(function (response) {
            if (response.ok) {
                response.json().then(function (json) {

                    if (json.code == 0) {
                        //self.menuInfo(json.data);
                        result = json.data;
                    }
                });
            }
        }).catch(function (err) {
            // 出错了;等价于 then 的第二个参数,但这样更好用更直观 :(
        });
        return result;
    };

    self.goToDetail = function (i, j) {        
            LinkContent(this.urlpath, { id: this.id });
    };



}
