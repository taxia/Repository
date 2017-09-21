/*
* @Author: Kuze
* @Date:   2017-08-10 15:49:04
* @Last Modified by:   Kuze
* @Last Modified time: 2017-09-07 08:32:46
*/

'use strict';

window.onload = function() {

	let banner = $('#banner');
	let gouwuches = $('.gouwuche');
	let kongkong = $('#kongkong');
	let daqu = $('.daqu')[0];
	let lis = $('.lis',daqu);
	let daohangkuai = $('.daohangkuai')[0];
	let liss = $('.liss',daohangkuai);

	let searchlan = $('.searchlan')[0];
	let submit = $('.tijiao')[0];
	let diyikuai = $('.xiaomimix')[0];
	let dierkuai = $('.rengongdianshi')[0];
	let searchtanchu = $('.searchtanchu')[0];

	//banner
	let imgBox = $('.anner')[0];
	let imgs = $('li',imgBox);
	let lunbo = $('.lunbo')[0];
	let lunbodian = $('li',lunbo);
	let back = $('.back',banner)[0];
	let forward = $('.forward',banner)[0];

	let flag = true;
	let num = 0;
	let t;
	let now=0;
	let next=0;


	gouwuches[0].onmouseover = function(){
		kongkong.style.height = '100px';
		gouwuches[0].style.background = '#fff';
	}
	gouwuches[0].onmouseout = function(){
		kongkong.style.height = '0px';
		gouwuches[0].style.background = '#424242';
	}
	kongkong.onmouseover = function(){
		kongkong.style.height = '100px';
		gouwuches[0].style.background = '#fff';
		gouwuches[0].style.color = '#ff6700';
	}
	kongkong.onmouseout = function(){
		kongkong.style.height = '0px';
		gouwuches[0].style.background = '#424242';
		gouwuches[0].style.color = '#b0b0b0';
	}

	for(let i = 0; i < lis.length; i++){
		lis[i].onmouseover = function(){
			let cetanchu = this.getElementsByClassName('cetanchu')[0];
			cetanchu.style.display = 'block';
			this.style.background = '#ff6700';
		}
		lis[i].onmouseout = function(){
			let cetanchu = this.getElementsByClassName('cetanchu')[0];
			cetanchu.style.display = 'none';
			this.style.background = 'rgba(000,000,000,0)';
		}
	}

	for(let i = 0; i < liss.length; i++){
		liss[i].onmouseover = function(){
			let xiatanchu = this.getElementsByClassName('xiatanchu')[0];
			xiatanchu.classList.add('xiabufen');
		}
		liss[i].onmouseout = function(){
			let xiatanchu = this.getElementsByClassName('xiatanchu')[0];
			xiatanchu.classList.remove('xiabufen');
		}
	}

		//搜索栏
		searchlan.onfocus = function(){
			searchlan.classList.add('searchyiru')
			submit.classList.add('searchyiru')
			diyikuai.classList.add('none')
			dierkuai.classList.add('none')
			searchtanchu.classList.add('block')
		}
		searchlan.onblur = function(){
			searchlan.classList.remove('searchyiru')
			submit.classList.remove('searchyiru')
			diyikuai.classList.remove('none')
			dierkuai.classList.remove('none')
			searchtanchu.classList.remove('block')
		}



		//点击轮播点
		for(let i = 0; i < lunbodian.length; i++){
			lunbodian[i].onclick = function(){
				animate(imgs[next],{opacity:0})
				animate(imgs[i],{opacity:1})
				css(lunbodian[now],{'background':''})
				css(lunbodian[i],{'background':'rgba(255,255,255,0.7)'})
				now = next = i;
			}
		}

		//自动轮播
		t = setInterval(auto,4000);

		banner.onmouseover = function(){
			clearInterval(t)
		}
		banner.onmouseout = function(){
			t = setInterval(auto,4000);
		}


		function auto(){
			next++;
			if(next == imgs.length){
				next = 0;
			}
			animate(imgs[now],{opacity:0})
			animate(imgs[next],{opacity:1},function(){flag = true})
			css(lunbodian[now],{'background':''})
			css(lunbodian[next],{'background':'rgba(255,255,255,0.7)'})
			now = next;
		}
		function toau(){
			next--;
			if(next == -1){
				next = imgs.length-1;
			}
			animate(imgs[now],{opacity:0})
			animate(imgs[next],{opacity:1},function(){flag = true})
			css(lunbodian[now],{'background':''})
			css(lunbodian[next],{'background':'rgba(255,255,255,0.7)'})
			now = next;
		}

		//前进后退
		forward.onclick = function(){
			if(flag){
				flag = false;
				auto();
			}
		}
		back.onclick = function(){
			if(flag){
				flag = false;
				toau();
			}
		}



		//为你推荐

		let danpinqu = $('.danpinqu')[0];
		let Tback = document.querySelectorAll('.xiangqian')[0];
		let Tforward = document.querySelectorAll('.xianghou')[0];
		let danpinqu1 = $('.danpinqu')[1];
		let Tback1 = document.querySelectorAll('.xiangqian')[1];
		let Tforward1 = document.querySelectorAll('.xianghou')[1];

		weini(danpinqu,Tback,Tforward);
		weini(danpinqu1,Tback1,Tforward1);

		function weini(danpinqu,back,forward){

			let Dli = danpinqu.childElementCount;
			let DliW = danpinqu.firstElementChild.offsetWidth + parseInt(getComputedStyle(danpinqu.firstElementChild,null).marginRight)
			let num = Dli/5;
			let index = 0;
			let flag = true;
			danpinqu.style.width = `${DliW*Dli}px`
			let Width = danpinqu.style.width
			let lefts = danpinqu.offsetLeft;

			back.onclick = function(){
				if(index == 0){
					back.classList.remove('pointer');
					return;
				}
				index--;
				danpinqu.style.left = `${-1240*index}px`;
				forward.classList.add('pointer');
				back.classList.add('pointer');
			}
			forward.onclick = function(){
				if(index == num-1){
					forward.classList.remove('pointer');
					return;
				}
				index++;
				danpinqu.style.left = `${-1240*index}px`;
				back.classList.add('pointer');
				forward.classList.add('pointer');
			}

			if(index == 0){
				forward.classList.add('pointer');
				back.classList.remove('pointer');
			}

		setInterval(move,6000);
			function move(){
				if(flag){
					if(index == num-1){
						flag = false;
						return;
					}
					index++;
				}else{
					if(index == 0){
						flag = true;
						return;
				}
					index--;
			}
			danpinqu.style.left = `${-1240*index}px`;
		}
	}

		let fBox1 = document.querySelectorAll('div.yingjian')[1];
		let fUls1 = document.querySelectorAll('.yingjianqu')[1];
		let fBox2 = document.querySelectorAll('div.yingjian')[2];
		let fUls2 = document.querySelectorAll('.yingjianqu')[2];
		let fBox3 = document.querySelectorAll('div.yingjian')[3];
		let fUls3 = document.querySelectorAll('.yingjianqu')[3];

		change(fBox1,fUls1)
		change(fBox2,fUls2)
		change(fBox3,fUls3)

		function change(fBox,fUls){
			let fBtns = fBox.querySelectorAll('div.yingjian>span');
			let Uls = fUls.querySelectorAll('.yingjianqu>ul');
			let num = 0;
			for(let i = 0; i<Uls.length; i++){
				fBtns[i].onmouseover = function(){
					Uls[num].style.display = 'none';
					Uls[i].style.display = 'block';
					num = i;
				}
			}
		}

		let hp = $('.HP')[0];
		let Books1 = $('.Books', hp)[0]
		let Books2 = $('.Books', hp)[1]
		let Books3 = $('.Books', hp)[2]
		let Books4 = $('.Books', hp)[3]

		HP(Books1);
		HP(Books2);
		HP(Books3);
		HP(Books4);
		function HP(Book){
			let bUl = $('ul',Book)[0]
			let bLi = $('li',bUl)
			let bLis = bUl.childElementCount;
			let bliW = bUl.firstElementChild.offsetWidth + parseInt(getComputedStyle(bUl.firstElementChild,null).marginRight)
			let bGo = $('.bGo',Book)[0]
			let bBack = $('.bBack',Book)[0]
			let bBtns = $('.bBtns',Book)[0]
			let bBtn = $('a',bBtns);
			let flag = true;
			let num = 0;
			let index = 0;


				bGo.onclick = function(){
					if(num == bLis-1){
						return;
					}
					num++;
					bUl.style.left = `${-bliW*num}px`;
					bBtn[num].style.cssText = `width:8px; height:8px; background:#fff; border:2px solid #ff6700`;
					bBtn[index].style.cssText = '';
					index = num;
				}
				bBack.onclick = function(){
					if(num == 0){
						return;
					}
					num--;
					bUl.style.left = `${-bliW*num}px`;
					bBtn[num].style.cssText = `width:8px; height:8px; background:#fff; border:2px solid #ff6700`;
					bBtn[index].style.cssText = '';
					index = num;
				}

				for(let i = 0; i<bBtn.length; i++){
					bBtn[i].onclick = function(){
						bUl.style.left = `${-bliW*i}px`;
						bBtn[num].style.cssText = ``;
						bBtn[i].style.cssText = `width:8px; height:8px; background:#fff; border:2px solid #ff6700`;
						num = index = i;
					}
				}

	}

}

