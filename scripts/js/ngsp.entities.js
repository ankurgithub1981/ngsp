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
                this.folders = function () {
                    return new folders(_this.servicepoint, _this.http);
                };
                this.currentuser = function () {
                    return new currentuser(_this.servicepoint, _this.http);
                };
                this.contextinfo = function () {
                    return new contextinfo(_this.servicepoint, _this.http);
                };
            }
            return web;
        }(ngsp.interfaces.SPRESTEntity));
        entities.web = web;
        var currentuser = (function (_super) {
            __extends(currentuser, _super);
            function currentuser(baseurl, http) {
                _super.call(this, baseurl, '/currentuser', http);
            }
            return currentuser;
        }(ngsp.interfaces.SPRESTEntity));
        entities.currentuser = currentuser;
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
                    return new listitems(_this.servicepoint, _this.http, _this);
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
            function listitems(baseurl, http, parentlist) {
                var _this = this;
                _super.call(this, baseurl, "/items", http);
                this.parentlist = parentlist;
                this.initmetadata = function () {
                    return _this.parentlist
                        .select(['ListItemEntityTypeFullName'])
                        .get({}).then(function (lst) {
                        _this.parentlistmetatdata = lst.data.d;
                        //console.log('init '+this.parentlistmetatdata.ListItemEntityTypeFullName);
                        return 1;
                    });
                };
                this.add = function (options) {
                    var p = $.Deferred();
                    if (!_this.parentlistmetatdata) {
                        p = _this.initmetadata();
                    }
                    else {
                        //p=
                        p.resolve(1);
                    }
                    return p.then(function (okresponse) {
                        console.log('adding ' + _this.parentlistmetatdata.ListItemEntityTypeFullName);
                        var body = { '__metadata': { 'type': _this.parentlistmetatdata.ListItemEntityTypeFullName } };
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
                    });
                };
                this.update = function (options) {
                    // var p=$.Deferred();
                    //  if(!this.parentlistmetatdata)
                    //  {
                    //     p=this.initmetadata();  
                    //  }
                    //  else
                    //  {
                    //     //p=
                    //     p.resolve(1);
                    //  }
                    //  return p.then((okresponse)=>{
                    //    var body={ '__metadata': { 'type': this.parentlistmetatdata.ListItemEntityTypeFullName }}; 
                    //    var item=options.item;
                    //    for(var key in item)
                    //    {
                    //      if(item.hasOwnProperty(key))
                    //      {
                    //        body[key]=item[key];
                    //      }
                    //    }
                    //    let _headers:any={};
                    //    _headers.headers={};    
                    //    _headers.headers["IF-MATCH"]= options.etag;
                    //    _headers.headers["X-HTTP-Method"]="MERGE";
                    //    _headers.headers["accept"]= "application/json;odata=verbose";
                    //    _headers.headers["content-type"]= "application/json;odata=verbose";           
                    //    return this.contextobject.get().then((ctx)=>
                    //    {
                    //       _headers.headers["X-RequestDigest"]=  ctx.data.d.GetContextWebInformation.FormDigestValue;
                    //       return this.http.post<any>(this.servicepoint+"("+options.Id+")",body,_headers);
                    //    });
                    //  })
                    return _this.byid(options.Id).update(options);
                };
                this.delete = function (options) {
                    // let _headers:any={};
                    // _headers.headers={};    
                    // _headers.headers["IF-MATCH"]= '*';
                    // _headers.headers["X-HTTP-Method"]="DELETE";
                    // return this.contextobject.get().then((ctx)=>
                    // {
                    //    _headers.headers["X-RequestDigest"]=  ctx.data.d.GetContextWebInformation.FormDigestValue;
                    //    return this.http.post<any>(this.servicepoint+"("+options.Id+")",null,_headers);
                    // });
                    //console.log('items delete');
                    return _this.byid(options.Id).delete({});
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
                this.byid = function (id) {
                    return new listitem(_this.servicepoint, id, _this.http);
                };
                this.contextobject = new contextinfo(this.baseweburl, this.http);
            }
            return listitems;
        }(ngsp.interfaces.SPRESTEntity));
        entities.listitems = listitems;
        var listitem = (function (_super) {
            __extends(listitem, _super);
            function listitem(baseurl, id, http) {
                var _this = this;
                _super.call(this, baseurl, "(" + id + ")", http);
                this.initmetadata = function () {
                    return _this
                        .select(['Id'])
                        .get({}).then(function (md) {
                        _this.entitymetadata = md.data.d;
                        return 1;
                    });
                };
                this.update = function (options) {
                    var p = $.Deferred();
                    if (!_this.entitymetadata) {
                        p = _this.initmetadata();
                    }
                    else {
                        //p=
                        p.resolve(1);
                    }
                    return p.then(function (okresponse) {
                        var body = { '__metadata': { 'type': _this.entitymetadata.__metadata.type } };
                        var item = options.item;
                        for (var key in item) {
                            if (item.hasOwnProperty(key)) {
                                body[key] = item[key];
                            }
                        }
                        var _headers = {};
                        _headers.headers = {};
                        _headers.headers["IF-MATCH"] = _this.entitymetadata.__metadata.etag;
                        _headers.headers["X-HTTP-Method"] = "MERGE";
                        _headers.headers["accept"] = "application/json;odata=verbose";
                        _headers.headers["content-type"] = "application/json;odata=verbose";
                        return _this.contextobject.get().then(function (ctx) {
                            _headers.headers["X-RequestDigest"] = ctx.data.d.GetContextWebInformation.FormDigestValue;
                            return _this.http.post(_this.servicepoint, body, _headers);
                        });
                    });
                };
                this.delete = function (options) {
                    var _headers = {};
                    _headers.headers = {};
                    _headers.headers["IF-MATCH"] = '*';
                    _headers.headers["X-HTTP-Method"] = "DELETE";
                    return _this.contextobject.get().then(function (ctx) {
                        _headers.headers["X-RequestDigest"] = ctx.data.d.GetContextWebInformation.FormDigestValue;
                        return _this.http.post(_this.servicepoint, null, _headers);
                    });
                };
                this.attachments = function () {
                    return new attachmentfiles(_this.servicepoint, _this.http);
                };
                this.contextobject = new contextinfo(this.baseweburl, this.http);
            }
            return listitem;
        }(ngsp.interfaces.SPRESTEntity));
        entities.listitem = listitem;
        var attachmentfiles = (function (_super) {
            __extends(attachmentfiles, _super);
            function attachmentfiles(baseurl, http) {
                var _this = this;
                _super.call(this, baseurl, "/attachmentfiles", http);
                this.add = function (options) {
                    var filename = options.FileName;
                    var _query = _this.servicepoint + "/add(FileName='" + filename + "')";
                    var _headers = {};
                    _headers.processData = false;
                    _headers.transformRequest = angular.identity;
                    _headers.headers = {};
                    _headers.headers["accept"] = "application/json;odata=verbose";
                    var _url = _query;
                    var body = options.contents;
                    //console.log("inside "+this.http);
                    var httpdummy = _this.http;
                    return _this.contextobject.get().then(function (ctx) {
                        _headers.headers["X-RequestDigest"] = ctx.data.d.GetContextWebInformation.FormDigestValue;
                        //console.log("outside:"+this.http);
                        return httpdummy.post(_url, body, _headers);
                    });
                };
                this.contextobject = new contextinfo(this.baseweburl, this.http);
            }
            return attachmentfiles;
        }(ngsp.interfaces.SPRESTEntity));
        entities.attachmentfiles = attachmentfiles;
        var listfields = (function (_super) {
            __extends(listfields, _super);
            function listfields(baseurl, http) {
                _super.call(this, baseurl, "/fields", http);
            }
            return listfields;
        }(ngsp.interfaces.SPRESTEntity));
        entities.listfields = listfields;
        var folders = (function (_super) {
            __extends(folders, _super);
            function folders(baseurl, http) {
                var _this = this;
                _super.call(this, baseurl, "/folders", http);
                this.byrelativeurl = function (serverrelativeurl) {
                    return new folder(_this.baseweburl + '/_api/web', serverrelativeurl, _this.http);
                };
            }
            return folders;
        }(ngsp.interfaces.SPRESTEntity));
        entities.folders = folders;
        var folder = (function (_super) {
            __extends(folder, _super);
            function folder(baseurl, serverrelurl, http) {
                var _this = this;
                _super.call(this, baseurl, "/GetFolderByServerRelativeUrl('" + serverrelurl + "')", http);
                this.files = function () {
                    return new files(_this.servicepoint, _this.http);
                };
            }
            return folder;
        }(ngsp.interfaces.SPRESTEntity));
        entities.folder = folder;
        var files = (function (_super) {
            __extends(files, _super);
            function files(baseurl, http) {
                var _this = this;
                _super.call(this, baseurl, "/files", http);
                this.byrelativeurl = function (serverrelativeurl) {
                    return new file(_this.baseweburl + '/_api/web', serverrelativeurl, _this.http);
                };
                this.add = function (options) {
                    var filename = options.FileName;
                    var overwrite = (options.overwrite) ? 'true' : 'false';
                    var _query = _this.servicepoint + "/add(overwrite=" + overwrite + ", url='" + filename + "')";
                    var _headers = {};
                    _headers.processData = false;
                    _headers.transformRequest = angular.identity;
                    _headers.headers = {};
                    _headers.headers["accept"] = "application/json;odata=verbose";
                    var _url = _query;
                    var body = options.contents;
                    //console.log("inside "+this.http);
                    var httpdummy = _this.http;
                    return _this.contextobject.get().then(function (ctx) {
                        _headers.headers["X-RequestDigest"] = ctx.data.d.GetContextWebInformation.FormDigestValue;
                        //console.log("outside:"+this.http);
                        return httpdummy.post(_url, body, _headers);
                    });
                };
                this.contextobject = new contextinfo(this.baseweburl, this.http);
            }
            return files;
        }(ngsp.interfaces.SPRESTEntity));
        entities.files = files;
        var file = (function (_super) {
            __extends(file, _super);
            function file(baseurl, serverrelurl, http) {
                var _this = this;
                _super.call(this, baseurl, "/GetFileByServerRelativeUrl('" + serverrelurl + "')", http);
                this.delete = function (options) {
                    //var filename=options.FileName;
                    //var overwrite=(options.overwrite)?'true':'false';
                    var _query = _this.servicepoint; // +"/add(overwrite="+overwrite+", url='"+filename+"')";
                    var _headers = {};
                    //_headers.processData=false;
                    _headers.transformRequest = angular.identity;
                    _headers.headers = {};
                    _headers.headers["accept"] = "application/json;odata=verbose";
                    _headers.headers["X-HTTP-Method"] = "DELETE";
                    _headers.headers["IF-MATCH"] = options.etag;
                    var _url = _query;
                    //var body= options.contents;
                    //console.log("inside "+this.http);
                    var httpdummy = _this.http;
                    return _this.contextobject.get().then(function (ctx) {
                        _headers.headers["X-RequestDigest"] = ctx.data.d.GetContextWebInformation.FormDigestValue;
                        //console.log("outside:"+this.http);
                        return httpdummy.post(_url, null, _headers);
                    });
                };
                this.contextobject = new contextinfo(this.baseweburl, this.http);
            }
            return file;
        }(ngsp.interfaces.SPRESTEntity));
        entities.file = file;
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
