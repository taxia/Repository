/*
* @Author: Kuze
* @Date:   2017-09-06 18:43:59
* @Last Modified by:   Kuze
* @Last Modified time: 2017-09-12 10:59:03
*/

'use strict';

$(function(){
	$('.lis').mouseenter(function(){
		$('div',this).show();
		$(this).css('background','#ff6700');
	}).mouseleave(function(){
		$('div',this).hide();
		$(this).css('background','');
	});
	$('.liss').mouseenter(function(){
		$('div',this).css({height:220,transition:'.2s ease 0.1s'});
	}).mouseleave(function(){
		$('div',this).css({height:''});
	});
	$('.gouwuche').mouseenter(function(){
		$('#kongkong').css('height','100');
	}).mouseleave(function(){
		$('#kongkong').css('height','');
	});
	$('.searchlan').focus(function(){
		$(this).css({'border':'1px solid #ff6700',transition:'.3s'});
		$('.tijiao').css({'border':'1px solid #ff6700',transition:'.3s'});
		$('.searchbox>a').hide();
		$('.searchtanchu').show();
	}).blur(function(){
		$(this).css({'border':''});
		$('.tijiao').css({'border':''});
		$('.searchbox>a').show();
		$('.searchtanchu').hide();
	});

	//lunbo
	let num=0;
	let imgs = $('.anner li');
	let clicks = $('.lunbo li');

	let t = setInterval(function(){fn('forward')},3000);
	$('#banner').mouseenter(function(){
		clearInterval(t);
	}).mouseleave(function(){
		t = setInterval(function(){fn('forward')},3000);
	})
	$(window).blur(function(){
		clearInterval(t);
	}).focus(function(){
		t = setInterval(function(){fn('forward')},3000);
	})
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
		move()
	}
	function move(){
		imgs.hide().eq(num).show();
		clicks.css({'background':''}).eq(num).css({'background':'rgba(255,255,255,0.7)'});
	}
	$('.back').click(function(){fn('back')})
	$('.forward').click(function(){fn('forward')})
	clicks.click(function(){
		let i = $(this).index();
		imgs.hide().eq(i).show();
		clicks.css({'background':''}).eq(i).css({'background':'rgba(255,255,255,0.7)'});
		num = i;
	})

	//danpin
	let danpinqu = $('.danpinqu');
	let Tback = $('.xiangqian');
	let Tforward = $('.xianghou');
	let flag = true;
	for(let i=0;i<danpinqu.length;i++){
		let index = 0;
		let dWidth = danpinqu.eq(i).children('li:first').outerWidth(true)*danpinqu.eq(i).children().length;
		danpinqu.eq(i).width(dWidth);
		let nums = danpinqu.eq(i).children().length/5;

		function fn(dir){
		if(dir == 'xiangqian'){
			if(index == nums-1){
				flag = false;
				return;
			}
			index++;
		}else if(dir == 'xianghou'){
			if(index == 0){
				flag = true;
				return;
			}
			index--;
		}
		move()
	}
		function move(){
			danpinqu.eq(i).css('left', -1240*index);
		}
		Tback.eq(i).hover(function(){$(this).css({'color':'#ff6700'})},function(){$(this).css({'color':''})}).click(function(){fn('xianghou')})
		Tforward.eq(i).hover(function(){$(this).css({'color':'#ff6700'})},function(){$(this).css({'color':''})}).click(function(){fn('xiangqian')});
	}

	//dapei
	let dapeis = $('.zhinengyingjian:gt(0)');
	let choices = dapeis.children('.yingjian').children('span');
	let Dboxs = dapeis.children('.yingjianqu').children('ul');
	for(let i=0;i<Dboxs.length;i++){
		choices.eq(i).mouseenter(function(){
			choices.eq(i).parent().children('span').css({borderBottom:'none',color:'#424242'})
			$(this).css({borderBottom:'2px solid #ff6700',color:'#ff6700'})
			Dboxs.eq(i).parent().children('ul').hide();
			Dboxs.eq(i).show();
		})
	}

	//book
	let Buls = $('.Books ul');
	let Bback = $('.bBack');
	let Bgo = $('.bGo');
	let Blunbo = $('.bBtns');
	for(let i=0;i<Buls.length;i++){
		let indexB = 0;
		let bWidth = Buls.eq(i).children('li:first').outerWidth(true);
		let nums = Buls.eq(i).children().length;
		function fn(dir){
			if(dir == 'go'){
				if(indexB == nums-1){
					flag = false;
					return;
				}
				indexB++;
			}else if(dir == 'back'){
				if(indexB == 0){
					flag = true;
					return;
				}
				indexB--;
			}
			moveb()
		}
		function moveb(){
			Buls.eq(i).css('left', -bWidth*indexB);
			Blunbo.eq(i).children('a[style]').css({'width':'', 'height':'', 'background':'', 'border':''});
			Blunbo.eq(i).children('a').eq(indexB).css({'width':'8', 'height':'8', 'background':'#fff', 'border':'2px solid #ff6700'});
		}
		Bback.eq(i).click(function(){fn('back')})
		Bgo.eq(i).click(function(){fn('go')});
		let nex = Blunbo.eq(i).children('a').length;
		for(let j=0;j<nex;j++){
			Blunbo.eq(i).children('a').eq(j).click(function(){
				Buls.eq(i).css('left', -bWidth*j);
				Blunbo.eq(i).children('a[style]').css({'width':'', 'height':'', 'background':'', 'border':''});
				Blunbo.eq(i).children('a').eq(j).css({'width':'8', 'height':'8', 'background':'#fff', 'border':'2px solid #ff6700'});
				indexB = j;
			})
		}
	}
})
