
var articleViewModel = function (otype,id) {
    var self = this;

    self.isdisabled = ko.observable(''),
    self.categories = ko.observableArray([]);
    //self.imgItems = ko.observableArray([]);


    self.article = {
        id:ko.observable(0),
        name:ko.observable(''),
        content: ko.observable(UE.getEditor('content')),
        orderid: ko.observable(''),
        menuid: ko.observable(''),
        articletype: ko.observable('0'),
        imageurl: ko.observableArray([]),
    };

    self.Init = function () {
        self.loadArticleCategories();
        if (otype != 'add') {
            self.loadArticleEntity();
        }
        if (otype == 'query') {
            self.isdisabled('none');
        }
    };


    //category
    self.loadArticleCategories = function () {

        $.ajax({
            type: "post",
            url: '/Admin/Article/LoadArticleCategories',
            //async: false,
            dataType: "json",
            data: {},
            success: function (json) {

                //$.each(json, function () {

                //    self.categories.push(this);
                //});
                self.categories(json);
            },
            error: function (i, j, k) {


            }
        });

    };

    //loaddata
    self.loadArticleEntity = function () {
        $.ajax({
            type: "post",
            url: '/Admin/Article/LoadArticleEntity',
            //async: false,
            dataType: "json",
            data: {"id":id},
            success: function (json) {
                self.article.id(json.id);
                self.article.name(json.name);
                self.article.content(json.content);
                UE.getEditor('content').setContent(json.content, true);
                self.article.menuid(json.menuid);
                self.article.orderid(json.orderid);
                self.article.articletype(json.articletype.toString());

                self.article.imageurl([]);
                self.article.imageurl.push(json.imageurl);
                //self.loadImages(json.id);
                
            },
            error: function (i, j, k) {


            }
        });


    };

    self.openDialog = function () {
        layer.open({
            type: 2,
            title: 'layer mobile页',
            shadeClose: true,
            shade: 0.8,
            area: ['380px', '90%'],
            content: 'http://layer.layui.com/mobile/' //iframe的url
        });
    };

    self.baseSave = function () {
        debugger
        if (check()) {
           var index = layer.load(1, {
                shade: [0.1, '#fff'] //0.1透明度的白色背景
            });
            $.ajax({
                type: 'POST',
                url: "/Admin/Article/SaveArticle",
                dataType: "json",
                data: {
                    articleid: self.article.id(),
                    name: self.article.name(),
                    content: encodeURIComponent(UE.getEditor('content').getContent()),//self.article.content(),
                    menuid: self.article.menuid(),
                    orderid: self.article.orderid(),
                    articletype: self.article.articletype(),
                    images: self.article.imageurl().join(',')

                }

            }).done(function (json) {
                if (json.code === 0) {
                    var ii = layer.alert('保存成功', { closeBtn: 0 }, function () {
                        //$("#btnApply").attr("disabled", false);
                        //$('#dlgmenu').dialog('close');

                        //var path = '/Admin/LoadMenus' + "?parentid=0";
                        //$("#tbList").treegrid("options").url = path;
                        //parent.$("#tbList").treegrid("load");
                        parent.$("#tbList").datagrid("load");

                        layer.close(ii);
                        parent.layer.closeAll();
                    });

                } else {

                    layer.alert(json.msg, 3);
                }
            }).fail(function (xhr, type) {

            }).complete(function () {
                layer.close(index);
            });
        }
    };

    function check() {
        var cg = true;
        try {
            if ($.trim(self.article.name()) == "") {
                throw ("请添加文章标题");
            }

            if ($.trim(self.article.menuid()) == "") {
                throw ("请选择文章分类");
            }
            if (self.article.articletype() == "0") {
                if ($.trim(self.article.content()) == "") {
                    throw ("请添加文章内容");
                }
            } else {
                if ($.trim(self.article.imageurl().join(',')) == "") {
                    throw ("请添加文章图片");
                }
            }


        }
        catch (e) {
            layer.alert(e, {
                icon: 0,
                skin: 'layer-ext-moon' //该皮肤由layer.seaning.com友情扩展。关于皮肤的扩展规则，去这里查阅
            });
            //toastr.error(e, '');
            cg = false;
        }
        return cg;
    }

    //loadImages
    self.loadImages = function (id) {

        $.ajax({
            type: "post",
            url: "/Admin/Article/LoadImages",
            //async: false,
            dataType: "json",
            data: { articleid: id },
            success: function (json) {
                if (json.code === 0) {
                    //$.each(json, function () {

                    // self.imgItems.push(this);
                    //});

                    self.imgItems(json.data);

                }

            },
            error: function (i, j, k) {


            }
        });


    };
    //delete image
    self.delImage = function (i, j) {
        var index = layer.confirm("确定要删除该图片吗", function () {

            self.article.imageurl.remove(i);
            //$(j.target).parent().remove();
            initData();
            layer.close(index);
        });

    };

   self.upload= function () {
       var url ='/Admin/Article/UpLoadImage' ;//'http://localhost:14489/api/Image/UpLoadImage';
       var formData = new FormData();
       formData.append("file", $("#pimage")[0].files[0]);

       fetch(url, {
           method: 'post',
           body: formData
       }).then(function (response) {
           if (response.ok) {
               response.json().then(function (json) {

                   if (json.code == 0) {
                       //self.article.imageurl([]);
                        self.article.imageurl.push(json.path);

                        //$('.piclist').width($('.piclist').width() + 300);
                        initData();

                   }
               });
           }
       }).catch(function (err) {
           // 出错了;等价于 then 的第二个参数,但这样更好用更直观 :(
       });

        //$('#UpLoadForm').ajaxSubmit({
        //    url: 'http://localhost:14489/api/Image/UpLoadImage', /*设置post提交到的页面*/
        //    data: {  },
        //    type: "POST", /*设置表单以post方法提交*/
        //    dataType: "json", /*设置返回值类型为json类型*/
        //    beforeSend: function (XMLHttpRequest) {
        //        index = layer.load(1, {
        //            shade: [0.1, '#fff'] //0.1透明度的白色背景
        //        });
        //    },
        //    success: function (json, status) {
        //        //var result = unescape(html);
        //        if (json.code === 0) {
        //            self.article.imageurl([]);
        //            self.article.imageurl.push(json.path);

        //        //    var image = "<li><img src=\"" + unescape(json.path) + "\" /><div class=\"pic_close\" onclick=\"delImage(this)\"></div></li>";
        //        //    $("#dvPic").show();
        //        //    $("#dvPic div div ul").append(image);


        //        //    $('.piclist').width($('.piclist').width() + 300);
        //        //    ImageInit('dvPic', 113);
        //        //} else {
        //        //    layer.alert(json.msg, { icon: 2 });
        //        }
        //        layer.close(index);

        //    }
        //});

    }

   self.prev = function () {
       var liw = 0;
       if ($('.piclist').is(':animated')) {
           $('.piclist').stop(true, true);
       } /* 避免点击事件重复 */

       ml = parseInt($('.piclist').css('left'));
       if (ml > -700) {
           s = ml;
       } else {
           s = -700;
       }
       $('.piclist').animate({ left: ml - s + 'px' }, 'slow');
   };
   self.next = function () {
       var liw = 0;
       if ($('.piclist').is(':animated')) {
           $('.piclist').stop(true, true);
       } /* 避免点击事件重复 */

       ml = parseInt($('.piclist').css('left'));
       r = liw - (700 - ml);  /* 700为外部区块.infopic的宽度，15为li之间的距离，即.piclist li的margin-right的值 */
       if (r < 700) {
           s = r - 15;
       } else {
           s = 700;
       }
       $('.piclist').animate({ left: ml - s + 'px' }, 'slow');
   };

   //$(".zt-img-prev").click(function () {

   //    var num = 7;
   //    var len = $("#zt-marquee ul li").length;
   //    var liWin = $("#zt-marquee ul li").outerWidth(true);
   //    var winBox = liWin * len;
   //    var box_value = liWin * (len - num);
   //    var boxWin = 0;


   //    boxWin = boxWin + liWin;
   //    if (boxWin > 0 || boxWin == 0) {
   //        boxWin = 0;
   //    }
   //    $("#zt-marquee").css("left", boxWin + "px");
   //});
   //$(".zt-img-next").click(function () {
   //    boxWin = boxWin - liWin;
   //    if (Math.abs(boxWin) > box_value) {
   //        boxWin = 0;
   //    }
   //    $("#zt-marquee").css("left", boxWin + "px");
   //});


}




var changeStatus = function (id) {
    alert(id)

};


function initData() {
    liw = 0;
    var timer = window.setInterval(function () {
        if ($('.piclist li').eq(0).width() != 0) {


            $('.piclist li').each(function () {

                liw += $(this).find('img').width() + 15;
                $(this).find('img').css('width', ($(this).find('img').width() == 0 ? 231 : $(this).find('img').width()) + 'px');
            })
            $('.piclist').width(liw + 'px');

            clearInterval(timer);
        }


    }, 1000);
    


    $('.pic_next').click(function () {

        if ($('.piclist').is(':animated')) {
            $('.piclist').stop(true, true);
        } /* 避免点击事件重复 */

        ml = parseInt($('.piclist').css('left'));
        r = liw - (700 - ml);  /* 700为外部区块.infopic的宽度，15为li之间的距离，即.piclist li的margin-right的值 */
        if (r < 700) {
            s = r - 15;
        } else {
            s = 700;
        }
        $('.piclist').animate({ left: ml - s + 'px' }, 'slow');
    })

    $('.pic_prev').click(function () {

        if ($('.piclist').is(':animated')) {
            $('.piclist').stop(true, true);
        } /* 避免点击事件重复 */

        ml = parseInt($('.piclist').css('left'));
        if (ml > -700) {
            s = ml;
        } else {
            s = -700;
        }
        $('.piclist').animate({ left: ml - s + 'px' }, 'slow');
    });
}
