/// <reference path="../../typings/globals/angular/index.d.ts" />
/// <reference path="../../typings/globals/jquery/index.d.ts" />
var ngsp;
(function (ngsp) {
    var interfaces;
    (function (interfaces) {
        var SPRESTEntity = (function () {
            function SPRESTEntity(baseurl, endpoint, http) {
                var _this = this;
                this.queryparams = "";
                this.queryheaders = { 'headers': { 'accept': 'application/json;odata=verbose' } };
                this._utils = new ngsp.utilities.utils();
                this.bytitle = function (title) {
                    return new SPRESTEntity(_this.servicepoint, "/getbytitle('" + title + "')", _this.http);
                };
                this.byguid = function (guid) {
                    return new SPRESTEntity(_this.servicepoint, "(guid'" + guid + "')", _this.http);
                };
                this.byid = function (id) {
                    return new SPRESTEntity(_this.servicepoint, "(" + id + ")", _this.http);
                };
                this.select = function (strarr) {
                    if (_this.queryparams == "")
                        _this.queryparams = "?" + _this._utils.getqueryparamstring(strarr, '$select=');
                    else
                        _this.queryparams = _this.queryparams + "&" + _this._utils.getqueryparamstring(strarr, '$select=');
                    return _this;
                };
                this.expand = function (strarr) {
                    if (_this.queryparams == "")
                        _this.queryparams = "?" + _this._utils.getqueryparamstring(strarr, '$expand=');
                    else
                        _this.queryparams = _this.queryparams + "&" + _this._utils.getqueryparamstring(strarr, '$expand=');
                    return _this;
                };
                this.filter = function (filterstring) {
                    if (typeof filterstring !== 'undefined' && filterstring != "") {
                        if (_this.queryparams == "")
                            _this.queryparams = "?" + "$filter=" + filterstring;
                        else
                            _this.queryparams = _this.queryparams + "&" + "$filter=" + filterstring;
                    }
                    return _this;
                };
                this.orderby = function (orderbystring) {
                    if (typeof orderbystring !== 'undefined' && orderbystring != "") {
                        if (_this.queryparams == "")
                            _this.queryparams = "?" + "$orderby=" + orderbystring;
                        else
                            _this.queryparams = _this.queryparams + "&" + "$orderby=" + orderbystring;
                    }
                    return _this;
                };
                this.top = function (topvalue) {
                    if (typeof topvalue !== 'undefined' && topvalue != "") {
                        if (_this.queryparams == "")
                            _this.queryparams = "?" + "$top=" + topvalue;
                        else
                            _this.queryparams = _this.queryparams + "&" + "$top=" + topvalue;
                    }
                    return _this;
                };
                this.skip = function (skipvalue) { return _this; };
                this.get = function (options) {
                    return _this.http.get(_this.queryurl + _this.queryparams, _this.queryheaders);
                };
                this.add = function (options) { };
                this.update = function (options) { };
                this.delete = function (options) { };
                this.getquery = function () {
                    return _this.queryurl + _this.queryparams;
                };
                this.baseurl = baseurl;
                this.endpoint = endpoint;
                this.servicepoint = this.baseurl + this.endpoint;
                this.queryurl = this.servicepoint;
                this.http = http;
                this.baseweburl = this._utils.getweburlfromapiurl(baseurl);
            }
            return SPRESTEntity;
        }());
        interfaces.SPRESTEntity = SPRESTEntity;
    })(interfaces = ngsp.interfaces || (ngsp.interfaces = {}));
})(ngsp || (ngsp = {}));
var ngsp;
(function (ngsp) {
    var utilities;
    (function (utilities) {
        var utils = (function () {
            function utils() {
                this.getqueryparamstring = function (strarr, prefix) {
                    if (typeof strarr === 'undefined')
                        return "";
                    if (strarr.length == 0)
                        return "";
                    var _querystring = "";
                    if (typeof prefix !== 'undefined')
                        _querystring = prefix;
                    for (var i = 0; i < strarr.length; i++) {
                        _querystring += strarr[i] + ',';
                    }
                    _querystring = _querystring.slice(0, -1);
                    return _querystring;
                };
            }
            utils.prototype.getweburlfromapiurl = function (apiurl) {
                if (typeof apiurl == 'undefined' || apiurl == '')
                    return '';
                return apiurl.split("/_api")[0];
            };
            return utils;
        }());
        utilities.utils = utils;
    })(utilities = ngsp.utilities || (ngsp.utilities = {}));
})(ngsp || (ngsp = {}));
