/*
* @Author: Kuze
* @Date:   2017-08-27 16:20:15
* @Last Modified by:   Kuze
* @Last Modified time: 2017-09-17 11:54:56
*/
$(function(){

	let header = $('header');
	let banner = $('.banner');
	let imgs = $('.banner li');
	let words = $('header span');
	let back = $('header button').eq(0);
	let forward = $('button',header).eq(1);
	let width = banner.width();
	let backTop = $('.backTop');
	let now = 0;
	let flag = true;

	let t = setInterval(function(){fn('forward')},4000);
	header.hover(function(){
		clearInterval(t)
	},function(){
		t = setInterval(function(){fn('forward')},4000);
	})
	function fn(dir){
		if(dir == 'forward'){
			if(flag){
				now++;
				if(now == imgs.length){
					now = 0;
				}
			flag = false
			}
		}else if(dir == 'back'){
			if(flag){
				now--;
				if(now == -1){
					now = imgs.length-1;
				}
			flag = false
			}
		}
	auto()
	}
	function auto(){
			imgs.fadeOut(function(){flag = true}).eq(now).fadeIn(function(){flag = true});
			words.fadeOut(function(){flag = true}).eq(now).fadeIn(function(){flag = true});
		}
	back.click(function(){fn('back')})
	forward.click(function(){fn('forward')})

	let wH = $(window).height();
	$(window).scroll(function(){
		let bsT = document.body.scrollTop;
		if(bsT>wH){
			backTop.fadeIn();
		}else{
			backTop.fadeOut();
		}
	})
	backTop.click(function(){
		$(document.body).animate({scrollTop: 0})
	})
})
