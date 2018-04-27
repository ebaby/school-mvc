/**
登陆框VM
**/
var employeeViewModel = function () {
    var self = this;

    self.menuItems = ko.observableArray([]);
    self.roleItems = ko.observableArray([]);


    self.Init = function () {

        self.loadgrid();
        self.getParentMenus();


    };

    self.form = {
        id: ko.observable(0),
        account: ko.observable(''),
        realname: ko.observable(''),
        mobile: ko.observable(''),
        email: ko.observable('')

    };


    self.search = function () {
        
        var param = { "account": $.trim($("#account").val()), "sname": $.trim($("#sname").val()) };
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
            url: '/Admin/Home/LoadEmployees',
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
            queryparams: { countryname: '', countrytype: '-1' }, //ko.observable(),
            columns: [[
                        { field: 'Account', title: '帐号', width: 200, align: 'center' },
                        { field: 'RealName', title: '员工姓名', width: 120, align: 'center' },
                        { field: 'Mobile', title: '电话', width: 100, align: 'center' },
                        { field: 'Email', title: '电子邮件', width: 100, align: 'center' },
                        { field: 'LoginCount', title: '登录次数', width: 100, align: 'center' },
                        { field: 'LastLoginTime', title: '最后登录时间', width: 100, align: 'center' },
                        { field: 'Status', title: '状态', width: 100, align: 'center', formatter: function (value, rowData, rowIndex) { return rowData.Status == 0 ? '注销' : '正常' } }
            //                        { field: '_operate', title: '操作', width: 140, align: 'center', formatter: function (value, rowData, rowIndex) {

            //                            //function里面的三个参数代表当前字段值，当前行数据对象，行号（行号从0开始）

            //                            return "<a style='cursor:pointer;' onclick='LinkContent(\"/Destination/AddAreaRegion\",{ type: \"query\", area_id: " + rowData.area_id + ",level:\"" + 2 + "\" } )'>查看</a>"; //&nbsp;&nbsp;<a  style='cursor:pointer;' onclick='LinkContent(\"/Destination/AddAreaRegion\",{ type: \"update\", area_id: " + rowData.area_id + ",level:\"" + 2 + "\" } )'>修改</a>
            //                        }
            //                        }
            ]],
            toolbar: [{
                iconCls: 'icon-add',
                text: '添加',
                handler: function () { self.addEmp(); }
            },
            {
                iconCls: 'icon-edit',
                text: '编辑',
                handler: function () {
                    self.editEmp();
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
                text: '设置角色',
                handler: function () {
                    self.openDialog();
                }
            }]


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

    self.addEmp = function () {
        //$('#dlgemp').dialog({ title: "添加" });
        //$('#dlgemp').dialog('open');
        self.openLayer('添加','500px', $('#dlgemp'), $('#btnEmpClose'));
        
        self.form.id(0);
        $("#admin_account").removeAttr("readonly");
        $("#dlgemp input[type='text']").val('');

    };

    self.editEmp = function () {
        var row = $('#tbList').datagrid('getSelected');
        if (row) {
            $.getJSON('/Admin/Home/GetEmployeeEntity', { id: row.ID }, function (json) {
                //$('#dlgemp').dialog({ title: "修改" });
                //$('#dlgemp').dialog('open');
                self.openLayer('修改', '500px', $('#dlgemp'), $('#btnEmpClose'));

                self.form.id(json.id);
                self.form.account(json.account);
                $("#admin_account").attr("readonly", "readonly");
                self.form.realname(json.realname);
                self.form.mobile(json.mobile);
                self.form.email(json.email);
            });
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

    self.save = function () {
        var name = $.trim(self.form.account());
        if (name == "")
        {
            layer.alert('请添加帐号');
            return false;
        }
        var index;
        $.ajax({
            type: 'POST',
            url: "/Admin/Home/SaveEmployee",
            data: { "account": self.form.account(), "employeeid": self.form.id(), "realname": self.form.realname(), "mobile": self.form.mobile(), "email": self.form.email() },
            beforeSend: function (XMLHttpRequest) {
                $("#btnApply").attr("disabled", true); index = index = layer.load(1, {
                    shade: [0.1, '#fff'] //0.1透明度的白色背景
                });
            },
            success: function (data) {
                if (data.indexOf("error:") != -1) {
                    $("#btnApply").attr("disabled", false);
                    layer.alert(data.replace("error:", ""), 3);

                }
                else {
                    var ii = layer.alert('保存成功', 1, function () {
                        $("#btnApply").attr("disabled", false);
                        $('#dlgemp').dialog('close');
                        parent.$("#tbList").datagrid("load");

                        layer.close(ii);
                    });


                }
                layer.close(index);
            },
            error: function () { alert("服务器没有返回数据，可能服务器忙，请重试+Save"); $("#btnApply").attr("disabled", false); }
        });


    };

    self.getParentMenus = function () {

        $.get('/Admin/Home/GetParentMenus', function (data) {
            self.menuItems(eval(data));
        });
    };


    self.openDialog = function () {
        var row = $('#tbList').datagrid('getSelected');
        if (!row) {
            layer.alert('请选中一行');
            return false;
        }
        $.getJSON('/Admin/Home/LoadRoles', { "userid": row.ID, "type": 0 }, function (json) {
            self.roleItems([]);
            $.each(json, function () {
                self.roleItems.push(this);
            });

            self.openLayer('添加', '300px', $('#dlgrole'), $('#btnRoleClose'));

        });

        //var pagei = layer.open({
        //    type: 1,
        //    title: '设置角色',
        //    area: ['300px', '400px'],
        //    border: [0], //去掉默认边框
        //    //shade: [0], //去掉遮罩
        //    shadeClose: true,
        //    maxmin: false,
        //    fix: false,
        //    //closeBtn: [0, false], //去掉默认关闭按钮
        //    //shift: 'left', //从左动画弹出
        //    page: {
        //        html: '<div style="width:296px; height:360px;margin-left:1px;  border:1px solid #ccc; background-color:#eee;"><div style="height:318px;text-align:center;"><div id="dvRole"></div></div><div style="height:40px;text-align:center;"><button id="btnApply" class="input_button" onclick="setRole(' + row.ID + ')">保存</button><button id="pagebtn" class="input_button" onclick="">关闭</button></div></div>'
        //    }
        //});
        ////自设关闭
        //$('#pagebtn').on('click', function () {
        //    layer.close(pagei);
        //});


        //var index;
        //$.ajax({
        //    type: 'get',
        //    url: "/Admin/LoadRoles",
        //    data: { "userid": row.ID, "type": 0 },
        //    dataType:'json',
        //    beforeSend: function (XMLHttpRequest) { index = layer.load(3); },
        //    success: function (data) {
        //        if (data.indexOf("error:") == -1) {debugger


        //            $("#dvRole").html("");
        //            var json = eval("(" + data + ")");
        //            var html = "";
        //            html += "<ul>";
        //            for (var i = 0; i < json.length; i++) {

        //                html += "<li><input type=\"checkbox\" " + (json[i].Checked == true ? "checked=\"checked\"" : "") + " id=\"" + json[i].ID + "\"  name=\"chkRole\"   >" + json[i].Name + "</li>";
        //            }
        //            html += "</ul>";

        //            $("#dvRole").html(html);

        //        }
        //        else {
        //            $("#dvRole").html("");

        //            //$.messager.alert('提示', data.replace("error:", ""));
        //            layer.alert(data.replace("error:", ""), 8);
        //        }
        //        layer.close(index);
        //    },
        //    error: function () { alert("服务器没有返回数据，可能服务器忙，请重试+Save"); layer.close(index); }
        //});

    };

    self.openLayer = function (title,area, container,btnClose) {
        var index = layer.open({
            type: 1,
            title: title,
            //closeBtn: 1,
            area: area,
            //skin: 'layui-layer-nobg', //没有背景色
            shadeClose: false,
            content: container//$('#dlgemp')
        });
        btnClose.click(function () {
            layer.close(index);
        });
    };



}
