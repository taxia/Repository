/*
* @Author: Kuze
* @Date:   2017-08-27 18:07:50
* @Last Modified by:   Kuze
* @Last Modified time: 2017-09-22 00:03:18
*/
$(function(){
	let imgs = $('.banner>ul li');
	let btns = $('.banner>div button');
	let next = 0 , num = 0;
	let width = imgs.eq(0).width();
	let t = setInterval(fn,4000);
	$('.banner').mouseenter(function(){
		clearInterval(t);
	}).mouseleave(function(){
		t = setInterval(fn,4000);
	})
	function fn(){
		next++
		if(next == imgs.length){
			next = 0;
		}
		imgs.fadeOut().eq(next).fadeIn()
		btns.css({background:''}).eq(next).css({background:'#f7f7f7'});
	}
	btns.on('click',function(){
		let i = $(this).index();
		imgs.fadeOut().eq(i).fadeIn()
		btns.css({background:''}).eq(i).css({background:'#f7f7f7'});
		next = i;
	})
})
