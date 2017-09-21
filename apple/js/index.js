/*
* @Author: Kuze
* @Date:   2017-08-27 18:07:50
* @Last Modified by:   Kuze
* @Last Modified time: 2017-09-12 14:08:06
*/
$(function(){
	let imgBox = document.querySelector('.banner>ul');
	let imgs = imgBox.querySelectorAll('li');
	let btnBox = document.querySelector('.banner>div');
	let btns = btnBox.querySelectorAll('button');
	let now = 0, next = 0;
	let width = imgs[0].offsetWidth;

	setInterval(fn,4000);
	function fn(){
		next++
		if(next == imgs.length){
			next = 0;
		}
		imgs[next].style.left = `${width}px`;
		animate(imgs[next],{left:0});
		animate(imgs[now],{left:`${-width}`});
		animate(btns[next],{background:'#f7f7f7'})
		animate(btns[now],{background:''})
		now = next;
	}
	for(let i = 0;i<btns.length;i++){
		btns[i].onclick = function(){
			animate(btns[next],{background:''})
			animate(btns[i],{background:'#f7f7f7'})
			animate(imgs[next],{left:`${-width}`});
			animate(imgs[i],{left:0});
			next = now = i;
		}
	}
})
