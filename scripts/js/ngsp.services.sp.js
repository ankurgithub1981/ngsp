/// <reference path="../../typings/globals/angular/index.d.ts" />
/// <reference path="../../typings/globals/jquery/index.d.ts" />
/// <reference path="../ts/ngsp.entities.ts" />
//import './ts/ngsp.entities'
var ngsp;
(function (ngsp) {
    var services;
    (function (services) {
        var sp;
        (function (sp) {
            var SP = (function () {
                function SP(http) {
                    var _this = this;
                    this.http = http;
                    this.web = function (baseurl) {
                        return new ngsp.entities.web(baseurl, _this.http);
                    };
                }
                SP.$inject = ['$http'];
                return SP;
            }());
            sp.SP = SP;
            angular.module('ngsp').service('sp', SP);
        })(sp = services.sp || (services.sp = {}));
    })(services = ngsp.services || (ngsp.services = {}));
})(ngsp || (ngsp = {}));
