//构造函数，选择器的入口
function $(selector,context){
    //构造函数，选择器的具体实现
    return new $.fn.init(selector,context);//todo为什么要这样做，不这样做有什么坏处？
}

//定义JSlim的原型方法
$.fn=$.prototype={
    init:function(selector,context){
        //1,处理空字符串，null、undefined类型
        if(!selector){
            return this;
        }
        //2,让JSlim对象与元素节点一样拥有ownerDocument属性

    }
}

//共用同一个原型
$.fn.init.prototype = $.fn;

