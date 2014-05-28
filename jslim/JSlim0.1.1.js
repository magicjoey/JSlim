//函数自引用
(function(){
//严格模式强制错误检查
'use strict';
//创建数组原型，对象原型和方法原型的快速引用
var ArrayProto = Array.prototype, ObjProto = Object.prototype, FuncProto = Function.prototype;

// 创建快速方法引用
var
    push             = ArrayProto.push,
    slice            = ArrayProto.slice,
    concat           = ArrayProto.concat,
    toString         = ObjProto.toString,
    hasOwnProperty   = ObjProto.hasOwnProperty;

//自引用
var  root = this,
//引用浏览器的宿主对象
    win = window,
    nav = navigator,
    doc = document,
    scr = screen;

//构造函数，选择器的入口
function $(selector,context){
    //构造函数，选择器的具体实现
    return new $.fn.init(selector,context);//todo为什么要这样做，不这样做有什么坏处？
}

    win.$ = $;


//定义JSlim的原型方法
$.fn=$.prototype={
    constructor:$,
    init:function(selector,context){
        var nodes = doc.querySelectorAll(selector);
        this.length = nodes.length;
        for(var i=0;i<this.length;i++){
            this[i]=nodes[i];
        }
        //1,处理空字符串，null、undefined类型
       /* if(!selector){
            return this;
        }
        //2,让JSlim对象与元素节点一样拥有ownerDocument属性
        var doc,nodes;
        if($.isArrayLike(context)){
            return $(context).find(selector);
        }
        //3,处理节点参数
        if(selector.nodeType){
            return $.Array.merge(this,[selector]);
        }
        this.selector = selector + "";
        //4,处理css3选择器
        if(typeof selector === "string"){
            doc = this.ownerDocument = !context ? document :getDoc(context,context[0]);
            var scope = context || doc;
            selector = this.trim(selector);
            if(selector.charAt(0)==="<" && selector.charAt(selector.length-1)===">" & selector.length>=3){
                //5,动态生成新节点
                nodes = $.parseHTML(selector,doc);
                nodes = nodes.childNodes;
                //6,getElementByTagName
            }else if(rtag.text(selector)){
                nodes = scope[TAGS](selector);
                //7,进入选择器模块
            }else{
                nodes = $.query(selector,scope);
            }
            return $.Array.merge(this,nodes);
            //8，处理数组、节点集合
        }else{
            this.ownerDocument = getDoc(selector[0]);
            $.Array.merge(this, $.isArrayLike(selector)?selector:[selector]);
            delete this.seletor;
        }*/

    },
    version:'0.1.1',
    length:0,
    //将本对象转化为纯数组对象
    valueOf:function(){
        return ArrayProto.slice.call(this);
    },
    size:function(){
        return this.length;
    },
    toString:function(){
        var i = this.length,
            ret = [],
            getType = $.type;
        while(i--){
            ret[i] = getType(this[i]);
        }
        return ret.join(", ");
    },
    //去除头部和尾部的空格
    trim:function(v){
        return v.replace(/^\s+|\s+$/g,'');
    },
    push:push,



    //可能要挪到extends中去的东东
    ajax:function(){

    },
    html:function(){
        return this[0].innerHTML;
    },
    val:function(){

    },
    css:function(){

    },
    attr:function(){

    }



}

//共用同一个原型
$.fn.init.prototype = $.fn;

})();