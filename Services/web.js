angular.module('ngsp').factory('npspcontext', ['$http', function(http){
     var s={};
     s.web=new web(strweburl,http)

  


}]);

var web=function(strweburl,http)
{
	this.jsonheaders={'headers':{'accept':'application/json;odata=verbose'}};
	this.url=strweburl;
	this.serviceurl=strweburl+"/_api/web";
	this.lists=function()
	{
       return http.get(this.serviceurl+"/lists",this.jsonheaders);
	}
}
