
var detailViewModel = function (id) {
    var self = this;

    self.isarticle = ko.observable(false);

    self.articleItems = ko.observableArray([]);
    self.leftMenuItems = ko.observableArray([]);

    self.menu = {
        name: ko.observable(''),
        remark: ko.observable(''),
        hasarticle: ko.observable(''),

    };

    self.article = {
        name: ko.observable(''),
        content: ko.observable(''),

    };


    self.Init = function () {

        self.loadMenu();
        self.loadLeftMenus();
    };

    self.loadLeftMenus = function () {

        $.ajax({
            type: "POST",
            url: "/Home/LoadLeftMenus",
            dataType: 'json',
            data: { },
            //beforeSend: function (XMLHttpRequest) {  },
            success: function (json) {
                if (json.code === 0) {

                    self.leftMenuItems(json.data);

                } else {
                    //$("#my_menu").html("");
                }
            },
            error: function () { alert("服务器没有返回数据，可能服务器忙，请重试"); }
        });

    };

    self.loadMenu = function () {

        $.ajax({
            type: "POST",
            url: "/Home/LoadMenuEntity",
            dataType: 'json',
            data: {id:id},
            //beforeSend: function (XMLHttpRequest) {  },
            success: function (json) {
                if (json.code === 0) {
                    
                    
                    self.menu.name(json.data.name);
                    self.menu.remark(json.data.remark);
                    self.menu.hasarticle(json.data.hasarticle==0?false:true);
                    
                    if (json.data.hasarticle == 1) {
                        self.loadArticles(json.data.id);
                    }
                    

                } else {
                    //$("#my_menu").html("");
                }
            },
            error: function () { alert("服务器没有返回数据，可能服务器忙，请重试"); }
        });

    };

    self.loadArticles = function (id) {
        
        $.ajax({
            type: "POST",
            url: "/Home/LoadArticles",
            dataType: 'json',
            data: {menuid:id},
            //beforeSend: function (XMLHttpRequest) {  },
            success: function (json) {
                if (json.code === 0) {
                    
                    
                    self.articleItems(json.data);
                    //$.each(self.articleItems(), function () {debugger
                    //    this.createtime = moment(this.createtime).format('YYYY-MM-DD');
                    //});

                } else {
                    //$("#my_menu").html("");
                }
            },
            error: function () { alert("服务器没有返回数据，可能服务器忙，请重试"); }
        });

    };

    self.loadArticleEntity = function () {

        $.ajax({
            type: "POST",
            url: "/Home/LoadArticleEntity",
            dataType: 'json',
            data: {id:this.id},
            //beforeSend: function (XMLHttpRequest) {  },
            success: function (json) {
                if (json.code === 0) {

                    self.article.name(json.data.name);
                    self.article.content(json.data.content);

                    self.isarticle(true);

                } else {
                    //$("#my_menu").html("");
                }
            },
            error: function () { alert("服务器没有返回数据，可能服务器忙，请重试"); }
        });

    };

    self.goToDetail = function (i, j) {
        LinkContent('/Home/Detail', { id: this.id });
    };


}
