/*
* @Author: Kuze
* @Date:   2017-08-22 08:58:34
* @Last Modified by:   Kuze
* @Last Modified time: 2017-09-17 13:54:25
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

	for(let i=0;i<2;i++){
		let token = 0;
		let boxs = $('.box').eq(i);
		let inbox = boxs.children('.inbox');
		let uls = inbox.children('ul');
		let backTo = $('.back').eq(i);
		let goTo = $('.forward').eq(i);
		let nums = uls.children('li').length-4;
		let liW = uls.children('li').eq(0).width();
		uls.width(liW*uls.children('li').length);
		function btns(dir){
			if(dir == 'go'){
				if(token == nums-1){
					return;
				}
				token++;
			}else if(dir == 'back'){
				if(token == 0){
					return;
				}
				token--;
			}
			move();
		}
		function move(){
			uls.animate({left:`${-liW*token}`},function(){flags = true});
		}
		goTo.click(function(){btns('go')});
		backTo.click(function(){btns('back')});
	}
})
