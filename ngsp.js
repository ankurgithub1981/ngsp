
angular.module('ngsp',[])
.factory('sp', ['$http', function(http){
	var x={};
	var jsonheaders={'headers':{'accept':'application/json;odata=verbose'}};
	x.web=function(url)
	{   
		return new _web(url);
	}
	return x;

	//---------------------------------------------------------------
	
	function _web(url)
	{
		//var {};
		var url=url;
		var serviceurl=url+'/_api/web';
		this._geturl=serviceurl;

		var contextobject={};	
        var stringwithchar=function(char,str){ return (str!='')?char+str:'';}
		contextobject.currentuser=function()
		{
		   this._geturl=serviceurl+'/CurrentUser';
		   return this;
		}

		contextobject.lists=function()
		{
		   this._geturl=serviceurl+'/lists';
		   return this;
		}

		context._lists=new lists();

		contextobject.bytitle=function(title)
		{
		   this._geturl=this._geturl+"/getbytitle('"+title+"')";
		   return this;
		}

		contextobject.byguid=function(guid)
		{
		   this._geturl=this._geturl+"(guid'"+guid+"')";
		   return this;
		}

		contextobject.items=function(title)
		{
		   this._geturl=this._geturl+"/items";
		   return this;
		}
        
        contextobject.select=function(paramarray)
        {        	
          if(typeof paramarray!=='undefined' && paramarray.length>0)
          {
            var paramstring='$select=';
            paramarray.forEach(function(itm){
               paramstring+=itm+',';               
            });
           this.selectstring=paramstring.slice(0,-1);
          }          
          return this; 
        }

        contextobject.expand=function(paramarray)
        {        	
          if(typeof paramarray!=='undefined' && paramarray.length>0)
          {
            var paramstring='$expand=';
            paramarray.forEach(function(itm){
               paramstring+=itm+',';               
            });
           this.expandstring=paramstring.slice(0,-1);
          }          
          return this; 
        }

        contextobject.filter=function(paramstr)
        {        	
          if(typeof paramstr!=='undefined')
          {            
            this.filterstring='$filter='+paramstr;
          }          
          return this; 
        }

        contextobject.querystring=function() 
        {
        	if(this.selectstring!='')
	    	{
	    		return "?"+this.selectstring+stringwithchar('&',this.expandstring)+stringwithchar('&',this.filterstring);
	    	}
	    	else if(this.expandstring!='')
	    	{
	    		return "?"+this.expandstring+stringwithchar('&',this.filterstring);    		
	    	}
	    	else if(this.filterstring!='')
	    	{
	    		return "?"+this.filterstring;    		   
	    	}
	    	else return '';        	
        }

        contextobject.formdigest=function()
        {
           return http.get(this._geturl+this.querystring(),jsonheaders);
        }

        contextobject.get=function()
        {
           return http.get(this._geturl+this.querystring(),jsonheaders);
        }
     
        contextobject.add=function(addparams)
        {
           //return http.get(this._geturl+this.querystring(),jsonheaders);
           var ctx=new _contextinfo(url);
           ctx.get().then(function(data){
           	  console.log(data.d.GetContextWebInformation.FormDigestValue);

           });
        } 


		return contextobject;
	}

	//------------------------------------------------------------------
}])


<script src='lists.js' />
