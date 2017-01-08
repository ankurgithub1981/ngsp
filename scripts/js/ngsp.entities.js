/// <reference path="../../typings/globals/angular/index.d.ts" />
/// <reference path="../../typings/globals/jquery/index.d.ts" />
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var ngsp;
(function (ngsp) {
    var entities;
    (function (entities) {
        var web = (function (_super) {
            __extends(web, _super);
            function web(baseurl, http) {
                var _this = this;
                _super.call(this, baseurl, '/_api/web', http);
                this.lists = function () {
                    return new lists(_this.servicepoint, _this.http);
                };
            }
            return web;
        }(ngsp.interfaces.SPRESTEntity));
        entities.web = web;
        var lists = (function (_super) {
            __extends(lists, _super);
            function lists(baseurl, http) {
                var _this = this;
                _super.call(this, baseurl, '/lists', http);
                this.bytitle = function (title) {
                    return new list(_this.servicepoint, title, _this.http);
                };
            }
            return lists;
        }(ngsp.interfaces.SPRESTEntity));
        entities.lists = lists;
        var list = (function (_super) {
            __extends(list, _super);
            function list(baseurl, title, http) {
                var _this = this;
                _super.call(this, baseurl, "/getbytitle('" + title + "')", http);
                this.items = function () {
                    return new listitems(_this.servicepoint, _this.http);
                };
                this.fields = function () {
                    return new listfields(_this.servicepoint, _this.http);
                };
            }
            return list;
        }(ngsp.interfaces.SPRESTEntity));
        entities.list = list;
        var listitems = (function (_super) {
            __extends(listitems, _super);
            //private rungetQuery:(query:string,resultsarray:any[])=>ng.IHttpService; 
            function listitems(baseurl, http) {
                var _this = this;
                _super.call(this, baseurl, "/items", http);
                this.add = function (options) {
                    var body = { '__metadata': { 'type': 'SP.Data.' + options.listname + 'ListItem' } };
                    var item = options.item;
                    for (var key in item) {
                        if (item.hasOwnProperty(key)) {
                            body[key] = item[key];
                        }
                    }
                    var _headers = {};
                    _headers.headers = {};
                    _headers.headers["accept"] = "application/json;odata=verbose";
                    _headers.headers["content-type"] = "application/json;odata=verbose";
                    return _this.contextobject.get().then(function (ctx) {
                        _headers.headers["X-RequestDigest"] = ctx.data.d.GetContextWebInformation.FormDigestValue;
                        return _this.http.post(_this.servicepoint, body, _headers);
                    });
                };
                this.update = function (options) {
                    var body = { '__metadata': { 'type': 'SP.Data.' + options.listname + 'ListItem' } };
                    var item = options.item;
                    for (var key in item) {
                        if (item.hasOwnProperty(key)) {
                            body[key] = item[key];
                        }
                    }
                    var _headers = {};
                    _headers.headers = {};
                    _headers.headers["IF-MATCH"] = options.etag;
                    _headers.headers["X-HTTP-Method"] = "MERGE";
                    _headers.headers["accept"] = "application/json;odata=verbose";
                    _headers.headers["content-type"] = "application/json;odata=verbose";
                    return _this.contextobject.get().then(function (ctx) {
                        _headers.headers["X-RequestDigest"] = ctx.data.d.GetContextWebInformation.FormDigestValue;
                        return _this.http.post(_this.servicepoint + "(" + options.Id + ")", body, _headers);
                    });
                };
                this.delete = function (options) {
                    var _headers = {};
                    _headers.headers = {};
                    _headers.headers["IF-MATCH"] = '*';
                    _headers.headers["X-HTTP-Method"] = "DELETE";
                    return _this.contextobject.get().then(function (ctx) {
                        _headers.headers["X-RequestDigest"] = ctx.data.d.GetContextWebInformation.FormDigestValue;
                        return _this.http.post(_this.servicepoint + "(" + options.Id + ")", null, _headers);
                    });
                };
                this.getall = function (options) {
                    var resarray = [];
                    var query = _this.queryurl + _this.queryparams;
                    return _this.rungetQuery(query, resarray);
                };
                this.rungetQuery = function (query, resultsarray) {
                    var listcontext = _this;
                    return listcontext.http.get(query, listcontext.queryheaders).then(function (response) {
                        if (response.data.d.hasOwnProperty('__next')) {
                            resultsarray = resultsarray.concat(response.data.d.results);
                            return listcontext.rungetQuery(response.data.d.__next, resultsarray);
                        }
                        else {
                            return resultsarray.concat(response.data.d.results);
                        }
                    });
                };
                this.contextobject = new contextinfo(this.baseweburl, this.http);
            }
            return listitems;
        }(ngsp.interfaces.SPRESTEntity));
        entities.listitems = listitems;
        var listfields = (function (_super) {
            __extends(listfields, _super);
            function listfields(baseurl, http) {
                _super.call(this, baseurl, "/fields", http);
            }
            return listfields;
        }(ngsp.interfaces.SPRESTEntity));
        entities.listfields = listfields;
        var contextinfo = (function (_super) {
            __extends(contextinfo, _super);
            function contextinfo(baseurl, http) {
                var _this = this;
                _super.call(this, baseurl, "/_api/contextinfo", http);
                this.get = function (options) {
                    return _this.http.post(_this.servicepoint, null, _this.queryheaders);
                };
            }
            return contextinfo;
        }(ngsp.interfaces.SPRESTEntity));
        entities.contextinfo = contextinfo;
    })(entities = ngsp.entities || (ngsp.entities = {}));
})(ngsp || (ngsp = {}));
