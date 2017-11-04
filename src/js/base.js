
var toString = Object.prototype.toString;
var slice = Array.prototype.slice;

var typeMap = {};
var type = exports.type = function(obj){
    var t = toString.call(obj);
    if (typeMap[t]) return typeMap[t];
    return typeMap[t] = t.substring(8, t.length - 1).toLowerCase();
}

var bind = exports.bind = function(fn, scope){
    var _args = slice.call(arguments, 2)
    if(fn.bind) return fn.bind.apply(fn,[scope].concat(_args));
    return function(){
        var args = _args.concat(slice.call(arguments));
        return fn.apply(scope, args);
    }
}

var each = exports.each = function(obj,fn,scope){
    var t = type(obj);
    if(t === 'array' || typeof obj.length === 'number'){
        for (var i = 0; i < obj.length; i++) {
            if(fn.call(scope, obj[i], i, obj) === false) return;
        }
    }else if(t === 'object'){
        for(var i in obj){
            if (obj.hasOwnProperty(i)){
                if(fn.call(scope,obj[i],i,obj)=== false) return;
            }
        }
    }
}

exports.isDom = function(obj){
    return !!(obj && obj.nodeType && obj.appendChild);
}

exports.indexOf = function(list,val){
    if(!list) return -1;
    if(list.indexOf) return list.indexOf(val);
    var index = -1;
    each(list,function(item,i){
        if(val === item){
            index = i;
            return false;
        }
    });
    return index;
}

exports.uniquFactory = function(name){
    var tag = new Date().valueOf() + Math.random().toString().replace('.','');
    var i = 0;
    return function(){
        return name + tag+(i++);
    }
}