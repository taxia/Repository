/*
* @Author: Kuze
* @Date:   2017-08-28 22:48:40
* @Last Modified by:   Kuze
* @Last Modified time: 2017-08-30 16:04:39
*/
window.onload = function(){
	let box = document.querySelector('.left');
	let btn = document.querySelectorAll('.left>.tools');
	let btnStyles = document.querySelectorAll('.left>.style');
	let btnColors = document.querySelectorAll('.left input');
	let XP = document.querySelector('.box');
	let pen = document.querySelector('.pen');
	let cut = document.querySelector('.cutting');
	let canvas = document.querySelector('canvas');
	let mask = document.querySelector('.mask');
	let eraser = document.querySelector('.eraser');
	let clipObj = document.querySelector('.clip');
	let save = document.querySelector('#save');
	let inverse = document.querySelector('#inverse');
	let paint = new palette(canvas,mask);

	paint.del();
	btn.forEach(element=>{
		element.onclick = function(){
			let active = document.querySelector('.left>label[active=true]');
			if(active){
				active.setAttribute('active',false);
			}
			this.setAttribute('active',true);
			XP.setAttribute('active',false);
			if(this.id == 'pencil' || this.id == 'dash'){
				paint[this.id]();
			}else if(this.id == 'anger' || this.id == 'side' ){
				paint.polyNum = prompt('请输入角数',5);
				paint.draw(this.id);
			}else{
				paint.draw(this.id);
			}
		}
	})
	btnStyles.forEach(element=>{
		element.onclick = function(){
		let actives = document.querySelector('.left>label[actives=true]');
		if(actives){
			actives.setAttribute('actives',false);
		}
		this.setAttribute('actives',true);
		paint.style = this.id;
		}
	})
	for(let i=0;i<btnColors.length;i++){
		btnColors[i].onchange = function(){
			if(i==1){
				paint.fillStyle = btnColors[i].value;
			}else{
				paint.strokeStyle = btnColors[i].value;
			}
		}
	}
	XP.onclick = function(){
		let active = document.querySelector('.left>label[active=true]');
			if(active){
				active.setAttribute('active',false);
			}
		this.setAttribute('active',true);
		let w=eraser.offsetWidth;
		let h=eraser.offsetHeight;
		paint.shade(eraser,20,20);
	}
	pen.onclick = function(){
		let active = document.querySelector('.left>label[active=true]');
			if(active){
				active.setAttribute('active',false);
			}
		this.setAttribute('active',true);
		paint.text();
	}
	save.onclick = function(){
		save.href = canvas.toDataURL('image/png');
		save.download = 'download.png'
	}
	inverse.onclick = function(){
		paint.inverse(); 
	}
	cut.onclick = function(){
		paint.clip(clipObj);
	}
}