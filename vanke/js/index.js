/*
* @Author: Kuze
* @Date:   2017-08-15 22:10:22
* @Last Modified by:   Kuze
* @Last Modified time: 2017-09-18 15:05:04
*/
$(function(){
	let gouwuche = $('.gouwuche')[0];
	let gouwuneirong = $('.gouwuneirong',gouwuche)[0];

	let ul = $('.fenlei')[0];
	let lis = $('.lis');
	let xiatan = $('.xiatan');
	let banner = $('.bannerqu')[0];
	let imgBox = $('.banner')[0];
	let imgs = $('li',imgBox);
	let lunbo = $('.lunbo')[0];
	let lunbodian = $('li',lunbo);
	let back = $('.back',imgBox)[0];
	let forward = $('.forward',imgBox)[0];

	let flag = true;
	let num = 0;
	let t;
	let now=0;
	let next=0;

	gouwuche.onmouseenter = function(){
		gouwuneirong.style.display = 'block'
	}
	gouwuche.onmouseleave = function(){
		gouwuneirong.style.display = 'none'
	}

	for(let i = 0; i<lis.length ;i++){
		lis[i].onmouseenter = function(){
		xiatan[i].style.height = 'auto'
		xiatan[i].style.borderTop = `5px solid #B81C22`;
		}
		lis[i].onmouseleave = function(){
		xiatan[i].style.height = '0'
		xiatan[i].style.borderTop = `none`;
		}
	}
	for(let i = 0; i < lunbodian.length; i++){
			lunbodian[i].onmouseenter = function(){
				css(lunbodian[now],{'background':''})
				css(lunbodian[i],{'background':'#a10000'})
				animate(imgs[next],{opacity:0})
				animate(imgs[i],{opacity:1})
				now = next = i;
			}
		}

	t = setInterval(auto,2000);

		banner.onmouseover = function(){
			clearInterval(t)
		}
		banner.onmouseout = function(){
			t = setInterval(auto,2000);
		}


		function auto(){
			next++;
			if(next == imgs.length){
				next = 0;
			}
			animate(imgs[now],{opacity:0})
			animate(imgs[next],{opacity:1},function(){flag = true})
			css(lunbodian[now],{'background':''})
			css(lunbodian[next],{'background':'#a10000'})
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
			css(lunbodian[next],{'background':'#a10000'})
			now = next;
		}

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
})


