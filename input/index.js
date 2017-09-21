/*
* @Author: Kuze
* @Date:   2017-08-23 09:17:47
* @Last Modified by:   Kuze
* @Last Modified time: 2017-09-21 15:26:36
*/

function Game(){
	this.sheet = [
	['A','img/A.png'],
	['B','img/B.png'],
	['C','img/C.png'],
	['D','img/D.png'],
	['E','img/E.png'],
	['F','img/F.png'],
	['G','img/G.png'],
	['H','img/H.png'],
	['I','img/I.png'],
	['J','img/J.png'],
	['K','img/K.png'],
	['L','img/L.png'],
	['M','img/M.png'],
	['N','img/N.png'],
	['O','img/O.png'],
	['P','img/P.png'],
	['Q','img/Q.png'],
	['R','img/R.png'],
	['S','img/S.png'],
	['T','img/T.png'],
	['U','img/U.png'],
	['V','img/V.png'],
	['W','img/W.png'],
	['X','img/X.png'],
	['Y','img/Y.png'],
	['Z','img/Z.png']];
	this.length = 5;
	this.elements = [];
	this.position = [];
	this.speed = 1;
	this.level = 10;
	this.score = 0;
	this.scoreObj = document.querySelector('div.score>span');
	this.health = 10;
	this.healthObj = document.querySelector('div.health>span');
	this.begin = document.querySelector('div.start');
	this.pasue = document.querySelector('div.pasue');
}
Game.prototype = {
	start:function(){
		let that = this;
		this.begin.onclick = function(){
			that.getChars();
			that.down();
			that.key();
			that.begin.style.display = 'none';
		}
	},
	getChars:function(){
		for (let i = 0; i <this.length; i++) {
			this.getChar();
		}
	},
	getChar:function(){
		let num;
		let div = document.createElement('div');
		let lefts;
		let tops = -Math.random()*100;
		do{
			lefts = Math.random()*(window.innerWidth-200)+100;
		}while(this.checkPosition(lefts));
		do{
			num = Math.floor(Math.random()*this.sheet.length);
		}while(this.checkRepeat(num));
		div.classList.add('box');
		div.style.cssText = `left:${lefts}px; top:${tops}px; background-image: url('${this.sheet[num][1]}')`;
		div.innerText = this.sheet[num][0];
		document.body.appendChild(div);
		this.elements.push(div);
		this.position.push(lefts);
	},
	checkRepeat:function(num){
		return this.elements.some(value => value.innerText == this.sheet[num][0]);
	},
	checkPosition:function(lefts){
		return this.position.some(value => Math.abs(lefts-value)<50);
	},
	down:function(){
		let that = this;
		this.time = setInterval(function(){
			for(let i = 0; i < that.elements.length; i++){
				let tops = that.elements[i].offsetTop;
				that.elements[i].style.top = `${tops+that.speed}px`;
					if(tops >= 500){
						document.body.removeChild(that.elements[i]);
						that.elements.splice(i, 1);
						that.position.splice(i, 1);
						that.getChar();
						that.health--;
						that.healthObj.innerText = that.health;
						if(!that.health){
							that.end();
						}
					}
			}
		}, 20);
	},
	key:function(){
		let that = this;
		document.onkeydown = function(e){
			let char = String.fromCharCode(e.keyCode);
			for(let i = 0; i < that.elements.length; i++){
				if( char == that.elements[i].innerText){
					document.body.removeChild(that.elements[i]);
					that.elements.splice(i, 1);
					that.position.splice(i, 1);
					that.getChar();
					that.score++;
					that.scoreObj.innerText = that.score;
					if(that.score == that.level){
						that.next();
					}
				}
			}
		}
	},
	next:function(){
		clearInterval(this.time);
		for(let i = 0; i < this.elements.length; i++){
			document.body.removeChild(this.elements[i]);
		}
		this.elements = [];
		this.position = [];
		this.length++;
		this.level+=10;
		this.health+=5;
		this.healthObj.innerText = this.health;
		this.begin.style.display = 'block';
		alert('恭喜进入下一关！')
		this.start();
	},
	end:function(){
		clearInterval(this.time);
		if(confirm('是否重新开始？')){
			this.restart();
		}else{
			window.close();
		}
	},
	restart:function(){
		for(let i = 0; i < this.elements.length; i++){
				document.body.removeChild(this.elements[i]);
			}
			this.elements = [];
			this.position = [];
			this.length = 5;
			this.level = 10;
			this.score = 0;
			this.scoreObj.innerText = this.score;
			this.health = 10;
			this.healthObj.innerText = this.health;
			this.begin.style.display = 'block';
			this.start();
	}
}
