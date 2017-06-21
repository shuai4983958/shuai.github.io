window.GXC = window.GXC || {};
(function () {
	console.log("config");
	GXC = {
		UA : navigator.userAgent,
		host:(location.host.substring(0,8) == "https://") ? location.host : ("https://"+location.host),
		//scheme头
		schemeHead:{
			openview  : "QXCStudent://show/web?ref=",
			payview   : "QXCStudent://show/pay?callback=",
			loginview : "QXCStudent://show/login?callback="
		},
		apidev:"https://qa.goxueche.com/test/",
		
		apiqa:"https://qa.goxueche.com/quxueche/", //quxueche
		//预上线环境
		apidev2:"https://qa.goxueche.com/dev/",
		//测试环境(是不能发验证码的)
		apipro:"https://api.goxueche.com/",
 		//上线环境

		get isIphone(){
		 	 
		 	return	/iphone|ipod|ipad/gi.test(this.UA); 
		},
		//是否是
		get isAndroid(){
 		 	return /android/gi.test(this.UA);
		},
		get isInweixin(){
			return /MicroMessenger/gi.test(this.UA);
		},
		get isInalipay(){
			return /AlipayDefined|AliApp|AlipayClient/gi.test(this.UA);
		},
		//获取cookies
		get cookies(){

			var getcookies =  this.getCookieFunc("commonParam");
			var cookiestr = Base64.decode(getcookies);
 			 
 			var cookieArr = cookiestr.split(";");
 			 
			 var obj = new Object();
				for (var x in cookieArr){ 
					if(x == "contains" || x == "remove"){
						break;
					}
				var splits = cookieArr[x].split('=');
				obj[splits[0] ] = splits[1];
			}

			return obj;

		},
		
		//检测类型
		typeof:function(obj){
			var typeobj = {} ;
			"Boolean Number String Function Array Date RegExp Object Error".split(" ").forEach(function(value,i){
			    typeobj[ "[object " + value + "]" ] = value.toLowerCase();
			}) ;
		    if ( obj == null ){
		        return String( obj );
		    }
		    return typeof obj === "object" || typeof obj === "function" ?
		        typeobj[ typeobj.toString.call(obj) ] || "object" :
		        typeof obj;
		},
		isphone:function(phonenum){
			var isphones = /^1\d{10}$/gi.test(phonenum);
			return isphones;
		},	
		//获取cookies的函数
        getCookieFunc:function(c_name){

	　　　　if (document.cookie.length>0){　　 
	　　　　　　var c_start=document.cookie.indexOf(c_name + "=")　　 　
	　　　　　　if (c_start!=-1){ 
	　　　　　　　　c_start=c_start + c_name.length+1　　 
	　　　　　　　　var c_end=document.cookie.indexOf(";",c_start)　　  
	　　　　　　　　if (c_end==-1) c_end=document.cookie.length　　
	　　　　　　　　return unescape(document.cookie.substring(c_start,c_end))　　  
	　　　　　　} 
	　　　　}
	　　　　return ""

	　　},

		//离线存储
		store: function (namespace, data) {
			if (data||data=="") {
				return localStorage.setItem(this.trim(namespace), this.trim(JSON.stringify(data)));
			}

			var store = localStorage.getItem(this.trim(namespace));
			if(store==0){
				return 0;
			}
			return (store && JSON.parse(store)) || [];
		},
		//离线存储sessionStorage
		sessionStore: function (namespace, data) {
			if (data||data=="") {
				return sessionStorage.setItem(this.trim(namespace), JSON.stringify(data));
			}

			var sesStore = sessionStorage.getItem(this.trim(namespace));
			return (sesStore && JSON.parse(sesStore)) || [];
		},
		//根据namespace清除Storage type : 0=>localStorage 1=>sessionStorage
		clearStorage:function(namespace, type ){
			if(type==0){
				localStorage.removeItem(this.trim(namespace));
			}else if(type==1){
				sessionStorage.removeItem(this.trim(namespace));
			}
		},
		//去除空格
		trim:function(str){
			return str.replace(/(^\s*)|(\s*$)/g, "");
		},
		
		//检测对象是否为空
		isObjEmpty:function(obj){
			    for(var name in obj)
			    {
			        if(obj.hasOwnProperty(name))
			        {
			            return false;
			        }
			    }
			    return true;
		},

		//getQueryString
		getQueryString:function(name){
			var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
		 	var r = window.location.search.substr(1).match(reg);
		 	if (r != null) return unescape(r[2]);
		 	return null;

		},
		//px2rem
		px2rem:function(px){
			//return px*750/750/20 + "rem";
			return px*320/750/20 + "rem";
		},
		// px640rem:function(px){
		// 	return px*320/640/20 + "rem";
		// }
		//qxcConsole
		log:function(data){
		 	console.log("%c"+data+" ", "background-color:#ff0");
		},

		//jsAppend
		scriptAppend:function(jsurl,callback){
		 	 var head = document.getElementsByTagName('head')[0];
			 var js   = document.createElement("script");
			 js.type  = "text/javascript";
			 js.src   = jsurl;

			 head.appendChild(js); 
			 
			 if(callback){
			 	callback();
			 }

		 },
		 domAppend:function(obj){
			var app = document.createElement(obj.elem);
			app.id= obj.id || "";
			app.className = obj.class || "";
			document.body.appendChild(app);
		}


	}
})();
 
 window.scheme = window.scheme || {};

 (function(){
   scheme = {
			openweb_head:"QXCStudent://show/web",
			login_head:"QXCStudent://show/login",
			pay_head:"QXCStudent://show/pay",
			openview:function(url,callback){
			 	 

				var callback = callback ? callback : "",
				ishttp  =  (url.substring(0,8) === "https://") ? 1 : 0;
				if(GXC.isInApp){

					if(ishttp){
						window.location.href = this.openweb_head+"?ref="+Base64.encode(url+"&callback="+callback);
					}else{
 						window.location.href = this.openweb_head+"?ref="+Base64.encode(GXC.host+"/"+url+"&callback="+callback);
 					}
					 
				}else{

					 if(ishttp){
					 	window.location.href = url+"&callback="+callback;
					 }else{
 					 	window.location.href = GXC.host+"/"+url+"&callback="+callback;
					 }

				}
			}
		 }

 })();

//检查数组是否包含某项
Array.prototype.contains = function(needle) {
    for (i in this) {
        if (this[i] == needle) return true;
    }
    return false;
}

//删除数据中的某个元素
Array.prototype.remove = function(val) {
    var index = this.indexOf(val);
    if (index > -1) {
        this.splice(index, 1);
    }
};
window.logincallback = function(data){

   var datastr = Base64.decode(data);

   //alert(JSON.stringify(datastr));

  
  location.reload( true ); 

  /*
   window.location = self.location;
   window.location = window.location;
   window.location.href=window.location.href; 
   location.reload(true);
   document.location.reload(true);*/
 }

  
 