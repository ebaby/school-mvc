function IsMobile(mobile) {
	var reg = /^1[3578][0-9]{9}$/;
	if (reg.test(mobile)) {
		return true;
	}
	return false;
}
function IsEmail(email) {
	var reg = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
    if (reg.test(email)) {
        return true;
    } else
        return false;
}
function IsTel(tel) {
    //var reg = /^(\d{3}-\d{7,8}|\d{4}-\d{7,8})$/;
    var reg = /^(\d{6,12}|\d{12}-\d{3,4})$/;
	if (reg.test(tel)) 
		return true;
	else 
	    return false;
}

function FormatStringWithStar(source, keepCount) {
    if (source != null && source != '') {
        source = "******" + source.substring(source.length - keepCount, source.length);
    }
    return source;
}
function IsIntNumber(num) {
    return /^[0-9]{1,}$/.test(num);
}

String.prototype.IsIntNumber = function () {
	return /^[0-9]{1,}$/.test(this);
};
String.prototype.IsWrongCharacter = function () {
	return /[{}:;,\[\]!@#$%^&*()+=_<>\\\/\"\'\.\?\s]{1,}/.test(this);
};
String.prototype.IsMoney=function(){
 var regex = /^[0-9]*(\.[0-9]{1,2})?$/;
 return regex.test(this);
};
// 用正则表达式将前后空格用空字符串替代。
String.prototype.Trim = function () { return this.replace(/(^\s*)|(\s*$)/g, ""); };

function r() {
	return Math.floor(Math.random() * 9999999 + 1);
}
function checkRoleName(name) {
	if (name == '') {
		return "角色名称不能为空";
	}
	if (strlen(name) > 40) {
		return "角色名称不能大于40个字符(汉字算两个字符)";
	}
	if (name.IsWrongCharacter()) {
		return "角色名称不能出现 {}:;,[]!@#$%^&*()+=_\\\/\"\'\.<>? 的字符";
	}
	return true;
}
function myAlert(s) {
    art.dialog({
        icon: 'alert',
        lock: true,
        content: '<span class="log_w">' + s + '</span>',
        time:5,
        yesFn: function () {
            this.close();
            return false;
        }
    });
}
function myAlert2(s) {
    art.dialog({
        icon: 'alert',
        lock: true,
        content: '<span class="log_w">' + s + '</span>',
        yesFn: function () {
            this.close();
            return false;
        }
    });
}
function myAlertNoLock(s, showId) {
    art.dialog({
        id: showId,
        icon: 'alert',
        time: 5,
        content: '<span class="log_w">' + s + '</span>',
        yesFn: function () {
            this.close();
            return false;
        }
    });
}
function myError(s) {
    art.dialog({
        icon: 'error',
        lock: true,
        content: '<span class="log_w">' + s + '</span>',
        yesFn: function () {
            this.close();
            return false;
        }
    });
}
function mySucceed(s) {
    art.dialog({
        icon: 'succeed',
        lock: true,
        content: '<span class="log_w">' + s + '</span>',
        time: 5,
        yesFn: function () {
            this.close();
            return false;
        }
    });
}
function myPrompt(content, value, yes, close) {
	var name = 'my_';
	var input = name + 'promptInput';
	return $.dialog({
		id: name + 'Prompt',
		icon: 'prompt',
		fixed: true,
		window: 'top',
		content: '\
			<div>' + content + '</div>\
			<div>\
			  <input id="' + input + '" value="' + value + '" type="text" style="width:20em;padding:3px" />\
			</div>\
		',
		focus: input,
		yesFn: function (here) {
			return yes && yes.call(this, here.art('#' + input)[0].value, here);
		},
		noFn: close
	});
}
//myConfirm("是否删除?", function () { alert('确认') }, function () { alert('关闭') });
function myConfirm(title, confirm, cancel) {
	art.dialog({
		id: 'artPlusConfirm',
		icon: 'confirm',
		lock: true,
		fixed: true,
		window: 'top',
		content: title,
		yesFn: confirm,
		noFn: cancel
	});
}
function StatusAlert(s) {
	if (s == '404') {
		myError("<span style='font-size:12px'>没有找到访问地址！</span>");
	} else if (s == '500') {
		myError("<span style='font-size:12px'>应用程序错误！请稍候再试</span>");
	} else if (s == '401') {
	    s = "<span style='font-size:12px'>您没有权限访问！<br/>如果是长时间没有操作，请<a href='../user/Login.aspx' style='text-decoration: none;'><span class='text01'>重新登录</span></a>！</span>";
	    art.dialog({
            icon: 'error',
            lock: true,
            content: '<span class="log_w">' + s + '</span>',
            yesFn: function () {
                window.location.href = "../Login.aspx";
            }
        });
	}
}
function strlen(str) {
	var i, sum;
	sum = 0;
	for (i = 0; i < str.length; i++) {
		if ((str.charCodeAt(i) >= 0) && (str.charCodeAt(i) <= 255))
			sum = sum + 1;
		else
			sum = sum + 2;
	}
	return sum;
}
function IsURL(strUrl) {
	strUrl = strUrl.match(/^http:\/\/[A-Za-z0-9]+\.[A-Za-z0-9]+[\/=\?%\-&_~`@[\]':+!]*([^<>\"\"])*$/);
	if (strUrl == null)
		return false;
	else
		return true;
}
function compareDate(statr, end) {
// ReSharper disable InconsistentNaming
    var _statr = parseInt(statr.replace("-", "").replace("-", ""));
// ReSharper restore InconsistentNaming
// ReSharper disable InconsistentNaming
    var _end = parseInt(end.replace("-", "").replace("-", ""));
// ReSharper restore InconsistentNaming
    if (_statr > _end) {
        return '>';
    } else if (_statr == _end) {
        return '=';
    } else {
        return '<';
    }
}

/* 弹出提示信息，点击确定后跳转到指定的页面 */
// message：提示信息
// redirectUrl：点击确定后跳转到的页面url
function myAlertRedirect(message, redirectUrl) {
    art.dialog({
        icon: 'succeed',
        lock: true,
        content: '<span class="log_w">' + message + '</span>',
        time: 5,
        yesFn: function () {
            location.href = redirectUrl;
            return false;
        }
    });
}

/* 格式化数字的小数位数 */
//srcStr:数字
//nAfterDot:小数位数
//srcStr:数字
//nAfterDot:小数位数
function FormatNumber(srcStr, nAfterDot)        //nAfterDot小数位数
{
    var resultStr, nTen;
    srcStr = "" + srcStr + "";
    var strLen = srcStr.length;
    var dotPos = srcStr.indexOf(".", 0);
    var i;
    if (dotPos == -1) {
        resultStr = srcStr + ".";
        for (i = 0; i < nAfterDot; i++) {
            resultStr = resultStr + "0";
        }
        return resultStr;
    }
    else {
        if ((strLen - dotPos - 1) >= nAfterDot) {
// ReSharper disable UnusedLocals
            var nAfter = dotPos + nAfterDot + 1;
// ReSharper restore UnusedLocals
            nTen = 1;
            for (var j = 0; j < nAfterDot; j++) {
                nTen = nTen * 10;
            }
            resultStr = Math.round(parseFloat(srcStr) * nTen) / nTen;
            return resultStr;
        }
        else {
            resultStr = srcStr;
            for (i = 0; i < (nAfterDot - strLen + dotPos + 1); i++) {
                resultStr = resultStr + "0";
            }
            return resultStr;
        }
    }
}
function GetTime(time) {
    return time.replace("T", " ");
}
function GetDayTime(time) {
    return time.replace("T", "").substring(0, 10);
}
function GetWorkareaHtml(url) {
    $.ajax({
        type: "get",
        url: url,
        error: function (r, s, e) {
            StatusAlert(r.status);
        },
        success: function (html) {
            $('#workarea').html('');
            $('#workarea').html(html);
        }
    });
}

//浮点验证
function clearNoNum(obj) {
    obj.value = obj.value.replace(/[^\d.]/g, "");
    obj.value = obj.value.replace(/^\./g, "");
    obj.value = obj.value.replace(/\.{2,}/g, ".");
    obj.value = obj.value.replace(".", "$#$").replace(/\./g, "").replace("$#$", ".");
}


$.fn.serializeObject = function () {
    var o = {};
    var a = this.serializeArray();
    $.each(a, function () {
        if (o[this.name]) {
            if (!o[this.name].push) {
                o[this.name] = [o[this.name]];
            }
            o[this.name].push(this.value || '');
        } else {
            o[this.name] = this.value || '';
        }
    });
    return o;
};

function LinkContent(url, param) {
    //for (var x in param) { alert(x + "=" + param[x]); }
    $.get(url, param, function (doc) {//debugger
        $('#context').html(doc);
        $.parser.parse($('#context'));
    });
    //setMenu(this);
}

function setMenu(obj) {
    var arry = $("#my_menu").find("div").find("a");
    for (var i = 0; i < arry.length; i++) {
        $(arry[i]).removeClass();
    }
    $(obj).addClass("current");
}
function setMenuById(id) {
    var arry = $("#my_menu").find("div").find("a");
    for (var i = 0; i < arry.length; i++) {
        $(arry[i]).removeClass();
    }
    $("#" + id).addClass("current");
}
function ImageInit(container, id) {
    layer.photos({
        photos: '#' + container
    });
}


Date.prototype.format = function (format) {
    /* 
    * eg:format="yyyy-MM-dd hh:mm:ss"; 
    */
    var o = {
        "M+": this.getMonth() + 1, // month  
        "d+": this.getDate(), // day  
        "h+": this.getHours(), // hour  
        "m+": this.getMinutes(), // minute  
        "s+": this.getSeconds(), // second  
        "q+": Math.floor((this.getMonth() + 3) / 3), // quarter  
        "S": this.getMilliseconds()
        // millisecond  
    };

    if (/(y+)/.test(format)) {
        format = format.replace(RegExp.$1, (this.getFullYear() + "").substr(4
                        - RegExp.$1.length));
    }

    for (var k in o) {
        if (new RegExp("(" + k + ")").test(format)) {
            format = format.replace(RegExp.$1, RegExp.$1.length == 1
                            ? o[k]
                            : ("00" + o[k]).substr(("" + o[k]).length));
        }
    }
    return format;
};

function ChangeDateFormat(jsondate) {
    if (jsondate != null) {
        var temps = jsondate.split('T');
        var times = temps[1].split('.');
        return temps[0] + " " + times[0];
    }
    else
        return "";
}