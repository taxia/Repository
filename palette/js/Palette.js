/*
* @Author: Kuze
* @Date:   2017-08-28 19:04:22
* @Last Modified by:   Kuze
* @Last Modified time: 2017-09-18 15:24:52
*/

function palette(canvas,mask){
	this.canvas = canvas;
	this.mask = mask;
	this.ctx = this.canvas.getContext('2d');
	this.lineWidth = 5;
	this.polyNum = 5;
	this.fillStyle = '#00ccff';
	this.strokeStyle = '#00ccff';
	this.lineCap = 'butt';
	this.style = 'stroke';
	this.cw = canvas.width;
	this.ch = canvas.height;
	this.history = [];
	this.clipData = null;
}
palette.prototype = {
	draw:function(type){
		this.mask.onmousedown = (e)=>{
			let sx = e.offsetX, sy = e.offsetY;
			e.preventDefault();
			this.init();
			this.mask.onmousemove = (e)=>{
				let ex = e.offsetX, ey = e.offsetY;
				this.ctx.clearRect(0,0,this.cw,this.ch);
				if(this.history.length){
					this.ctx.putImageData(this.history[this.history.length-1],0,0);
				}
				this[type](sx, sy, ex, ey);
			}
			this.mask.onmouseup = ()=>{
				this.history.push(this.ctx.getImageData(0,0,this.cw,this.ch));
				this.mask.onmousemove = null;
				this.mask.onmouseup = null;
			}
		}
	},
	init:function(){
		this.ctx.setLineDash([0,0]);
		this.ctx.fillStyle = this.fillStyle;
		this.ctx.strokeStyle = this.strokeStyle;
	},
	line:function(sx, sy, ex, ey){
		this.ctx.beginPath();
		this.ctx.moveTo(sx, sy);
		this.ctx.lineTo(ex, ey);
		this.ctx.closePath();
		this.ctx[this.style]();
	},
	matrix:function(sx, sy, ex, ey){
		let w = Math.abs(sx-ex);
		let h = Math.abs(sy-ey);
		this.ctx.beginPath();
		this.ctx.moveTo(sx ,sy);
		this.ctx.lineTo(sx, ey);
		this.ctx.lineTo(ex, ey);
		this.ctx.lineTo(ex, sy);
		this.ctx.closePath();
		this.ctx[this.style]();
	},
	circle:function(sx, sy, ex, ey){
		const PI = Math.PI;
		let r = Math.sqrt(Math.pow(ex-sx,2)+Math.pow(ey-sy,2));
		this.ctx.beginPath();
		this.ctx.arc(sx,sy,r,-PI/2,2*PI-PI/2,false);
		this.ctx.closePath();
		this.ctx[this.style]();
	},
	anger:function(sx, sy, ex, ey){
		let r = Math.sqrt(Math.pow(ex-sx,2)+Math.pow(ey-sy,2));
		const PI = Math.PI;
		let anger = 360/this.polyNum/2/180*PI;
		this.ctx.beginPath();
		this.ctx.moveTo(sx+(3*r/7),sy);
		for(let i=1;i<this.polyNum*2;i++){
			if(i%2){
				this.ctx.lineTo(sx+r*Math.cos(anger*i),sy+r*Math.sin(anger*i));
			}else{
				this.ctx.lineTo(sx+(3*r/7)*Math.cos(anger*i),sy+(3*r/7)*Math.sin(anger*i));
			}
		}
		this.ctx.closePath();
		this.ctx[this.style]();
	},
	side:function(sx, sy, ex, ey){
		let r = Math.sqrt(Math.pow(ex-sx,2)+Math.pow(ey-sy,2));
		const PI = Math.PI;
		let anger = 360/this.polyNum/180*PI;
		this.ctx.beginPath();
		this.ctx.moveTo(sx+r,sy);
		for(let i=1;i<this.polyNum;i++){
			this.ctx.lineTo(sx+r*Math.cos(anger*i),sy+r*Math.sin(anger*i));
		}
		this.ctx.closePath();
		this.ctx[this.style]();
	},
	pencil:function(){
		this.mask.onmousedown = (e)=>{
			let sx = e.offsetX, sy = e.offsetY;
			e.preventDefault();
			this.ctx.beginPath();
			this.ctx.moveTo(sx, sy);
			this.mask.onmousemove = (e)=>{
				let ex = e.offsetX, ey = e.offsetY;
				if(this.history.length){
					this.ctx.putImageData(this.history[this.history.length-1],0,0);
				}
				this.ctx.setLineDash([0,0]);
				this.ctx.lineTo(ex, ey);
				this.ctx.stroke();
				this.init();
			}
			this.mask.onmouseup = ()=>{
				this.history.push(this.ctx.getImageData(0,0,this.cw,this.ch));
				this.mask.onmousemove = null;
				this.mask.onmouseup = null;
			}
		}
	},
	dash:function(){
		this.mask.onmousedown = (e)=>{
			let sx = e.offsetX, sy = e.offsetY;
			e.preventDefault();
			this.ctx.beginPath();
			this.ctx.moveTo(sx, sy);
			this.mask.onmousemove = (e)=>{
				let ex = e.offsetX, ey = e.offsetY;
				if(this.history.length){
					this.ctx.putImageData(this.history[this.history.length-1],0,0);
				}
				this.ctx.setLineDash([5,5]);
				this.ctx.lineTo(ex, ey);
				this.ctx.stroke();
				this.init();
			}
			this.mask.onmouseup = ()=>{
				this.history.push(this.ctx.getImageData(0,0,this.cw,this.ch));
				this.mask.onmousemove = null;
				this.mask.onmouseup = null;
			}
		}
	},
	del:function(){
		document.onkeyup = (e)=>{
			if(e.ctrlKey && e.keyCode == 90){
				this.history.pop();
				let img = this.history[this.history.length-1];
				if(!img){
					this.ctx.clearRect(0,0,this.cw,this.ch);
					this.history = [];
					return false;
				}
				this.ctx.putImageData(img,0,0);
			}
		}
	},
	shade:function(obj,w,h){
		this.mask.onmousedown = (e)=>{
			obj.style.display = 'block';
			e.preventDefault();
			this.mask.onmousemove = (e)=>{
				let ox = e.offsetX, oy = e.offsetY;
				let lefts = ox-w/2;
				let tops = oy-h/2;
				if(lefts<=0){
					lefts = 0;
				}
				if(lefts>=this.cw-w){
					lefts = this.cw-w;
				}
				if(tops<=0){
					tops = 0;
				}
				if(tops>=this.ch-h){
					tops = this.ch-h;
				}
				obj.style.left = `${lefts}px`;
				obj.style.top = `${tops}px`;
				this.ctx.clearRect(lefts,tops,w,h);
			}
			this.mask.onmouseup = ()=>{
				this.history.push(this.ctx.getImageData(0,0,this.cw,this.ch));
				obj.style.display = 'none';
				this.mask.onmousemove = null;
				this.mask.onmouseup = null;
			}
		}
	},
	text:function(){
		this.mask.onmousedown = (e)=>{
			let ox = e.offsetX, oy = e.offsetY;
			let lefts=ox, tops=oy;
			let divs = document.createElement('div');
			divs.style.cssText = `
			width:80px; height:30px; border:1px dashed #000;
			position:absolute; left:${ox}px; top:${oy}px;`
			divs.contentEditable = true;
			this.mask.appendChild(divs);
			this.mask.onmousedown = null;
			divs.onblur = ()=>{
				let val = divs.innerText;
				this.mask.removeChild(divs);
				this.ctx.font='bold 20px Consolas';
				this.ctx.textAlign = 'center';
				this.ctx.textBaseLine = 'middle';
				this.ctx.fillText(val,lefts,tops);
				this.history.push(this.ctx.getImageData(0,0,this.cw,this.ch));
			}
			divs.onmousedown = (e)=>{
				let sx = e.clientX, sy = e.clientY;
				let dl = divs.offsetLeft, dt = divs.offsetTop;
				this.mask.onmousemove = (e)=>{
					let ex = e.clientX, ey = e.clientY;
					lefts = `${ex-sx+dl}`;
					tops = `${ey-sy+dt}`;
					divs.style.left = `${lefts}px`;
					divs.style.top = `${tops}px`;
				}
				this.mask.onmouseup = ()=>{
					this.mask.onmousemove = null;
					this.mask.onmouseup = null;
				}
			}
		}
	},
	inverse:function(){
		let imgData = this.ctx.getImageData(0,0,this.cw,this.ch);
		let data = imgData.data;
		for(let i = 0;i<data.length;i+=4){
			data[i] = 255 - data[i];
			data[i+1] = 255 - data[i+1];
			data[i+2] = 255 - data[i+2];
		}
		this.ctx.putImageData(imgData,0,0);
		this.history.push(imgData);
	},
	clip:function(Obj){
		this.mask.onmousedown = (e)=>{
			let sx = e.offsetX, sy = e.offsetY;
			let w,h,minX,minY;
			this.mask.onmousemove = (e)=>{
			let ex = e.offsetX, ey = e.offsetY;
			w = Math.abs(ex-sx), h = Math.abs(ey-sy);
			minX = ex<=sx?ex:sx;
			minY = ey<=sy?ey:sy;
			Obj.style.cssText = `
			display:block; position:absolute; left:${minX}px; top:${minY}px;
			width:${w}px; height:${h}px;`
			}
			this.mask.onmouseup = ()=>{
				this.clipData = this.ctx.getImageData(minX,minY,w,h);
				this.ctx.clearRect(minX,minY,w,h);
				this.history.push(this.ctx.getImageData(0,0,this.cw,this.ch));
				this.ctx.putImageData(this.clipData,minX,minY);
				this.mask.onmousemove = null;
				this.mask.onmouseup = null;
				this.drag(Obj,w,h,minX,minY);
			}
		}
	},
	drag:function(Obj,w,h,minX,minY){
		this.mask.onmousemove = (e)=>{
			let ox = e.offsetX, oy = e.offsetY;
			if(ox>minX&&ox<minX+w&&oy<minY+h&&oy>minY){
				this.mask.style.cursor = 'move';
			}else{
				this.mask.style.cursor = 'default';
			}
		}
		this.mask.onmousedown = (e)=>{
			let sx = e.offsetX, sy = e.offsetY;
			this.mask.onmousemove = (e)=>{
				let cx = e.offsetX, cy = e.offsetY;
				let lefts = minX + (cx-sx);
				let tops = minY + (cy-sy);
				if(lefts<=0){
					lefts = 0;
				}
				if(lefts>=this.cw-w){
					lefts = this.cw-w;
				}
				if(tops<=0){
					tops = 0;
				}
				if(tops>=this.ch-h){
					tops = this.ch-h;
				}
				Obj.style.left = `${lefts}px`;
				Obj.style.top = `${tops}px`;

				this.ctx.clearRect(0,0,this.cw,this.ch);
				if(this.history.length){
					this.ctx.putImageData(this.history[this.history.length-1],0,0);
				}
				if(this.clipData){
					this.ctx.putImageData(this.clipData,lefts,tops);
				}
			}
			this.mask.onmouseup = ()=>{
				this.mask.style.cursor = 'default';
				this.clipData = null;
				Obj.style.display = 'none';
				this.history.push(this.ctx.getImageData(0,0,this.cw,this.ch));
				this.mask.onmousemove = null;
				this.mask.onmouseup = null;
			}
		}
	}
}
