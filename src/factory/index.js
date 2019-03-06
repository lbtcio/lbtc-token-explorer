import Vue from 'vue';
import http from './http';
import api from "./api.js";
import moment from "moment";
import calc from 'calculatorjs';
import bign from 'big-number';
import decimal from 'decimal.js';

Vue.prototype.$http = http;
Vue.prototype.$api = api.api;
Vue.prototype.calc = calc;
Vue.prototype.bign = bign;
Vue.prototype.decimal = decimal;

Vue.prototype.returnToSuperior = function () {
    window.history.back();
};

Vue.prototype.isEmptyObject = function (e) {
    for (let i in e) return false;
    return true;
};

Vue.prototype.isEmptyString = function (e) {
    let len = e.toString().trim().length;
    if (len == 0) {
        return false;
    } else {
        return true;
    }
}

Vue.prototype.isAddress = function (e) {
    if (e.replace(/(^s*)|(s*$)/g, "").length > 34 || e.replace(/(^s*)|(s*$)/g, "").length < 26) {
        return false;
    } else {
        return true;
    }
}

Vue.prototype.getFullNum = function (num) {
    if (isNaN(num)) {
      return num
    }
    var str = '' + num;
    if (!/e/i.test(str)) {
      return num;
    }
    return (num).toFixed(18).replace(/\.?0+$/, "");
}

Vue.prototype.isPc = function () {
    let userAgentInfo = window.navigator.userAgent;
    const Agents = [
        "Android",
        "iPhone",
        "SymbianOS",
        "Windows Phone",
        "iPad",
        "iPod"
    ];
    let flag = true;
    for (let v = 0, len = Agents.length; v < len; v++) {
        if (userAgentInfo.indexOf(Agents[v]) > 0) {
            flag = false;
            break;
        }
    }
    return flag;
};

Vue.prototype.Xreplace = function Xreplace(str, length, reversed) {
    var re = new RegExp("\\w{1," + length + "}", "g");
    var ma = str.match(re);
    if (reversed) ma.reverse();
    for (let i = 0; i < ma.length; i++) {
        ma[i] = parseInt('0x' + ma[i]);
    }
    return ma;
}

Vue.prototype.stringToHex = function (str) {
    var val = "";
    for (var i = 0; i < str.length; i++) {
        if (val == "")
            val = str.charCodeAt(i).toString(16);
        else
            val += str.charCodeAt(i).toString(16);
    }
    return val;
}

Vue.prototype.hexToString = function (hex) {
    var val = "";
    var arr = hex.split(",");
    for (var i = 0; i < arr.length; i++) {
        val += String.fromCharCode(parseInt(arr[i], 16));
    }
    return val;
}

Vue.prototype.randArr = function (a) {
    var len = a.length;
    for (var i = 0; i < len; i++) {
        var end = len - 1;
        var index = (Math.random() * (end + 1)) >> 0;
        var t = a[end];
        a[end] = a[index];
        a[index] = t;
    }
    return a;
};

Vue.prototype.chunkArry = function (array, size) {
    const length = array.length
    if (!length || !size || size < 1) {
        return []
    }
    let index = 0
    let resIndex = 0

    let result = new Array(Math.ceil(length / size))
    while (index < length) {
        result[resIndex++] = array.slice(index, (index += size))
    }
    return result
}

Vue.prototype.versionCompare = function (a, b) {
    var _a = toNum(a), _b = toNum(b);
    if (_a == _b) {
        return false;
    } else if (_a > _b) {
        return true;
    } else {
        return false;
    }
}

Vue.filter('formatHash', function (value) {
    let subStr1 = value.slice(0, 6);
    let subStr2 = value.slice(-6);
    let subStr = subStr1 + "..." + subStr2;
    return subStr;
})

Vue.filter("timeFormat", function (value) { return moment(value * 1000).format("YYYY-MM-DD HH:mm:ss") })

function toNum(v) {
    var a = v.toString();
    var c = a.split(/\./);// or： var c = a.split('.');
    var num_place = ["", "0", "00", "000", "0000"], r = num_place.reverse();
    for (var i = 0; i < c.length; i++) {
        var len = c[i].length;
        c[i] = r[len] + c[i];
    }
    var res = c.join('');
    return res;
}

