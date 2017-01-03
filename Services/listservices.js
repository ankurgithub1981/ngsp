
angular.module('ngsp').factory('listservice', ['$http', function(ping){

var s={};
var jsonheaders={'headers':{'accept':'application/json;odata=verbose'}};

//-------------------------------------------------------------------------------------------

s.getitems=function(cfg)
{
   var _url=cfg.url+apis.lists+"/getbytitle('"+cfg.listtitle+"')/items"+cfg.Select();	
   //return ping.get(_url,jsonheaders);
   var resarray=[];
   return  rungetQuery(_url,resarray);
}

function rungetQuery(query,resultsarray)
{
    return ping.get(query,jsonheaders).then(function(response){
         if(response.data.d.hasOwnProperty('__next'))
         {
           resultsarray=resultsarray.concat(response.data.d.results);
           return rungetQuery(response.data.d.__next,resultsarray)  
         }
         else
         {
           return resultsarray.concat(response.data.d.results);
         }
       });  

}

s.createitem=function(cfg,values)
{
  return s.FormDigest(cfg.url).then(function(response){
     var _headers={};
    _headers.headers={};    
    _headers.headers["X-RequestDigest"]=  response.data.d.GetContextWebInformation.FormDigestValue;
    _headers.headers["accept"]= "application/json;odata=verbose";
    _headers.headers["content-type"]= "application/json;odata=verbose";
              
     var _url =cfg.url+apis.lists+"/getbytitle('"+cfg.listtitle+"')/Items";
     var body= { '__metadata': { 'type': 'SP.Data.'+cfg.listname+'ListItem' }};

     for(k in values)
     {
        if(values.hasOwnProperty(k))
        {
        	body[k]=values[k];
        }
     }

     return ping.post(_url,body,_headers);

  });
}

s.updateitem=function(itm,values)
{
  return s.FormDigest(cfg.url).then(function(response){
     var _headers={};
    _headers.headers={};    
    _headers.headers["X-RequestDigest"]=  response.data.d.GetContextWebInformation.FormDigestValue;
	_headers.headers["IF-MATCH"]= itm.__metadata.etag;
	_headers.headers["X-HTTP-Method"]="MERGE";
    _headers.headers["accept"]= "application/json;odata=verbose";
    _headers.headers["content-type"]= "application/json;odata=verbose";
              
    var _url =itm.__metadata.uri;
	var body= { '__metadata': { 'type': itm.__metadata.type }};
    
    for(k in values)
	{
	 if(values.hasOwnProperty(k))
	 {
	  	body[k]=values[k];
	 }
	}

    return ping.post(_url,body,_headers);

  });
}

s.deleteitem=function(cfg)
{
	
}

s.FormDigest=function(url)
{
   return ping.post(url+'/_api/contextinfo',null,jsonheaders);
}

//-------------------------------------------------------------------------------------------
return s;

}]);


var listserviceconfig=function(url,listtitle,listname,selectitems,expanditems,filters)
{
    this.url=url;
    this.listtitle=listtitle;
    this.listname=listname;
    this.selectitems=selectitems;
    this.expanditems=expanditems;
    this.filters=filters;
    this.Select=function()
    {
    	var selectstring='';
    	if(this.selectitems && this.selectitems.length>0)
    	{ 
    		selectstring="$select=";
    		selectitems.forEach(function(itm){
               selectstring+=itm+",";
    		});
    		selectstring=selectstring.slice(0,-1);
    	}

    	var expandstring='';
    	if(this.expanditems && this.expanditems.length>0)
    	{
    		expandstring="$expand=";
    		expanditems.forEach(function(itm){
    			expandstring+=itm+',';
    		});
    		expandstring=expandstring.slice(0,-1);
    	}

    	var filterstring='';
    	if(this.filters && this.filters!='')
    	{
    		filterstring="$filter="+this.filters;
    	}
        
         
    	if(selectstring!='')
    	{
    		return "?"+selectstring+stringwithchar('&',expandstring)+stringwithchar('&',filterstring);
    	}
    	else if(expandstring!='')
    	{
    		return "?"+expandstring+stringwithchar('&',filterstring);    		
    	}
    	else if(filterstring!='')
    	{
    		return "?"+filterstring;    		   
    	}
    	else return '';

    }
    
    function stringwithchar(char,str){ return (str!='')?char+str:'';}

}

var apis={
	lists:'/_api/web/lists'
};




