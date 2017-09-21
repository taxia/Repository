/*
* @Author: Kuze
* @Date:   2017-09-11 14:54:22
* @Last Modified by:   Kuze
* @Last Modified time: 2017-09-18 15:20:09
*/
$(function(){
	$('.gouwuche').mouseenter(function(){
		$('.gouwuneirong').show();
	}).mouseleave(function(){
		$('.gouwuneirong').hide();
	})
	$('.lis').mouseenter(function(){
		$(this).children('.xiatan').css({height:'auto',borderTop:'5px solid #B81C22'})
	}).mouseleave(function(){
		$(this).children('.xiatan').css({height:'0',borderTop:'none'})
	})

	let num = 0;
	let imgs = $('.banner').children('li');
	let lunbo = $('.lunbo').children('li');
	function fn(dir){
		if(dir == 'forward'){
			num++;
			if(num == imgs.length){
				num = 0;
			}
		}else if(dir == 'back'){
			num--;
			if(num == -1){
				num = imgs.length-1;
			}
		}
		move();
	}
	function move(){
		imgs.fadeOut().eq(num).fadeIn();
		lunbo.css({background:''}).eq(num).css({background:'#a10000'});
	}
	$('.back').click(function(){fn('back')});
	$('.forward').click(function(){fn('forward')});
	let t = setInterval(function(){fn('forward')},3000);
	$('.bannerqu').hover(function(){
		clearInterval(t);
	},function(){
		t = setInterval(function(){fn('forward')},3000);
	});
	lunbo.click(function(){
		let i = $(this).index();
		console.log(i)
		lunbo.css({background:''});
		$(this).css({background:'#a10000'});
		imgs.fadeOut().eq(i).fadeIn();
		num = i;
	})
})
