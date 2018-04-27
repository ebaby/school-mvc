
//function getToken() {
//    debugger
//    $.ajax({
//        type: 'POST',
//        url: window.globalConfig.oapi + "api/oauth/token_get",
//        dataType: "json",
//        data: { clientid: window.globalConfig.clientid, signature: encrypt(), LoginPass: "", appver: "", phonemodel: "", machinecode: "", imsi: "", systemver: "", browser: "" },
//        success: function (json) {
//            if (json.status === 200) {

//            } else {
//                //alert(json.msg);
//                //self.message(json.msg);
//                toastr.error(json.msg, '')
//            }

//        },
//        error: function (xhr, type) {

//        }
//    })

//}

function encrypt() {
    
    var clientid = CryptoJS.enc.Utf8.parse(window.globalConfig.clientid);
    var secret = CryptoJS.enc.Utf8.parse(window.globalConfig.secret);
    var iv = CryptoJS.enc.Utf8.parse(window.globalConfig.iv);

    var secTmp;
    if (window.globalConfig.secret.length >32) {
        secTmp = window.globalConfig.secret.substring(0, 32)
    } else if (window.globalConfig.secret.length < 32) {
        secTmp = window.globalConfig.secret.PadRight(32);
    }

    var encrypt = CryptoJS.AES.encrypt(clientid, CryptoJS.enc.Utf8.parse(secTmp), { iv: iv }).toString(); //, mode: CryptoJS.mode.CBC, padding: CryptoJS.pad.Pkcs7

    var sha1 = CryptoJS.SHA1(encrypt).toString();


    return sha1;
}

function decrypt() {
    debugger
    var clientid = CryptoJS.enc.Utf8.parse(window.globalConfig.clientid);
    var secret = CryptoJS.enc.Utf8.parse(window.globalConfig.secret);
    var iv = CryptoJS.enc.Utf8.parse(window.globalConfig.iv);

    var secTmp;
    if (window.globalConfig.secret.length >32) {
        secTmp = window.globalConfig.secret.substring(0, 32)
    } else if (window.globalConfig.secret.length < 32) {
        secTmp = window.globalConfig.secret.PadRight(32);
    }

    var encrypt = CryptoJS.AES.decrypt(clientid, CryptoJS.enc.Utf8.parse(secTmp), { iv: iv }).toString(); //, mode: CryptoJS.mode.CBC, padding: CryptoJS.pad.Pkcs7

    var sha1 = CryptoJS.SHA1(encrypt).toString();


    return sha1;
}


var lowerCache = {};
function convertKeysToCamelCase(obj) {
    if (typeof (obj) === "string" || typeof (obj) === "number")
        return obj;

    var l = obj.length;
    if (l) {
        l |= 0;
        var result = [];
        result.length = l;
        for (var i = 0; i < l; i++) {
            var newVal = obj[i];
            result[i] = typeof (newVal) === "string" ? newVal : convertKeysToCamelCase(newVal);
        }
        return result;
    } else {
        var ret = {};
        for (var key in obj) {

            var keyStr = typeof (key) === "string" ? key : String(key);
            var newKey = lowerCache[keyStr];
            if (newKey === undefined) {
                newKey = keyStr.toLowerCase();
                lowerCache[keyStr] = newKey;
            }

            var newVal = obj[key];
            ret[newKey] = typeof (newVal) === "string" ? newVal : convertKeysToCamelCase(newVal);
        }
        return ret;
    }
}

String.prototype.PadRight = function (totalWidth, paddingChar) {
    if (paddingChar != null) {
        return this.PadHelper(totalWidth, paddingChar, true);
    } else {
        return this.PadHelper(totalWidth, ' ', true);
    }

}

String.prototype.PadHelper = function (totalWidth, paddingChar, isRightPadded) {

    if (this.length < totalWidth) {
        var paddingString = new String();
        for (i = 1; i <= (totalWidth - this.length) ; i++) {
            paddingString += paddingChar;
        }

        if (isRightPadded) {
            return (this + paddingString);
        } else {
            return (paddingString + this);
        }
    } else {
        return this;
    }
}

