
var menuViewModel = function () {
    var self = this;

    self.menuItems = ko.observableArray([]);


    self.Init = function () {

        self.loadgrid();
        self.getParentMenus();


    };

    self.form = {
        id: ko.observable(0),
        name: ko.observable(''),
        parentid: ko.observable(''),
        orderid: ko.observable(''),
        icon: ko.observable(''),
        path: ko.observable(''),
        isvisible: ko.observable(true),
        isenabled: ko.observable(true),
        hasarticle: ko.observable(true),
        sourcetype: ko.observable('0'),
        remark: ko.observable('')

    };


    self.search = function () {
        
        var param = { "menuname": $.trim($("#menuname").val()), "pid": $("#pid").val(), "stype": $("#stype").val() };
        ko.observable(param);
        //this.loadgrid();
        var path = '/Admin/Home/LoadMenus' + "?parentid=0";
        $("#tbList").treegrid("options").url = path;
        $("#tbList").treegrid("load", param);
    };

    self.loadgrid = function () {
        //var param = "?menuname=" + $.trim($("#mname").val()) + "&stype=" + $.trim($("#stype").val());
        var url = '/Admin/Home/LoadMenus';
        $('#tbList').treegrid({
            rownumbers: true,
            animate: true,
            collapsible: true,
            fitColumns: false,
            url: url + "?parentid=0",
            method: 'get',
            idField: 'id',
            treeField: 'name',
            parentField: 'parentid',
            animate: true,
            lines: true,
            //height: height,
            pagination: true,
            pageNumber: 1,
            pageSize: 10, //每页显示的记录条数，默认为10 
            pageList: [5, 10, 15], //可以设置每页记录条数的列表 
            rownumbers: true,//行号 
            queryparams: { "parentid": 0 }, //ko.observable(),
            columns: [[
                        { field: 'id', title: '编号', width:100, align: 'center' },
                        { field: 'name', title: '菜单名称', width:400, align: 'left' },
                        { field: 'urlpath', title: '链接地址', width: 300, align: 'center' },
                        { field: 'orderid', title: '排序', width: 60, align: 'center' },
                        {
                            field: 'isvisible', title: '是否可见', width: 60, align: 'center', formatter: function (value, rowData, rowIndex) {
                                if (rowData.isvisible == 0) return '否'; else return '是';
                            }
                        },
                        {
                            field: 'isenabled', title: '是否启用', width: 60, align: 'center', formatter: function (value, rowData, rowIndex) {
                                if (rowData.isvisible == 0) return '否'; else return '是';
                            }
                        },
                        {
                            field: 'hasarticle', title: '是否有文章', width: 80, align: 'center', formatter: function (value, rowData, rowIndex) {
                                if (rowData.hasarticle == 0) return '否'; else return '是';
                            }
                        },
                        //{ field: 'SourceType', title: '来源类型', width: 100, align: 'center', formatter: function (value, rowData, rowIndex) { if (rowData.SourceType == 0) return '特卖平台'; else return '旅游平台'; } },
                        { field: 'createtime', title: '创建时间', width: 150, align: 'center', formatter: function (value, rowData, rowIndex) { return rowData.createtime.replace('T', ' ').replace('Z', ' '); } },
                        { field: 'updatetime', title: '最后更新时间', width: 150, align: 'center', formatter: function (value, rowData, rowIndex) { return rowData.createtime.replace('T', ' ').replace('Z', ' '); } },
                        { field: 'remark', title: '描述', width: 200, align: 'center' },
                       // { field: '_operate', title: '操作', width: 140, align: 'center', formatter: function (value, rowData, rowIndex) {

                       //         //function里面的三个参数代表当前字段值，当前行数据对象，行号（行号从0开始）
                       //     return "<a style='cursor:pointer;' onclick='editMenu(" + rowData.ID + ")' >编辑</a>"; //&nbsp;&nbsp;<a  style='cursor:pointer;' onclick='LinkContent(\"/Destination/AddAreaRegion\",{ type: \"update\", area_id: " + rowData.area_id + ",level:\"" + 2 + "\" } )'>修改</a>
                       //    }
                       //}
            ]],
            onBeforeExpand: function (row) {
                //动态设置展开查询的url  
                var path = url + "?parentid=" + row.id;
                $(this).treegrid("options").url = path;
                return true;
            },
            //onClickRow: function (rowIndex, rowData) {
            //    selectID = rowData.ID;
            //},
            //onBeforeLoad: function (row, param) {
            //    if (row) {
            //        $(this).treegrid('options').url = url + '?page=1&rows=999&parentid=' + row.ID;
            //    }             
            //},
            //onBeforeLoad: function(row,param){debugger
            //    if (!row) {	// load top level rows
            //        param.id = 0;	// set id=0, indicate to load new page rows
            //    }
            //},
            toolbar: [{
                iconCls: 'icon-add',
                text: '添加',
                handler: function () { self.addMenu(); }
            },
            {
                iconCls: 'icon-edit',
                text: '编辑',
                handler: function () {
                    self.editMenu();
                }
            },
            {
                iconCls: 'icon-cancel',
                text: '删除',
                handler: function () {
                    self.deleteMenu();
                }
            }]
            //            onLoadSuccess: function (data) {debugger
            //                if (data.total == 0) {
            //                    //var body = $(this).data().datagrid.dc.body2;
            //                    //body.find('table tbody').append('<tr><td width="' + body.width() + '" colspan="' + $("#tbList  tr:first").find("th").length + '" style="height: 25px; text-align: center;">暂无数据</td></tr>');
            //                }
            //            }


        });
        //设置分页控件 
        $('#tbList').datagrid('getPager').pagination({
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

            //, onSelectPage: function (pageNumber, pageSize) {
            //    $(this).pagination('loading');
            //    $('#tbList').treegrid('options').url = url + '?parentid=0&page=' + pageNumber + '&rows=' + pageSize;
            //    $('#tbList').treegrid('reload');
            //    $(this).pagination('loaded');
            //}
        });

    };

    self.addMenu = function () {
        ///$('#dlgmenu').dialog({ title: "添加菜单" });
        //$('#dlgmenu').dialog('open');
        self.openLayer('添加菜单');
        
        self.form.id(0);
        $("#dlgmenu input[type='text']").val('');

    };

    self.editMenu = function () {
        var row = $('#tbList').datagrid('getSelected');
        if (row) {
            $.getJSON('/Admin/Home/GetMenuEntity', { id: row.id }, function (json) {
                //$('#dlgmenu').dialog({ title: "修改菜单" });
                //$('#dlgmenu').dialog('open');
                self.openLayer('修改菜单');
                
                self.form.id(json.id);
                self.form.name(json.name);
                self.form.parentid(json.parentid);
                self.form.orderid(json.orderid);
                self.form.icon(json.icon);
                self.form.path(json.urlpath);
                self.form.isvisible(json.isvisible == 0 ? false : true);
                self.form.isenabled(json.isenabled == 0 ? false : true);
                self.form.hasarticle(json.hasarticle == 0 ? false : true);
                self.form.sourcetype(json.sourcetype.toString());
                self.form.remark(json.remark);

            });
        } else {
            layer.alert('请选中一行', 3);
        }
    };

    self.deleteMenu = function () {
        var row = $('#tbList').datagrid('getSelected');
        if (row) {
            var index = layer.confirm('确定要删除吗', function () {
                var k;
                $.ajax({
                    type: "POST",
                    url: "/Admin/Home/DeleteMenu",
                    data: { "menuid": row.id },
                    dataType:'json',
                    beforeSend: function (XMLHttpRequest) {
                        k = index = layer.load(1, {
                            shade: [0.1, '#fff'] //0.1透明度的白色背景
                        });
                    },
                    success: function (json) {
                        if (json.code=== 0) {
                            var ii = layer.alert('删除成功', 1, function () {
                                //$("#btnApply").attr("disabled", false);
                                //$('#dlgmenu').dialog('close');
                                self.getParentMenus();
                                var path = '/Admin/Home/LoadMenus' + "?parentid=0";
                                $("#tbList").treegrid("options").url = path;
                                parent.$("#tbList").treegrid("load");

                                layer.close(ii);
                            });


                        }
                        else {
                            //$("#btnApply").attr("disabled", false);
                            layer.alert(json.msg, 3);

                        }
                        layer.close(k);
                    },
                    error: function () { alert("服务器没有返回数据，可能服务器忙，请重试"); layer.close(index); }
                });

                layer.close(index);
            });
        } else {
            layer.alert('请选中一行', 3);
        }
    };

    self.save = function () {
        var name =$.trim( self.form.name());
        if (name == "")
        {
            layer.alert('请添加菜单名');
            return false;
        }
        var index;
        $.ajax({
            type: 'POST',
            url: "/Admin/Home/SaveMenu",
            dataType:'json',
            data: { name: self.form.name(), menuid: self.form.id(), parentid: self.form.parentid() == undefined ? 0 : self.form.parentid(), orderid: self.form.orderid(), icon: self.form.icon(), path: self.form.path(), isvisible: self.form.isvisible() == false ? 0 : 1, isenabled: self.form.isenabled() == false ? 0 : 1, hasarticle: self.form.hasarticle() == false ? 0 : 1, sourcetype: self.form.sourcetype(), remark: self.form.remark() },
            beforeSend: function (XMLHttpRequest) {
                $("#btnApply").attr("disabled", true); index = index = layer.load(1, {
                    shade: [0.1, '#fff'] //0.1透明度的白色背景
                });
            },
            success: function (json) {
                if (json.code === 0) {
                    var ii = layer.alert('保存成功', 1, function () {
                        //$("#btnApply").attr("disabled", false);
                        //$('#dlgmenu').dialog('close');
                        self.getParentMenus();

                        var path = '/Admin/Home/LoadMenus' + "?parentid=0";
                        $("#tbList").treegrid("options").url = path;
                        parent.$("#tbList").treegrid("load");

                        layer.close(ii);
                        layer.close(layerIndex);
                    });

                }
                else {
                    $("#btnApply").attr("disabled", false);
                    layer.alert(json.msg, 3);


                }
                layer.close(index);
            },
            error: function () { alert("服务器没有返回数据，可能服务器忙，请重试+Save"); $("#btnApply").attr("disabled", false); }
        });


    };

    self.getParentMenus = function () {

        $.getJSON('/Admin/Home/GetParentMenus', function (json) {
            self.menuItems(json);
        });
    };

    self.clear = function () {
        self.form.name(''),
        self.form.parentid(''),
        self.form.orderid(''),
        self.form.icon(''),
        self.form.path(''),
        self.form.remark('')

    };

    var layerIndex;
    self.openLayer = function (title) {
        layerIndex = layer.open({
            type: 1,
            title: title,
            //closeBtn: 1,
            area: '500px',
            //skin: 'layui-layer-nobg', //没有背景色
            shadeClose: false,
            content: $('#dlgmenu')
        });
        $("#btnClose").click(function () {
            layer.close(layerIndex);
        });
    };

}
