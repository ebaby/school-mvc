define(['require', 'angular', 'directives/com-directives', 'checkhomework/checkhomework.service'], function (require, ng) {
    var module = ng.module('app.checkhomework');
    //获取作业信息
    module.controller('ResultCtrl', ['$scope', '$state', '$sce', 'checkHomeWorkSrv', 'toastr', 'ngDialog', '$rootScope', function ($scope, $state, $sce, checkHomeWorkSrv, toastr, ngDialog, $rootScope) {
        //$scope.title = '布置作业';
        var date = new Date();
        $scope.vm = {
            rnum: 0,
            bnum:0,
            cnum:0,
            tabindex: 0,
            currenthwindex: 0,
            type: $state.params.type,
            tchwlogid:$state.params.tchwlogid,
            sublogid:$state.params.sublogid,
            upid: $state.params.upid,
            currentimgpageindex:1,
            currentimgtotalcount: 0,
            commentid: 0,
            setdatetime: date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate() + ' ' + date.getHours() + ':' + date.getMinutes(),
            currentcomment: [],
            againreason:''
        }
        
        var rootHandle = $rootScope.$watchCollection('tchwinfo', function (newvalue, oldvalue) {
            if (newvalue) {
                $scope.vm.tchwinfo = $rootScope.tchwinfo;
                rootHandle();
            }

        })

        $scope.imgoptions = {
        }
        $scope.pigaiItem = [];
        
        $scope.selectQuestion = _selectQuestion;
        //$scope.correctHomeWork = _correctHomeWork;
        $scope.imgPrevPage = _imgPrevPage;
        $scope.imgNextPage = _imgNextPage;
        $scope.selectComment = _selectComment;
        $scope.checkNextStudent = _checkNextStudent;
        //$scope.reSubmitWorkDialog = _reSubmitWorkDialog;
        //$scope.reSubmitWork = _reSubmitWork;
        //$scope.commentDialog = _commentDialog;
        $scope.toHtml = _toHtml;
        $scope.getHomeWorkQuestionCommoncClassList = _getHomeWorkQuestionCommoncClassList;                
        //$scope.checkFinsh = _checkFinsh;             
        //$scope.selectCommont = _selectCommont;
        $scope.closeDialog = _closeDialog;
        $scope.addResultpy = _addResultpy;

        $scope.openRef = _openRef;
        $scope.teaThumb = _teaThumb;
        $scope.goAlstudent = _goAlstudent;
        $scope.goToSAnalyze = _goToSAnalyze;
        
        initialize();
        function initialize() {

            _gethomeworkresult();
            _getHomeWorkQuestionCommoncClassList();
        }
        
        function _closeDialog() {
            ngDialog.closeAll();
        }
        //跳转学情分析
        function _goToSAnalyze() {
            $state.go('app.analyze.period.detail', { tchwlogid: $scope.vm.tchwlogid });
        }
        function _openRef() {
            $scope.vm.reopen = !$scope.vm.reopen;
        }
        function drawShape() {
            $scope.imgoptions.cocyctx.drawImage($scope.imgoptions.img, 0, 0);

            var ctx = $scope.imgoptions.cocyctx;
            var p = {
                width: $scope.currentPigaiItem.answer.width,
                height: $scope.currentPigaiItem.answer.height,
                left: $scope.currentPigaiItem.answer.left,
                top: $scope.currentPigaiItem.answer.top,
                picsrcwidth: $scope.currentPigaiItem.answer.picsrcwidth,
                picsrcheight: $scope.currentPigaiItem.answer.picsrcheight
            }

            var width = parseInt(p.width);
            var height = parseInt(p.height);
            var x = p.picsrcwidth * p.left;
            var y = p.picsrcheight * p.top;
            //var ctx = canvas.getContext('2d');
            ctx.beginPath();
            ctx.moveTo(x, y);
            ctx.lineTo(x + width, y);
            ctx.lineTo(x + width, y + height);
            ctx.lineTo(x, y + height);
            ctx.closePath();
            ctx.lineWidth = 2;
            ctx.lineCap = "round";
            ctx.strokeStyle = 'rgba(6,148,234,0.8)';
            ctx.stroke();
          
            //绘制所有批改作业状态
            angular.forEach($scope.vm.sublogItems.pigailist, function (pg, index) {
                if (pg.answer.pid == $scope.currentPigaiItem.answer.pid) {
                    var p = pg.answer;
                    if (pg.child.length > 0) {
                        p = pg.child[0].answer;
                    }
                    var width = parseInt(p.width);
                    var height = parseInt(p.height);
                    var x = p.picsrcwidth * p.left;
                    var y = p.picsrcheight * p.top;
                    var ctx = document.getElementById('canvasimg').getContext('2d');
                    var startX = width / 2 + 30;
                    var startY = height / 2 - 10;
                    if (pg.pigai.answerstatus == 3) {
                        //错误
                        ctx.beginPath()
                        ctx.moveTo(x + startX, y + startY);
                        ctx.lineTo(x + startX - 30, y + startY + 30);
                        ctx.closePath();
                        ctx.lineWidth = 3;
                        ctx.strokeStyle = "red";
                        ctx.lineCap = "round";
                        ctx.stroke();
                        ctx.beginPath()
                        ctx.moveTo(x + startX - 30, y + startY);
                        ctx.lineTo(x + startX, y + startY + 30);
                        ctx.closePath();
                        ctx.lineWidth = 3;
                        ctx.strokeStyle = "red";
                        ctx.lineCap = "round";
                        ctx.stroke();
                    } else if (pg.pigai.answerstatus == 2) {
                        //半对
                        ctx.beginPath()
                        ctx.moveTo(x + startX, y + startY);
                        ctx.lineTo(x + startX - 30, y + startY + 20);
                        ctx.closePath();
                        ctx.lineWidth = 3;
                        ctx.strokeStyle = "red";
                        ctx.lineCap = "round";
                        ctx.stroke();
                        ctx.beginPath()
                        ctx.moveTo(x + startX - 40, y + startY + 5);
                        ctx.lineTo(x + startX - 30, y + startY + 20);
                        ctx.closePath();
                        ctx.lineWidth = 3;
                        ctx.strokeStyle = "red";
                        ctx.lineCap = "round";
                        ctx.stroke();
                        ctx.beginPath()
                        ctx.moveTo(x + startX - 20, y + startY + 2);
                        ctx.lineTo(x + startX - 15, y + startY + 20);
                        ctx.closePath();
                        ctx.lineWidth = 3;
                        ctx.strokeStyle = "red";
                        ctx.lineCap = "round";
                        ctx.stroke();
                    } else if (pg.pigai.answerstatus == 1) {
                        //正确
                        ctx.beginPath()
                        ctx.moveTo(x + startX, y + startY);
                        ctx.lineTo(x + startX - 30, y + startY + 20);
                        ctx.closePath();
                        ctx.lineWidth = 3;
                        ctx.strokeStyle = "red";
                        ctx.lineCap = "round";
                        ctx.stroke();
                        ctx.beginPath()
                        ctx.moveTo(x + startX - 40, y + startY + 5);
                        ctx.lineTo(x + startX - 30, y + startY + 20);
                        ctx.closePath();
                        ctx.lineWidth = 3;
                        ctx.strokeStyle = "red";
                        ctx.lineCap = "round";
                        ctx.stroke();
                    }

                }
            });
             
        }

        function drawImg(img) {

            var cocv = document.getElementById('canvasimg');
            cocyctx = cocv.getContext("2d");
            cocv.onclick = function (event) {
        
                var point = windowTocanvas(cocv, event.clientX, event.clientY)
                var x = parseInt(point.x);
                var y = parseInt(point.y);
                //document.getElementById("input_window").value=event.clientX+"--"+event.clientY;
                //document.getElementById("input_canvas").value=x+"--"+y;

                //alert('w:' + event.clientX + ',' + event.clientY+'\r\n' + 'c:' + x + ','+y)
                cimgOnceclick(point);
            }
        

            if (cocyctx) {
                $scope.imgoptions.cocyctx = cocyctx;
                $scope.imgoptions.img = img;
                cocyctx.drawImage(img, 0, 0);
                drawShape();
                //drawShape(childans, pigalist, pid);
            }
        }

        function windowTocanvas(canvas, x, y) {
            var bbox = canvas.getBoundingClientRect();
            return {
                x: x - bbox.left * (canvas.width / bbox.width),
                y: y - bbox.top * (canvas.height / bbox.height)
            };

        }


        function cimgOnceclick(point) {
            //if ($scope.vm.reimg) return;
            $scope.$apply(function () {
                // $scope.reRender = rerender;
                for (var i = 0, len = $scope.vm.sublogItems.pigailist.length; i < len; i++) {
                    var ap = $scope.vm.sublogItems.pigailist[i];
                    if (ap.answer.pid == $scope.currentPigaiItem.answer.pid) {
                        for (var j = 0, jlen = ap.bounds.length; j < jlen; j++) {
                            if (ap.bounds[j].pid == $scope.currentPigaiItem.answer.pid) {
                                if (point.x > ap.bounds[j].minx && point.x < ap.bounds[j].maxx && point.y > ap.bounds[j].miny && point.y < ap.bounds[j].maxy) {
                                    var quesinfo = $scope.vm.sublogItems.pigailist[i];
                                    //$scope.correct["selectcorrect"] = $scope.vm.sublogItems.pigailist[i];
                                    //$scope.imgzoomoption['quesinfo'] = quesinfo;
                                    var childans = [], pid = null;
                                    if (quesinfo.child && quesinfo.child.length > 0) {
                                        angular.forEach(quesinfo.child, function (ca, index) {
                                            if (!pid) {
                                                pid = ca.answer.pid;
                                                childans.push(ca.answer);
                                            } else if (pid == ca.answer.pid) {
                                                childans.push(ca.answer);
                                            }
                                        });
                                    } else {
                                        childans.push(quesinfo.answer);
                                    }
                                    //rerender($scope.correct["aninfo"].pigailist, childans, $scope.vm.imgpid);
                                    //alert(i)
                                    $scope.vm.currenthwindex = i;
                                    $scope.currentPigaiItem = $scope.vm.sublogItems.pigailist[i];
                                    loadImage(drawImg);
                                    return;
                                }
                            }
                        }
                    }
                }
            })
            

        }

        function setMinMaxPoint() {
            //var pigailist = $scope.correct["aninfo"].pigailist;
            var getBound = function (answer) {
                //var ratio = zoomfactor / $scope.vm.initscale;
                var minX = parseFloat(answer.picsrcwidth) * parseFloat(answer.left);
                var minY = parseFloat(answer.picsrcheight) * parseFloat(answer.top);
                var maxX = minX + parseFloat(answer.width);
                var maxY = minY + parseFloat(answer.height);
                //$scope.vm["zoomfactor"] = zoomfactor;
                if (parseFloat(answer.width) == 0 && parseFloat(answer.height) == 0) {
                    minX = 99999;
                    minY = 99999;
                    maxX = -99999;
                    maxY = -99999
                }
                return {
                    pid: answer.pid,
                    minx: minX,
                    miny: minY,
                    maxx: maxX,
                    maxy: maxY
                }
            }
            angular.forEach($scope.vm.sublogItems.pigailist, function (p, index) {
                p.bounds = [];

                if (parseFloat(p.answer.width) != 0 && parseFloat(p.answer.height) != 0) {
                    var mainpoint = getBound(p.answer);
                    p.bounds.push(mainpoint);
                }
                if (p.child.length > 0) {
                    angular.forEach(p.child, function (pc, index) {
                        var cbound = getBound(pc.answer);
                        p.bounds.push(cbound);
                        //if (cbound.minx < p.bound.minx) {
                        //    p.bound.minx = cbound.minx;
                        //}
                        //if (cbound.miny < p.bound.miny) {
                        //    p.bound.miny = cbound.miny;
                        //}
                        //if (cbound.maxx > p.bound.maxx) {
                        //    p.bound.maxx = cbound.maxx;
                        //}
                        //if (cbound.maxy > p.bound.maxy) {
                        //    p.bound.maxy = cbound.maxy;
                        //}
                    })

                }
            })
            //console.log($scope.correct["aninfo"]);
        }

        function loadImage( loadedCallback) {
            //创建一个Image对象，实现图片的预下载    
            img = new Image();
            //绑定onload事件
            img.onload = function () {
                //避免循环加载
                img.onload = null;
                //预加载成功后执行回调函数
                loadedCallback(img);
            }
            img.src = $scope.currentPigaiItem.answer.picsorce;// imgurl;
        }
        function getPingyu() {
            var params = {};
            checkHomeWorkSrv.getPingyu(params, '').then(function (result) {
                if (result.status === 200) {
                    $scope.vm.cidlist = result.data[0].cidlist;
                    angular.forEach($scope.vm.cidlist, function (vc, index) {
                        angular.forEach($scope.vm.currentcomment, function (vcm, index) {
                            if (vc.cid == vcm.cid) {
                                vc.checked = true;
                            }
                        })
                    })
                } else {
                    toastr.error(result.msg, '');
                }
            });
        }

        function _teaThumb() {
            if (!$scope.vm.message || $scope.vm.message == "") {
                toastr.info("点赞原因不能为空", '');
                return;
            }
            var params = {
                sublogid: $scope.vm.sublogid,//
                upid: $scope.vm.upid,
                message: $scope.vm.message
            }
            checkHomeWorkSrv.teaThumb(params, '').then(function (result) {
                if (result.status === 200) {
                    $scope.vm.sublogItems.thumbsupnum = 1;
                    toastr.success("点赞成功", '');
                } else {
                    toastr.error(result.msg, '');
                }
                //alert($scope.vm.sublogItems.mysorce);
            });
        }

        //获取作业
        function _gethomeworkresult() {
            var params = {
                sublogid: $scope.vm.sublogid
            };
            checkHomeWorkSrv.getHomeWorkResult(params, '').then(function (result) {
                if (result.status === 200) {
                    $scope.vm.sublogItems = result.data[0];

                    //测试使用
                    //$scope.vm.sublogItems.cidlist = [{ cid: 73, ctitle: "测试73" }, { cid: 74, ctitle: "测试74" }, { cid: 75, ctitle: "测试75" }];

                    $scope.vm.correctpagelist = result.data[0].correctpagelist;//[$scope.vm.currenthwindex];
                    $scope.vm.currentimgtotalcount = result.data[0].correctpagelist.length;

                    $scope.currentPigaiItem = $scope.vm.sublogItems.pigailist[$scope.vm.currenthwindex];
                    setMinMaxPoint();
                    angular.forEach($scope.vm.sublogItems.cidlist, function (py, index) {
                        $scope.vm.currentcomment.push(py);
                    })
                    _getResultNum();
                    getPingyu();
                    loadImage(drawImg);

                } else {
                    toastr.error(result.msg, '');
                }
                //alert($scope.vm.sublogItems.mysorce);
            });
        }

        function _getResultNum() {
            $scope.vm.rnum = 0;
            $scope.vm.bnum = 0;
            $scope.vm.cnum = 0;
            angular.forEach($scope.vm.sublogItems.pigailist, function (sp, index) {
                //rnum: 0,
                //bnum:0,
                //cnum:0,
                if (sp.pigai.answerstatus == 1) {
                    $scope.vm.rnum = $scope.vm.rnum + 1;
                } else if (sp.pigai.answerstatus == 2) {
                    $scope.vm.bnum = $scope.vm.bnum + 1;
                } else if (sp.pigai.answerstatus == 3) {
                    $scope.vm.cnum = $scope.vm.cnum + 1;
                }
            })

        }

        function _selectQuestion(item,index) {
            
            //$scope.vm.currenthwindex = index;
            //$scope.currentPigaiItem = item;
            //loadImage( drawImg);

            $state.go('app.checkhomework.alreadyhw.detail', { tchwlogid: $scope.vm.tchwlogid, sublogid: $scope.vm.sublogid, upid: $scope.vm.upid });

        }

        function _goAlstudent() {
            var routername = 'app.checkhomework.alreadyhw.student';
            if ($scope.vm.type == 1) {
                routername = 'app.checkhomework.unalreadyhw.unstudent';
            }
            $state.go(routername, { tchwlogid: $scope.vm.tchwlogid });
        }
        //判题
        //function _correctHomeWork(answerstatus,isbatch,params) {
        //    var score = 0;
        //    switch (answerstatus) {
        //        case 1:
        //            score = $scope.currentPigaiItem.ques.maxscore;
        //            break;
        //        case 2:
        //            score = ($scope.currentPigaiItem.ques.maxscore / 2).toFixed(0);
        //            break;
        //        case 3:
        //            score = 0;
        //            break;
        //        default: break;

        //    }
        //    var correcthomeworklist ;
        //    if(isbatch){
        //        correcthomeworklist=params;
        //    }else{
        //        correcthomeworklist=[
        //            {
        //                autoid: $scope.currentPigaiItem.pigai.autoid,
        //                qid: $scope.currentPigaiItem.ques.qid,
        //                answerstatus: answerstatus,
        //                score: score,
        //                cidlist: $scope.vm.currentcomment
        //            }
        //        ];
        //    }

        //    var params = {
        //        tchwlogid: $scope.vm.tchwlogid,
        //        sublogid: $scope.vm.sublogid,
        //        upid: $scope.vm.upid,
        //        correcthomeworklist:correcthomeworklist 
                

        //    };
        //    checkHomeWorkSrv.correctHomeWork(params, '').then(function (result) {
        //        if (result.status === 200) {

        //            $scope.currentPigaiItem.pigai.answerstatus = answerstatus;
        //            $scope.vm.sublogItems.pigailist[$scope.vm.currenthwindex].pigai.answerstatus = answerstatus;
        //            loadImage(drawImg);

        //            $scope.vm.sublogItems.pigaistatus = parseInt(result.data[0].pigaistatus);
        //            $scope.vm.currentcomment = {};

        //            if (parseInt(result.data[0].pigaistatus) == 2) {
        //                _getHomeWorkResult();
        //            }

        //        } else {
        //            toastr.error(result.msg, '');
        //        }
        //    });
        //}

        //获取更多评语
        function _getHomeWorkQuestionList() {
            var params = {
                
            };
            checkHomeWorkSrv.getHomeWorkQuestionList(params, '').then(function (result) {
                if (result.status === 200) {
                    $scope.vm.commentItems = result.data[0];//.cidlist;

                } else {
                    //toastr.error(result.msg, '');
                }
            });
        }

        //图片上一页
        function _imgPrevPage() {
            if ($scope.vm.currentimgpageindex == 1) {
                toastr.error('已经是第一页', '');
                return false;
            } else {
                
                var ii=0;
                ii= $scope.vm.currentimgpageindex - 2;
                var pid = $scope.vm.correctpagelist[ii].pid;
                angular.forEach($scope.vm.sublogItems.pigailist, function (pigai,index) {
                    if (pigai.answer.pid == pid) {
                        $scope.vm.currenthwindex = index;
                        $scope.currentPigaiItem = pigai;
                        loadImage(drawImg);
                    }

                });
                $scope.vm.currentimgpageindex--;
            }
        }
        //图片下一_imgNextPage页
        function _imgNextPage() {
            if ($scope.vm.currentimgpageindex == $scope.vm.currentimgtotalcount) {
                toastr.error('已经是最后一页', '');
                return false;
            } else {
                var iii=0;
                iii= $scope.vm.currentimgpageindex;
                var pid = $scope.vm.correctpagelist[iii].pid;
                angular.forEach($scope.vm.sublogItems.pigailist, function (pigai, index) {
                    if (pigai.answer.pid == pid) {
                        $scope.vm.currenthwindex = index;
                        $scope.currentPigaiItem = pigai;
                        loadImage(drawImg);
                    }

                });
                $scope.vm.currentimgpageindex++;

            }

        }

        //选择评论
        function _selectComment(comment) {
            //$scope.vm.commentid = comment.cid;
            //$scope.vm.currentcomment = {cid:comment.cid,ctitle:comment.ctitle}
            if ($scope.vm.currentcomment.length >= 3) {
                if (comment.checked) {
                    angular.forEach($scope.vm.currentcomment, function (obj, index) {
                        if (comment == obj) {
                            $scope.vm.currentcomment.splice(index, 1);
                            return;
                        }
                    });
                    comment.checked = !comment.checked;
                } else {
                    var nestedConfirmDialog = ngDialog.openConfirm({
                        template:
                            '<div style="padding:1em;">' +
                                '<p style="pidding:">最多只能选3个评价。</p>' +
                                '<div class="ngdialog-buttons">' +
                                    //'<button type="button" class="ngdialog-button ngdialog-button-secondary" ng-click="closeThisDialog()">取消' +
                                    '<button type="button" class="ngdialog-button ngdialog-button-primary" ng-click="closeThisDialog()">确定</button>' +
                                 '</div>' +
                                '</div>',
                        plain: true,
                        width: 400,
                        scope: $scope,
                        className: 'ngdialog-theme-default'
                    });
                }

            }
            else {
                if (comment.checked) {
                    angular.forEach($scope.vm.currentcomment, function (obj, index) {
                        if (comment == obj) {
                            $scope.vm.currentcomment.splice(index, 1);
                            return;
                        }
                    });
                } else {

                    $scope.vm.currentcomment.push(comment);
                }
                comment.checked = !comment.checked;
            }
            //console.log($scope.vm.currentcomment.length)
        }

        

        //批改下一位同学
        function _checkNextStudent() {

            $state.go('app.checkhomework.unalreadyhw.undetail', { tchwlogid: $scope.vm.tchwlogid, sublogid: 0, upid: 0 });
        }

        //学生重拍
        //function _reSubmitWorkDialog() {
        //    var nestedConfirmDialog = ngDialog.openConfirm({
        //        template:
        //                '<div style="padding:1em;">' +
        //                '<p>是否要让学生重拍</p>' +
        //                '<div><textarea ng-model="vm.againreason" style="width:100%;" placeholder="请填写重拍原因"></textarea></div>' +
        //                '<div class="ngdialog-buttons">' +
		//                    '<button type="button" class="ngdialog-button ngdialog-button-secondary" ng-click="closeThisDialog()">取消' +
        //                    '<button type="button" class="ngdialog-button ngdialog-button-primary" ng-click="reSubmitWork()">确定</button>' +
        //                '</div>' +
        //                '</div>',
        //        plain: true,
        //        width: 400,
        //        scope: $scope,
        //        className: 'ngdialog-theme-default',
        //    });
        //}

        //获取作业小结
        function _getHomeWorkResult() {
            var params = {
                sublogid: $scope.vm.sublogid
            };
            checkHomeWorkSrv.getHomeWorkResult(params, '').then(function (result) {
                if (result.status === 200) {
                    $scope.vm.resultItems = result.data[0];
                }

            });
        }

        function _addResultpy(c, type) {
            if (!type) {
                if (!c.checked) {
                    //if (!checkRemind(c)) {
                    //    return;
                    //}
                    if ($scope.vm.currentcomment.length >= 3) {
                        //toastr.error('最多只能选3个评价', '');
                        //toastr.info('最多只能选3个评价', '');
                        toastr.warning('最多只能选3个评语', '');
                        return;

                    }
                }
                c.checked ? type = 2 : type = 1;
            }
            
            var params = {
                tchwlogid: $scope.vm.tchwlogid,//188,//640,//
                sublogid: $scope.vm.sublogid,//
                upid: $scope.vm.upid,
                hwid: $scope.vm.sublogItems.hwid,
                ctitle: c.ctitle,
                cid: c.cid,
                type: type
            }
            checkHomeWorkSrv.subRemind(params, '').then(function (result) {
                if (result.status === 200) {
                    
                    
                    if (type == 1) {
                        $scope.vm.currentcomment.push(c);
                        toastr.success('提交评语成功', '');
                    } else {
                        angular.forEach($scope.vm.currentcomment, function (vc, index) {
                            if (c.cid == vc.cid) {
                                $scope.vm.currentcomment.splice(index, 1);
                            }
                        })
                        toastr.success('删除评语成功', '');
                    }
                    angular.forEach($scope.vm.cidlist, function (vc, index) {
                        vc.checked = false;
                        angular.forEach($scope.vm.currentcomment, function (vcm, index) {
                            if (vc.cid == vcm.cid) {
                                vc.checked = true;
                            }
                        })
                    })
                    
                }

            });
        }

        function checkRemind(c) {
            var b = true;
            angular.forEach($scope.vm.currentcomment, function (vc, index) {
                if (c.cid == vc.cid) {
                    b = false;
                }
            })
            return b;
        }

        //批改完成
        //function _checkFinsh() {

        //    angular.forEach($scope.vm.sublogItems.pigailist, function (obj,index) {
        //        var correcthomeworklist = [
        //            {
        //                autoid: obj.pigai.autoid,
        //                qid: obj.ques.qid,
        //                answerstatus: 1,
        //                score: obj.ques.maxscore,
        //                cidlist: []
        //            }
        //        ];
        //        _correctHomeWork(1, true, correcthomeworklist);
        //        $scope.vm.sublogItems.pigailist[index].pigai.answerstatus = 1;
        //    });
            
        //}

        //获取学生列表
        //function _getHomeWorkSublog() {
        //    var params = {
        //        tchwlogid: $scope.vm.tchwlogid

        //    };

        //    checkHomeWorkSrv.getHomeWorkSublog(params, '').then(function (result) {
        //        if (result.status === 200) {

        //            $scope.vm.commit = result.data[0].commitlist[0];

        //            $state.go('app.checkhomework.unalreadyhw.undetail', { tchwlogid: $scope.vm.tchwlogid, sublogid: $scope.vm.commit.sublogid, upid: $scope.vm.commit.upid });


        //        } else {
        //            toastr.error(result.msg, '');
        //        }
        //    });
        //}


        //function _reSubmitWork() {
        //    if ($scope.vm.againreason == '') {
        //        toastr.error('请添加重拍原因', '');
        //    } else {
        //        var params = {
        //            tchwlogid: $scope.vm.tchwlogid,
        //            sublogid: $scope.vm.sublogid,
        //            message: ''


        //        };
        //        checkHomeWorkSrv.reSubmitWork(params, '').then(function (result) {
        //            if (result.status === 200) {
        //                toastr.success('重拍成功', '');

        //                ngDialog.closeAll();
        //            } else {
        //                toastr.error(result.msg, '');
        //            }
        //        });
        //    }
        //}

        //function _commentDialog(classinfo) {
            
        //    ngDialog.open({
        //        template: 'js/app/checkhomework/unalreadyhw/commentdialog.html',
        //        className: 'ngdialog-theme-default',
        //        width: 800,
        //        height: 500,
        //        //plain: true,
        //        scope: $scope
        //    });

        //    _getHomeWorkQuestionCommonList(classinfo);
        //}

        function _toHtml(html) {
            return $sce.trustAsHtml(html);
        }
        
        //单题评语分类列表
        function _getHomeWorkQuestionCommoncClassList() {

            var params = {
                
            };
            checkHomeWorkSrv.getHomeWorkQuestionCommoncClassList(params, '').then(function (result) {
                if (result.status === 200) {
                    $scope.vm.cclassidlist = result.data[0].cclassidlist;
                }

            });

        }

        function _getHomeWorkQuestionCommonList(classinfo) {

            var params = {
                cclassid: classinfo.cclassid

            };
            checkHomeWorkSrv.getHomeWorkQuestionCommonList(params, '').then(function (result) {
                if (result.status === 200) {

                    $scope.vm.cidlist = result.data[0].cidlist;
                    angular.forEach($scope.vm.currentcomment, function (cur, inxexcur) {
                        angular.forEach($scope.vm.cidlist, function (cid, indexcid) {
                            if (cid.cid === cur.cid) {
                                cid.checked = true;
                            }

                        })
                    })
                }

            });

        }

        //function _deleteComment(comment) {
        //    angular.forEach($scope.vm.currentcomment, function (vc, index) {
        //        if (comment.cid === vc.cid) {
        //            $scope.vm.currentcomment.splice(index, 1);
        //        }
        //    })
        //    var params = {
        //        tchwlogid: $scope.vm.tchwlogid,//188,//640,//
        //        sublogid: $scope.vm.sublogid,//
        //        upid: $scope.vm.upid,
        //        hwid: $scope.vm.sublogItems.hwid,
        //        answerid: $scope.currentPigaiItem.autoid,
        //        ctitle: comment.ctitle,
        //        cid: comment.cid,
        //        type: 2
        //    }
        //    addSinglecomment(params);
        //}
        //function _selectCommont(comment, checked) {
        //    var type;
        //    if ($scope.vm.currentcomment.length >= 3 && checked) {
        //        //toastr.error('最多只能选3个评价', '');
        //        //toastr.info('最多只能选3个评价', '');
        //        toastr.warning('最多只能选3个评价', '');
        //        comment.checked = false;
        //        return;

        //    }
        //    else {
        //        if (checked) {
        //            //angular.forEach($scope.vm.currentcomment, function (obj, index) {


        //            //});
        //            $scope.vm.currentcomment.push(comment);
        //        } else {
        //            angular.forEach($scope.vm.currentcomment, function (vc, index) {
        //                if (comment.cid === vc.cid) {
        //                    $scope.vm.currentcomment.splice(index, 1);
        //                }
        //            })

        //        }
        //        comment.checked = checked;
        //        checked ? type = 1 : type = 2;
        //        var params = {
        //            tchwlogid: $scope.vm.tchwlogid,//188,//640,//
        //            sublogid: $scope.vm.sublogid,//
        //            upid: $scope.vm.upid,
        //            hwid: $scope.vm.sublogItems.hwid,
        //            answerid: $scope.currentPigaiItem.autoid,
        //            ctitle: comment.ctitle,
        //            cid: comment.cid,
        //            type: type
        //        }
        //        addSinglecomment(params);
        //    }

        //}

        //function addSinglecomment(params) {
        //    checkHomeWorkSrv.addSinglecomment(params, '').then(function (result) {
        //        if (result.status === 200) {
        //            if (params.type == 1) {
        //                toastr.success('提交评语成功', '');
        //            } else {
        //                toastr.success('删除评语成功', '');
        //            }

        //        } else {
        //            toastr.error(result.msg, '');
        //        }

        //    });
        //}

        


    }])
});