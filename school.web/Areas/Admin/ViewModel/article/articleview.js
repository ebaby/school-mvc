
var articleViewModel = function () {
    var self = this;

    self.categories = ko.observableArray([]);


    self.Init = function () {

        self.loadgrid();        
        self.loadArticleCategories();

    };

    self.form = {
        categoryid: ko.observable(''),
        
    };


    self.search = function () {
        
        var param = {
            categoryid: self.form.categoryid()
            //, "articlename": $.trim($("#articlename").val()), "author": $.trim($("#author").val()), "begintime": $.trim($("#begintime").val()), "endtime": $.trim($("#endtime").val())
        };
        ko.observable(param);        
        //this.loadgrid();
        $("#tbList").datagrid("load", param);
    };

    self.loadgrid = function () {

        $('#tbList').datagrid({
            //title:'应用系统列表', 
            //iconCls:'icon-edit',//图标 
            fitColumns: true,
            method: 'post',
            width: 'auto',
            //height: 'auto', 
            nowrap: false,
            striped: true,
            border: true,
            collapsible: false, //是否可折叠的 
            //fit: true,//自动大小 
            url: '/Admin/Article/LoadArticles',
            //sortName: 'code', 
            //sortOrder: 'desc', 
            remoteSort: false,
            idField: 'id',
            singleSelect: true, //是否单选 
            pagination: true, //分页控件 
            pageNumber: 1,
            pageSize: 15, //每页显示的记录条数，默认为10 
            pageList: [5, 10, 15], //可以设置每页记录条数的列表 
            rownumbers:true,//行号 
            queryparams: { categoryid: self.form.categoryid() }, //ko.observable(),
            columns: [[
                        { field: 'id', title: '编号', width: 60, align: 'center' },
                        { field: 'menuname', title: '分类', width: 100, align: 'center' },
                        { field: 'name', title: '文章标题', width: 300, align: 'center' },
                        //{ field: 'author', title: '作者', width: 120, align: 'center' },
                        //{ field: 'previewnumber', title: '点击数', width: 100, align: 'center' },
                        { field: 'createtime', title: '发布日期', width: 100, align: 'center' },
                        {//0 THEN '待审' WHEN 1 THEN '发布' WHEN -1 THEN '删除'
                            field: 'status', title: '状态', width: 100, align: 'center', formatter: function (value, rowData, rowIndex) {
                                switch (rowData.status) {
                                    case 0:
                                        return '待审';
                                        break;
                                    case 1:
                                        return '发布';
                                        break;
                                    case -1:
                                        return '删除';
                                        break;
                                    default:
                                        break;
                                }
                            }
                        }
            //                        { field: '_operate', title: '操作', width: 140, align: 'center', formatter: function (value, rowData, rowIndex) {

            //                            //function里面的三个参数代表当前字段值，当前行数据对象，行号（行号从0开始）

            //                            return "<a style='cursor:pointer;' onclick='LinkContent(\"/Destination/AddAreaRegion\",{ type: \"query\", area_id: " + rowData.area_id + ",level:\"" + 2 + "\" } )'>查看</a>"; //&nbsp;&nbsp;<a  style='cursor:pointer;' onclick='LinkContent(\"/Destination/AddAreaRegion\",{ type: \"update\", area_id: " + rowData.area_id + ",level:\"" + 2 + "\" } )'>修改</a>
            //                        }
            //                        }
            ]],
            toolbar: [{
                iconCls: 'icon-add',
                text: '添加',
                handler: function () { self.addArticle('add',0); }
            },
            {
                iconCls: 'icon-edit',
                text: '编辑',
                handler: function () {
                    self.updArticle();
                }
            },
            {
                iconCls: 'icon-search',
                text: '查看',
                handler: function () {
                    self.queryArticle();
                }
            },
            {
                iconCls: 'icon-cancel',
                text: '删除',
                handler: function () {
                    self.cancelMenu();
                }
            },
            {
                iconCls: 'icon-tip',
                text: '状态设置',
                handler: function () {
                    self.setStatus();
                }
            }
            ]


        });
        //设置分页控件 
        var p = $('#tbList').datagrid('getPager');
        $(p).pagination({
            //            pageSize: 15, //每页显示的记录条数，默认为10 
            //            pageList: [5, 10, 15], //可以设置每页记录条数的列表 
            beforePageText: '第', //页数文本框前显示的汉字 
            afterPageText: '页    共 {pages} 页',
            displayMsg: '当前显示 {from} - {to} 条记录   共 {total} 条记录'
            /*onBeforeRefresh:function(){
            $(this).pagination('loading');
            alert('before refresh');
            $(this).pagination('loaded');
            }*/
        });

    };

    self.addArticle = function () {
        self.layerDialog('添加文章', '/Admin/Article/AddArticle?type=add&id=0');

    };

    self.updArticle = function () {
        var row = $('#tbList').datagrid('getSelected');
        if (row) {
            
            self.layerDialog('编辑文章', '/Admin/Article/AddArticle?type=upd&id=' + row.id);
        } else {
            layer.alert('请选中一行', 3);
        }
    };
    self.queryArticle = function () {
        var row = $('#tbList').datagrid('getSelected');
        if (row) {
            
            self.layerDialog('查看文章', '/Admin/Article/AddArticle?type=query&id=' + row.id);
        } else {
            layer.alert('请选中一行', 3);
        }
    };
    self.cancelMenu = function () {
        var row = $('#tbList').datagrid('getSelected');
        if (row) {
            var index = layer.confirm('确定要删除吗', function () {


                layer.close(index);
            });
        } else {
            layer.alert('请选中一行', 3);
        }
    };
    self.setStatus = function () {
        var row = $('#tbList').datagrid('getSelected');
        if (row) {
            var title;
            var status;
            if (row.status == 0) {
                title = '发布';
                status = 1;
            } else { title = '取消发布'; status = 0; }

            var index = layer.confirm('确定要'+title+'吗', function () {
                $.post('/Admin/Article/SetStatus', { ArticleID: row.id, status: status }, function (data) {
                    if (data.code == 0) {
                        var ii = layer.alert(title+'成功', 1, function () {

                            $("#tbList").datagrid("load");

                            layer.close(ii);
                        });

                    } else {
                        layer.alert(data.msg, 3);
                    }
                    layer.close(index);
                },'json');


            });
        } else {
            layer.alert('请选中一行', 3);
        }
    };

    self.layerDialog = function (title, url) {
        var width = ($(window).width() - $(window).width() * 0.44) + 'px';
        var height = ($(window).height() - $(window).height() * 0.24) + 'px';

        layer.open({
            type: 2,
            title: title,
            area: [width, height],
            fix: false, //不固定
            maxmin: true,
            content: url
        });
    };

    self.getParentMenus = function () {

        $.get('/Admin/GetParentMenus', function (data) {
            self.menuItems(eval(data));
        });
    };

    //category
    self.loadArticleCategories = function () {

        $.ajax({
            type: "POST",
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

    self.getCategoryName = function (id) {
        var name = "";
        $.ajax({
            type: "get",
            url: '/Admin/Article/GetCategoryNameByID',
            //async: false,
            dataType: "json",
            data: {id:id},
            success: function (data) {
               
                name = data;
            },
            error: function (i, j, k) {


            }
        });
        return name;

    };



}
