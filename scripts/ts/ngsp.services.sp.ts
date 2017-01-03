/// <reference path="../../typings/globals/angular/index.d.ts" />
/// <reference path="../../typings/globals/jquery/index.d.ts" />
/// <reference path="../ts/ngsp.entities.ts" />

//import './ts/ngsp.entities'

namespace ngsp.services.sp
{
	export interface iSP
	{
      
	}

	export class SP implements iSP
	{
		static $inject=['$http'];
		constructor(private http:ng.IHttpService){}
        web=(baseurl:string)=>{
        	return new ngsp.entities.web(baseurl,this.http);
        }
	}
	
	angular.module('ngsp').service('sp',SP);

}