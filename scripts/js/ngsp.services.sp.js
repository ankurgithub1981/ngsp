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
                return SP;
            }());
            SP.$inject = ['$http'];
            sp.SP = SP;
            angular.module('ngsp').service('sp', SP);
        })(sp = services.sp || (services.sp = {}));
    })(services = ngsp.services || (ngsp.services = {}));
})(ngsp || (ngsp = {}));
