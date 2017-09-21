/*
* @Author: Kuze
* @Date:   2017-09-11 09:09:59
* @Last Modified by:   Kuze
* @Last Modified time: 2017-09-12 10:51:12
*/

$(function(){
	$('.lis').mouseenter(function(){$(this).children('.xialalan').show()}).mouseleave(function(){$(this).children('.xialalan').hide()});
	$('.lias').mouseenter(function(){$(this).children('.bannertanchu').show()}).mouseleave(function(){$(this).children('.bannertanchu').hide()});
	let t = setInterval(auto, 3000);
	let next = 0;
	let now = 0
	let flag = true;
	let imgs = $('.bannertu li');
	let lunbos = $('.lunbodian');
	$('.banner').mouseenter(function(){
		clearInterval(t)
	}).mouseleave(function(){
		t = setInterval(auto, 3000);
	})
	function auto(){
		next++;
		if (next == imgs.length) {
			next = 0;
		}
		imgs.fadeOut().eq(next).fadeIn();
		lunbos.css({background:''}).eq(next).css({background:'#fff'});
	}
	lunbos.mouseenter(function(){
		let i = $(this).index()
		imgs.fadeOut().eq(i).fadeIn();
		lunbos.css({background:''}).eq(i).css({background:'#fff'});
		next = i;
	})


	let wH = $(window).height();
	let colors = ['#EA5F8D','#0AA6E8','#64C333','#F15453','#19C8A9','#F7A945','#ff0036'];
	let arr = [];
	let floors = $('.floor')
	let xuanfu = $('#xuanfu');
	let fpLift = $('#fpLift');
	let fpLis = $('#fpLift>li[active]');
	let backTop = $('#fpLift>li').last();
	for(let i=0;i<floors.length;i++){
		arr.push(floors.eq(i).position().top)
	}
	$(window).scroll(function(){
		let bSt = document.body.scrollTop
		if(bSt>wH){
			if(flag){
				flag = false;
				xuanfu.css('height','50')
				fpLift.animate({left:2},300)
			}
		}else{
			if(!flag){
				flag = true;
				xuanfu.css('height','')
				fpLift.animate({left:-50},300)
			}
		}
		for(let i=0;i<arr.length;i++){
			if(bSt+100>arr[i]){
				fpLis.css('background',``).eq(i).css('background',`${colors[i]}`);
			}else{
				fpLis.eq(i).css('background',``);
			}
		}
	})
	fpLis.each(function(index,value){
		let i = $(this).index()-1;
		$(this).click(function(){
			$(document.body).animate({scrollTop:arr[i]-50});
		})
	})
	backTop.click(function(){
			$(document.body).animate({scrollTop:'0'});
		})
	let rD = $('.dingwei');
	let rDli = $('.dingwei>li[point]');
	let fD = $('.dingwei>li>.fD');
	rDli.each(function(index,value){
		$(this).mouseenter(function(){
			fD.eq(index).show().animate({right:'35'},300);
		}).mouseleave(function(){
			fD.eq(index).animate({right:'70'},300).fadeOut();
		})

	})

})
