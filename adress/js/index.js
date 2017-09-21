/*
* @Author: Kuze
* @Date:   2017-08-24 16:39:40
* @Last Modified by:   Kuze
* @Last Modified time: 2017-08-25 14:30:32
*/

$(function(){
	let contacts = [
		{'name':'薛栋少','tel':'15534404594','pinyin':'xuedongshao'},
		{'name':'向晓','tel':'13357458888','pinyin':'xiangxiao'},
		{'name':'冯云封','tel':'15216423341','pinyin':'fengyunfeng'},
		{'name':'冯哲能','tel':'15213553341','pinyin':'fengzheneng'},
		{'name':'张晨路','tel':'18306891973','pinyin':'zhang'},
		{'name':'赵绍','tel':'18334342453','pinyin':'zhao'},
		{'name':'王妃','tel':'18346551231','pinyin':'wang'},
		{'name':'古代','tel':'18212456231','pinyin':'gu'},
		{'name':'杜忻岗','tel':'15582408706','pinyin':'du'},
		{'name':'阮玉玺','tel':'15581770718','pinyin':'ruan'},
		{'name':'李昊颉','tel':'17835423993','pinyin':'li'},
		{'name':'季晨','tel':'13283665052','pinyin':'ji'},
		{'name':'扆杰杰','tel':'13935447245','pinyin':'yi'}
	]
	let dl = document.querySelector('dl');
	let slide = document.querySelector('.slide');
	let input = document.querySelector('input');
	let header = document.querySelector('header');
	let box = document.querySelector('.box');
	let headerH = header.offsetHeight;

	function getData(){
		let data = localStorage.getItem('contacts')?JSON.parse(localStorage.contacts):false;
		if(!data){
			data = localStorage.setItem('contacts',JSON.stringify(contacts));//JSON数组转字符串
			data = JSON.parse(localStorage.contacts);//JSON字符串转成数组
			console.log(data)
		}
		return data;
	}
	let data = getData();
	function render(data){
		let dataObj = {};
		data.forEach(element=>{
			let first = element.pinyin.trim().charAt(0).toUpperCase();
			if(!dataObj[first]){
				dataObj[first] = [];
			}
			dataObj[first].push(element);
		})
		let keys = Object.keys(dataObj).sort();
		keys.forEach(element=>{
			slide.innerHTML += `<li>${element}</li>`;
			let sLi = document.querySelector('.slide>li');
			slide.offsetHeight += sLi.offsetHeight;
			slide.style.marginTop = `${-slide.offsetHeight/2}px`;
			dl.innerHTML +=`<dt>${element}</dt>`;
			dataObj[element].forEach(value=>{
				dl.innerHTML +=`<dd><a href="tel:${value.tel}">${value.name}</a></dd>`;
			})
		})
	}
	render(data);
	input.onkeyup = function(){
		let value = input.value.trim();
		let filter = data.filter(element=>element.name.includes(value) || element.pinyin.includes(value) || element.tel.includes(value))
			slide.innerHTML = '';
			dl.innerHTML = '';
			render(filter);
	}
	let dts = document.querySelectorAll('dt');
	let arr = [];
	dts.forEach(element=>{
		arr.push(element.offsetTop)
	});
	window.onscroll =function(){
		box.style.display = 'block';
		let bsT = document.body.scrollTop;
		dts.forEach((value,index)=>{
			if(bsT+headerH+10 > arr[index]){
			box.innerText = `${value.innerText}`;
		}
		});

	}
})