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
    
   }

    export class listfields extends ngsp.interfaces.SPRESTEntity 
    {
       constructor(baseurl:string,http:ng.IHttpService) 
       {
          super(baseurl,"/fields",http);
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

