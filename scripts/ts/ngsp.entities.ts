/// <reference path="../../typings/globals/angular/index.d.ts" />
/// <reference path="../../typings/globals/jquery/index.d.ts" />

namespace ngsp.entities
{   
  
  export class web extends ngsp.interfaces.SPRESTEntity
   {
     constructor(baseurl:string,http:ng.IHttpService)
     {
       super(baseurl,'/_api/web',http);
     }

     lists=()=>
     {
       return new lists(this.servicepoint,this.http);
     }

     folders=()=>
     {
        return new folders(this.servicepoint,this.http);
     }

   }

   export class lists extends ngsp.interfaces.SPRESTEntity
   {
     constructor(baseurl:string,http:ng.IHttpService)
     {
       super(baseurl,'/lists',http);
     }
      
     bytitle=(title:string)=>{
    	return new list(this.servicepoint,title,this.http);
     }

   }
   
    export class list extends ngsp.interfaces.SPRESTEntity 
    {
   	
	   	constructor(baseurl:string,title:string,http:ng.IHttpService) 
	   	{
	   		 super(baseurl,"/getbytitle('"+title+"')",http);
	   	}
    
	    items=()=>{
	       return new listitems(this.servicepoint,this.http); 
	    }

      fields=()=>{
        return new listfields(this.servicepoint,this.http);
      }

   }

   export class listitems extends ngsp.interfaces.SPRESTEntity 
   {   	
   	  contextobject:any;
      //private rungetQuery:(query:string,resultsarray:any[])=>ng.IHttpService; 
      
	   	constructor(baseurl:string,http:ng.IHttpService) 
	   	{
	   		 super(baseurl,"/items",http);
	   		 this.contextobject=new contextinfo(this.baseweburl,this.http);

	   	}

	   	add=(options:any)=>{
           var body={ '__metadata': { 'type': 'SP.Data.'+options.listname+'ListItem' }}; 
           var item=options.item;
           for(var key in item)
           {
             if(item.hasOwnProperty(key))
             {
               body[key]=item[key];
             }
           }
           let _headers:any={};
            _headers.headers={};    
            _headers.headers["accept"]= "application/json;odata=verbose";
            _headers.headers["content-type"]= "application/json;odata=verbose";
           
           return this.contextobject.get().then((ctx)=>
           {
              _headers.headers["X-RequestDigest"]=  ctx.data.d.GetContextWebInformation.FormDigestValue;
              return this.http.post<any>(this.servicepoint,body,_headers);
           });
	   	}

	   	update=(options:any)=>{
           var body={ '__metadata': { 'type': 'SP.Data.'+options.listname+'ListItem' }}; 
           var item=options.item;
           for(var key in item)
           {
             if(item.hasOwnProperty(key))
             {
               body[key]=item[key];
             }
           }
           let _headers:any={};
           _headers.headers={};    
           _headers.headers["IF-MATCH"]= options.etag;
           _headers.headers["X-HTTP-Method"]="MERGE";
           _headers.headers["accept"]= "application/json;odata=verbose";
           _headers.headers["content-type"]= "application/json;odata=verbose";           
           return this.contextobject.get().then((ctx)=>
           {
              _headers.headers["X-RequestDigest"]=  ctx.data.d.GetContextWebInformation.FormDigestValue;
              return this.http.post<any>(this.servicepoint+"("+options.Id+")",body,_headers);
           });
	   	}

 	   	delete=(options:any)=>{          
           let _headers:any={};
           _headers.headers={};    
           _headers.headers["IF-MATCH"]= '*';
           _headers.headers["X-HTTP-Method"]="DELETE";
           return this.contextobject.get().then((ctx)=>
           {
              _headers.headers["X-RequestDigest"]=  ctx.data.d.GetContextWebInformation.FormDigestValue;
              return this.http.post<any>(this.servicepoint+"("+options.Id+")",null,_headers);
           });
	   	}

      getall=(options:any)=>{
         var resarray=[];
         var query=this.queryurl+this.queryparams;  
         return this.rungetQuery(query,resarray);       
      }

      rungetQuery=(query:string,resultsarray:any[])=>
      { 
          var listcontext=this;
          return listcontext.http.get(query,listcontext.queryheaders).then(function(response){
           if(response.data.d.hasOwnProperty('__next'))
           {
             resultsarray=resultsarray.concat(response.data.d.results);
             return listcontext.rungetQuery(response.data.d.__next,resultsarray)  
           }
           else
           {
             return resultsarray.concat(response.data.d.results);
           }
         });  

      }
    
   }

    export class listfields extends ngsp.interfaces.SPRESTEntity 
    {
       constructor(baseurl:string,http:ng.IHttpService) 
       {
          super(baseurl,"/fields",http);
       }
   }

   export class folders extends ngsp.interfaces.SPRESTEntity  {
     
       constructor(baseurl:string,http:ng.IHttpService) 
       {
          super(baseurl,"/folders",http);
       }

       byrelativeurl=(serverrelativeurl:string)=>{
         return new folder(this.baseweburl+'/_api/web',serverrelativeurl,this.http);
       }

   }
   
   export class folder extends ngsp.interfaces.SPRESTEntity  {
     
       constructor(baseurl:string,serverrelurl:string,http:ng.IHttpService) 
       {
          super(baseurl,"/GetFolderByServerRelativeUrl('"+serverrelurl+"')",http);
       }

       files=()=>
       {
         return new files(this.servicepoint,this.http);
       }

   }
   
   export class files extends ngsp.interfaces.SPRESTEntity {
     
       contextobject:any;

       constructor(baseurl:string,http:ng.IHttpService) 
       {
          super(baseurl,"/files",http);
          this.contextobject=new contextinfo(this.baseweburl,this.http);
       }

       byrelativeurl=(serverrelativeurl:string)=>{
         return new file(this.baseweburl+'/_api/web',serverrelativeurl,this.http);
       }

       add=(options:any)=>
       {
          var filename=options.FileName;
          var overwrite=(options.overwrite)?'true':'false';
          var _query = this.servicepoint +"/add(overwrite="+overwrite+", url='"+filename+"')";
          return this.contextobject.get().then(function(ctx){
            var _headers={};
            _headers.processData=false;
            _headers.transformRequest=angular.identity;
            _headers.headers={};    
            _headers.headers["X-RequestDigest"]= ctx.data.d.GetContextWebInformation.FormDigestValue ;
            _headers.headers["accept"]= "application/json;odata=verbose";       
             var _url =_query;
             var body= options.contents;
             return this.http.post(_url,body,_headers);         
          });     
       }

   }

   export class file extends ngsp.interfaces.SPRESTEntity {
     
       constructor(baseurl:string,serverrelurl:string,http:ng.IHttpService) 
       {
          super(baseurl,"/GetFileByServerRelativeUrl('"+serverrelurl+"')",http);
       }

   }

   export class contextinfo extends ngsp.interfaces.SPRESTEntity {
   	
   	constructor(baseurl:string,http:ng.IHttpService) {
   		super(baseurl,"/_api/contextinfo",http);
    }

    get=(options:any)=>
    {
      return this.http.post(this.servicepoint,null,this.queryheaders);
    }
  
  } 

} 

