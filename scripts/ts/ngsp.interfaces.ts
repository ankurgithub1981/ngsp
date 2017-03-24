/// <reference path="../../typings/globals/angular/index.d.ts" />
/// <reference path="../../typings/globals/jquery/index.d.ts" />

namespace ngsp.interfaces
{
	export interface iSPRESTEntity
	{
	  baseweburl:string;	
	  baseurl:string;
	  servicepoint:string;
	  endpoint:string;	  
	  http:ng.IHttpService;
	  bytitle(title:string):any;
	  byguid(guid:string):any;	  
	  byid(id:string):any;
	  select(strarr:[string]):any;
	  expand(strarr:[string]):any;
	  filter(filterstring:string):any;
	  orderby(orderbystring:string):any;
	  top(topvalue:string):any;
	  skip(skipvalue:string):any;
	  get(options:any):any;	
	  add(options:any):any;	
	  update(options:any):any;	
	  delete(options:any):any;
      getquery():string;
	}

	export class SPRESTEntity implements iSPRESTEntity {		
	    baseweburl:string;	
		   baseurl:string;
	    servicepoint:string;
	    endpoint:string;
	    queryurl:string;
	    http:ng.IHttpService;
	    queryparams:string="";
	    queryheaders:any={'headers':{'accept':'application/json;odata=verbose'}};
	    private _utils=new ngsp.utilities.utils();
		constructor(baseurl:string,endpoint:string,http:ng.IHttpService) 
		{
           this.baseurl=baseurl;
           this.endpoint=endpoint;
           this.servicepoint=this.baseurl+this.endpoint;
           this.queryurl=this.servicepoint;
           this.http=http;
           this.baseweburl=this._utils.getweburlfromapiurl(baseurl);
		}

		bytitle=(title:string)=>{
			return new SPRESTEntity(this.servicepoint,"/getbytitle('"+title+"')",this.http);
		}

		byguid=(guid:string)=>{			
			return new SPRESTEntity(this.servicepoint,"(guid'"+guid+"')",this.http);
		}

		byid=(id:string)=>{
			return new SPRESTEntity(this.servicepoint,"("+id+")",this.http);			
		}

        select=(strarr:[string])=>{
			if(this.queryparams=="")this.queryparams="?"+this._utils.getqueryparamstring(strarr,'$select=');
			else this.queryparams=this.queryparams+"&"+this._utils.getqueryparamstring(strarr,'$select=');
			return this;            
        }
	    
	    expand=(strarr:[string])=>{
			if(this.queryparams=="")this.queryparams="?"+this._utils.getqueryparamstring(strarr,'$expand=');
			else this.queryparams=this.queryparams+"&"+this._utils.getqueryparamstring(strarr,'$expand=');
			return this;            
        }

        filter=(filterstring:string)=>{
        	if(typeof filterstring!=='undefined' && filterstring!="")
        	{
			 if(this.queryparams=="")this.queryparams="?"+"$filter="+filterstring;
			 else this.queryparams=this.queryparams+"&"+"$filter="+filterstring;
			}
			return this;            
        }

	    orderby=(orderbystring:string)=>{
        	if(typeof orderbystring!=='undefined' && orderbystring!="")
        	{
			 if(this.queryparams=="")this.queryparams="?"+"$orderby="+orderbystring;
			 else this.queryparams=this.queryparams+"&"+"$orderby="+orderbystring;
			}
			return this;            
        }

	    top=(topvalue:string)=>{
        	if(typeof topvalue!=='undefined' && topvalue!="")
        	{
			 if(this.queryparams=="")this.queryparams="?"+"$top="+topvalue;
			 else this.queryparams=this.queryparams+"&"+"$top="+topvalue;
			}
			return this;            
        }

	    skip=(skipvalue:string)=>{return this;};
	    get=(options:any)=>{
           return this.http.get(this.queryurl+this.queryparams,this.queryheaders);
	    }

	    add=(options:any)=>{}
	    update=(options:any)=>{};	
	    delete=(options:any)=>{};
	    getquery=()=>{
	    	return this.queryurl+this.queryparams;
	    }

	    
	}



}

namespace ngsp.utilities
{
	export class utils{
	  constructor() {}

	  getqueryparamstring=(strarr:[string],prefix:string)=>
	  {
        if(typeof strarr==='undefined') return "";
        if(strarr.length==0) return ""; 
        
        let _querystring:string="";
        if(typeof prefix!=='undefined') _querystring=prefix;
        for(var i=0;i<strarr.length;i++)
        {
          _querystring+=strarr[i]+',';
        } 
        _querystring=_querystring.slice(0,-1);
        return _querystring;
	  }

      getweburlfromapiurl(apiurl:string)
      {
         if(typeof apiurl=='undefined' || apiurl=='') return '';
         return apiurl.split("/_api")[0];
      }

	}
}