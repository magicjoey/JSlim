/**
 * 由 out_lier 创建于2014-3-29.
 * 电子邮箱：out_lier@126.com
 * JSlim支持绝大部分jquery的函数，用法也一致。借鉴了很多jquery的东西，对jquery进行了瘦身和简化。可以理解JSlim为Slim Jquery。
 * 注：JSlim与jQuery冲突。
 * 本版本需要完成的内容包括：
 * 一、选择器
 * 1）基本选择器
 * 2）层级选择器
 * 3）过滤选择器
 * 4）表单选择器
 * 二、封装不同浏览器的函数特性，提供常用函数
 * 三、完成ajax的常用操作
 * 四、对dom的操作，基本函数
 *五、思考html5版本的JSlim该怎么做
 * 预计完成时间2014/05/31
 * 本版本仅保证正确，不做异常处理
 */


/**
 *此版本的缺陷：我是ben
 *  1)全面不支持ie7及以前浏览器（选择器的实现依赖于querySelector和querySelectorAll）
 *
 */
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

//判断一个选择符是不是id格式
    var reid=/^#[a-zA-z0-9_]+$/;

//构造函数，选择器的入口
function $(selector,context){
    //构造函数，选择器的具体实现
    return new $.fn.init(selector,context);//todo为什么要这样做，不这样做有什么坏处？
}
    win.$ = $;
//定义JSlim的原型方法
    //需要再进行一层封装，js中没有private之类的关键字，为了不想把某些函数暴露给用户，所以
$.fn=$.prototype={
    constructor:$,
    init:function(selector,context){
        //处理类似$()这种函数
        if(!selector){
            return this;
        }
        //,处理调用时函数体中的$(this)和$(DOMElement)
        /*<!--处理的类型包括：
            1)Node.ELEMENT_NODE(1) *******
            2)Node.ATTRIBUTE_NODE(2)
            3)Node.TEXT_NODE(3)    ******
            4)Node.CDATA_SECTION_NODE(4)
            5)Node.ENTITY_REFERENCE_NODE(5)
            6)Node.ENTITY_NODE(6)
            7)Node.PROCESSING_INSTRUCTION_NODE(7)
            8)Node.COMMENT_NODE(8)
            9)Node.DOCUMENT_NODE(9)
            10)Node.DOCUMENT_TYPE_NODE(10)
            11)Node.DOCUMENT_FRAGMENT_NODE(11)
            12)Node.NOTATION_NODE(12)
            这些节点类型
            -->*/
        if ( selector.nodeType ) {
            this[0] = selector;
            this.length = 1;
            return this;
        }
        var nodes;
        if(!context) {
            if(reid.test(selector)){
                this[0] = doc.getElementById(selector.substring(1));
                this.length=1;
                return this;
            }
            //2,处理选择器为string类型
            nodes = doc.querySelectorAll(selector);
            this.length = nodes.length;
            for (var i = 0; i < this.length; i++) {
                this[i] = nodes[i];
            }
        }else{
            nodes = context.querySelectorAll(selector);
            this.length = nodes.length;
            for (var i = 0; i < this.length; i++) {
                this[i] = nodes[i];
            }
        }
    },
    version:'0.1.1',
    length:0,
    each:function(){


    },
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
    //检查某string是否含有某元素
    hasChar:function(str,char){
        //检查str是否为null等类型
        if(str&&str.indexOf(char)>=0){
            return true;
        }else{
            return false;
        }
    },
    push:push,
    blur:function(handler){
        this.on("blur",handler);
    },
    change:function(handler){
        this.on("change",handler);
    },
    click:function(handler){
        this.on("click",handler);
    },
    dblclick:function(handler){
        this.on("dblclick",handler);
    },
    focus:function(handler){
        this.on("focus",handler);
    },
    keydown:function(handler){
        this.on("keydown",handler);
    },
    keypress:function(handler){
        this.on("keypress",handler);
    },
    keyup:function(handler){
        this.on("keyup",handler);
    },
    load:function(handler){
        this.on("load",handler);
    },
    ready:function(handler){
        this.on("ready",handler);
    },
    resize:function(handler){
        this.on("resize",handler);
    },
    mousedown:function(handler){
        this.on("mousedown",handler);
    },
    mouseenter:function(handler){
        this.on("mouseenter",handler);
    },
    mouseleave:function(handler){
        this.on("mouseleave",handler);
    },
    mousemove:function(handler){
        this.on("mousemove",handler);
    },
    mouseout:function(handler){
        this.on("mouseout",handler);
    },
    mouseover:function(handler){
        this.on("mouseover",handler);
    },
    mouuseup:function(handler){
        this.on("mouseup",handler);
    },
    bind:function(type,handler){
        this.on(type,handler);
    },
    on:function(type,handler){
        if(this[0].addEventListener){
            this[0].addEventListener(type,handler,false);
        }else{
            this[0].attachEvent("on"+type,handler);
        }
    },
    //节点操作
        //添加类元素
    addClass:function(classes){
        this.toggleClass(classes,1);
    },
    removeClass:function(){
        this.toggleClass(classes,2);
    },
    toggleClass:function(classes,param){
        if(![1,2,3].contains(param)){
            param=3;
        }
        //判断是否支持html5的classList属性
        var classList = this[0].classList,
            classArray = classes.split(/\s+/),
            i,
            comprise;
        if(classList){
            //todo 不确定所有浏览器的实现是否一致
            for(i=0;i<classArray.length;i++){
                comprise =  this.contains(classList,classArray[i]);
                switch(param){
                      case 1:
                          if(!comprise)
                              classList.add(classArray[i]);
                          break;
                    case 2:
                          if(comprise)
                              classList.remove(classArray[i]);
                          break;
                    case 3:
                          if(comprise){
                              classList.remove(classArray[i]);
                          }else{
                              classList.add(classArray[i]);
                          }
                }
            }
        }else{
              //ie7,8下测试有效
              classList = this[0].className.split(/\s+/);
              for(i=0;i<classArray.length;i++){
                comprise =  this.contains(classList,classArray[i]);
                  //ie7,8不支持indexOf方法
                 var index = this.indexOf(classList,classArray[i]);
                switch(param){
                    case 1:
                        if(!comprise){
                            classList.push(classArray[i]);
                        };
                        break;
                    case 2:
                        if(comprise)
                            classList.splice(index,1);
                        break;
                    case 3:
                        if(comprise){
                            classList.splice(index,1);
                        }else{
                            classList.push(classArray[i]);
                        }
                }
            }
            this[0].className = classList.join(" ");
        }
    },
    hasClass:function(className){
        var classList = this[0].classList;
        if(!classList){
            classList = this[0].className.split(/\s+/);
        }
        return this.indexOf(classList,className);
    },
    before:function(){

    },
    after:function(){

    },
    wrapper:function(){

    },
    append:function(){

    },
    appendTo:function(){

    },
    insertAfter:function(){

    },
    insertBefore:function(){

    },
    detach:function(){

    },
    empty:function(){

    },
    prepend:function(){

    },
    prependTo:function(){

    },
    remove:function(){

    },
    removeAttr:function(){

    },
    text:function(){

    },
    val:function(param){
        if(!param){
        return this[0].value;
        }else{
            this[0].value=param;
        }
    },

    //动画操作
    show:function(){
    this[0].style.display="block";
    },
    hide:function(){
    this[0].style.display="none";
    },
    toggle:function(){

    },
    slideDown:function(){

    },
    slideUp:function(){

    },
    slideToggle:function(){

    },
    fadeIn:function(){

    },
    fadeOut:function(){

    },
    animate:function(){

    },


    //属性操作
    css:function(){

    },
    hasAttr:function(){

    },
    attr:function(paramA,paramB){
        if(!paramB){
            this[0][paramA] = paramB;
        }else if(this.isJSONLike(paramA)){
            for(var key in paramA){
                this[0][key] = paramA[key];
            }
        }else{
            return this[0][paramA];
        }

    },
    html:function(param){
        if(!param){
        return this[0].innerHTML;
        }else{
        this[0].innerHTML=param;
        }
    },
    /*表单操作*/
    //表单序列化,取自《js高级编程》 v3 p436
    serialize:function(){
       var parts=[],
       field = null,
           i,
           len,
           j,
           optLen,
           option,
           optValue,
           elements=this[0].elements;
        for(i=0,len=elements.length;i<len;i++){
            field = elements[i];
            switch(field.type){
                case "select-one":
                case "select-multiple":

                    if(field.name.length){
                        for(j=0,optLen=field.options.length;j<optLen;j++){
                            option = field.options[j];
                            if(option.selected){
                                optValue= "";
                                if(option.hasAttribute){
                                    optValue = (option.hasAttribute("value")?option.value:option.text);
                                }else{
                                    optValue = (option.attributes["value"].specified?option.value:option.text);
                                }
                                parts.push(encodeURIComponent(field.name)+"="+encodeURIComponent(optValue));
                            }
                        }
                    }
                    break;
                case undefined:
                case "file":
                case "submit":
                case "reset":
                case "button":
                    break;

                case "radio":
                case "checkbox":
                    if(!field.checked){
                        break;
                    }

                default:
                    if(field.name.length){
                        parts.push(encodeURIComponent(field.name)+"="+encodeURIComponent(optValue));
            }
            }
        }
       return parts.join("&");
    },
    //可能要挪到extends中去的东东
    //ajax操作
    ajax:function(){
        var req;
        //ie7+和其它浏览器创建XMLHttpRequest对象
        if(window.XMLHttpRequest){
            req = new XMLHttpRequest();
        }else{//兼容ie6浏览器
            req = new ActiveXObject("Microsoft.XMLHTTP");
        }
        var method = data['method']==undefined?"GET":data['method'].toUpperCase();
        var async = data['async']==undefined?true:data['async'];
        req.open(method,data['url'],async);
        if(typeof data['beforeSend']=="function"){
            data['beforeSend']();
        }
        if(method=="GET"){
            req.send();
        }else if(method=="POST"){
            req.send(data['data']);
        }
        if(typeof data['success']=="function"){
            data['success'](req.responseText);
        }
    },
    //ajax的post方法
    post:function(url,data,callback){
        this.ajax({url:url,data:data,success:callback,async:true,method:'post'})
    },
    //ajax的get方法
    get:function(url,callback){
        this.ajax({url:url,success:callback,async:true,method:'get'})
    },
    <!--ajax的封装结束-->
    //
    contains:function(obj,key){
        if(this.isArrayLike(obj)){
            for(var i=0;i<obj.length;i++){
                if(obj[i]===key){
                    return true;
                }
            }
            return false;
        }else if(obj instanceof Object){



        }
    },
    isArrayLike:function(param){
        //1)判断参数不为空，不为string类型，包含length属性，这样可以过滤掉大部分情况了
        //
        if(param&&!(param instanceof String)&&param.length){
            return true;
        }else{
            return false;
        }
    },
    isJSONLike:function(param){
        return true;
    },
    indexOf:function(array,key){
        if(ArrayProto.indexOf){
            return array.indexOf(key);
        }else{
            for(var i=0;i<array.length;i++){
                if(array[i]===key){
                    return i;
                }
            }
            return -1;
        }
    },
    //冲突处理
    noConflict:function(){

    }
}
//共用同一个原型
$.fn.init.prototype = $.fn;

})();