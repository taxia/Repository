/*
* @Author: Kuze
* @Date:   2017-08-14 11:20:51
* @Last Modified by:   Kuze
* @Last Modified time: 2017-08-16 11:02:39
*/

'use strict';

//获取标签、类名、ID
function $(select, defaults=document) {
		if (typeof select == 'string'){
			let selected = select.trim();
			let firstChar = selected.charAt(0);
			if (firstChar == '#'){
				return defaults.getElementById(selected.substring(1))
			}
			else if (firstChar == '.'){
				return defaults.getElementsByClassName(selected.substring(1))
			}
			else if (/^[a-zA-Z][a-zA-Z1-6]{0,8}$/.test(selected)){
				return defaults.getElementsByTagName(selected)
			}
		}else if (typeof select == 'function'){
			window.onload = function(){
				select();
			}
		}
	}

//获取、修改标签对
function html(element,content){
	if(arguments.length == 1){
		return element.innerHTML;
	}
	if(arguments.length == 2){
		element.innerHTML = content;
	}
}

//获取、修改文本
function text(element,content){
	if(arguments.length == 1){
		return element.innerText;
	}
	if(arguments.length == 2){
		element.innerText = content;
	}
}

//
function on(collection, type, fn){
	for(let i = 0; i<collection.length; i++){
		collection[i][type] = fn;
	}
}

//
function off(collection, type){
	for(let i = 0; i<collection.length; i++){
		collection[i][type] = null;
	}
}

//给元素设置行内样式
function css(element,attrObj){
	for(let i in attrObj){
		element.style[i] = attrObj[i]
	}
}

//随机颜色
function color(){
	let colorArr = [0,1,2,3,4,5,6,7,8,9,'A','B','C','D','F']
	let str = '#';
	for(let i = 0; i < 6;i++){
			let ele = colorArr[Math.floor((Math.random()*colorArr.length))];
			str += ele;
	}	
	return str;
}

//与before相同格式，插入指定元素后
HTMLElement.prototype.insertAfter =function(nNode,pNode){
    let next = pNode.nextElementSibling;
	next?this.insertBefore(nNode,next):this.appendChild(nNode,pNode);
}

//另一种写法，不用输入位置
HTMLElement.prototype.insertAfters = function(insert){
	let parent =  this.parentNode;
    let next = this.nextElementSibling;
    next?parent.insertBefore(insert,next):parent.appendChild(insert);
}

//插入到开头
HTMLElement.prototype.prependChild = function(insert){
    let first = this.firstElementChild;
    first?this.insertBefore(insert,first):this.insertBefore(insert,first)
}

//插入元素到指定位置前
HTMLElement.prototype.beforeTo =function(position){
	let parent =  position.parentNode;
	parent.insertBefore(this,position)
}

//插入元素到指定位置后
HTMLElement.prototype.afterTo =function(position){
	position.insertAfters(this)
}

//指定元素插入到开头,另一种写法
HTMLElement.prototype.prependTo = function(parent){
	parent.prependChild(this);
}

//指定元素插入到结尾，另一种写法
HTMLElement.prototype.appendTo = function(parent){
	parent.appendChild(this);
}