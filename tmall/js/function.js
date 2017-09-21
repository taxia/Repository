/*
* @Author: Kuze
* @Date:   2017-08-14 11:20:51
* @Last Modified by:   Kuze
* @Last Modified time: 2017-08-15 08:45:09
*/

'use strict';

function $(select, defaults=document) {
		if (typeof select == 'string') {
			let selected = select.trim();
			let firstChar = selected.charAt(0);
			if(firstChar == '#'){
				return defaults.getElementById(selected.substring(1))
			}
			else if(firstChar == '.'){
				return defaults.getElementsByClassName(selected.substring(1))
			}
			else if(/^[a-zA-Z][a-zA-Z1-6]{0,8}$/.test(selected)){
				return defaults.getElementsByTagName(selected)
			}
		}
		else if(typeof select == 'function'){
			window.onload = function(){
				select();
			}
		}
	}

function html(element,content){
	if(arguments.length == 1){
		return element.innerHTML;
	}
	if(arguments.length == 2){
		element.innerHTML = content;
	}
}

function text(element,content){
	if(arguments.length == 1){
		return element.innerText;
	}
	if(arguments.length == 2){
		element.innerText = content;
	}
}

function css(element,attrObj){
	for(let i in attrObj){
		element.style[i] = attrObj[i]
	}
}

// function on(collection, type, fn){
// 	for(let i = 0; i<collection.length; i++){
// 		collection[i][type] = fn;
// 	}
// }

// function off(collection, type){
// 	for(let i = 0; i<collection.length; i++){
// 		collection[i][type] = null;
// 	}
// }

// function animated(element,attrObj,step,fn){
// 	let a = setInterval(function(){
// 		for(let i in attrObj){
// 			let start = parseInt(getComputedStyle(element,null)[i])
// 			if(start >= attrObj[i]){
// 				clearInterval(a)
// 				if(fn){
// 					fn.apply(element)
// 				}
// 			}
// 			element.style[i] = `${start+step}px`;
// 		}
// 	},1)
// }