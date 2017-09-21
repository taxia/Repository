/*
* @Author: Kuze
* @Date:   2017-08-30 18:10:50
* @Last Modified by:   Kuze
* @Last Modified time: 2017-09-21 15:04:40
*/

window.onload = function(){
	let audio = document.querySelector('audio');
	let playBtn = document.querySelector('.play');
	let back = document.querySelector('.back');
	let forward = document.querySelector('.forward');
	let singer = document.querySelector('.singer');
	let song = document.querySelectorAll('.song');
	let times = document.querySelector('.time');
	let photo = document.querySelector('.photo>a>img');
	let progress = document.querySelector('.sp');
	let voiceBox = document.querySelector('.voice');
	let voice = document.querySelector('.vp');
	let vball = document.querySelector('.vball');
	let list = document.querySelector('ul');
	let i = 0;

	playBtn.onclick = function(){
		if(audio.paused){
			audio.play();
		}else{
			audio.pause();
		}
		playBtn.classList.toggle("icon-bofangqi01")
	}
	back.onclick = function(){
		i--;
		if(i  == -1){
			i = database.length-1;
		}
		render(database[i]);
		audio.play();
	}
	forward.onclick = function(){
		i++;
		if(i == database.length){
			i = 0;
		}
		render(database[i]);
		audio.play();
	}
	audio.onended = function(){
		i++;
		if(i == database.length){
			i = 0;
		}
		render(database[i]);
		audio.play();
	}
	function render(data){
		audio.src = data.src;
		song[0].innerText = data.songs;
		song[1].innerText = data.songs;
		singer.innerText = data.name;
		photo.src = data.photo;
		times.innerText = `00:00/${data.alltime}`;
		list.innerHTML = ``;
		for (let i = 0; i < data.lyrics.length; i++){
			list.innerHTML += `<li>${data.lyrics[i].lyric}</li>`;
		}
	}
	render(database[i]);
	function time(t){
		let minute = Math.floor(t/60) < 10?`0${Math.floor(t/60)}`:`${Math.floor(t/60)}`;
		let second = Math.floor(t%60) < 10?`0${Math.floor(t%60)}`:`${Math.floor(t%60)}`;
		return `${minute}:${second}`;
	}
	audio.ontimeupdate = function(){
		let bili = audio.currentTime/audio.duration;
		let nowTime = time(audio.currentTime);
		let allTime = time(audio.duration);
		times.innerText = `${nowTime}/${allTime}`;
		progress.style.width = `${bili*100}%`;
		database[i].lyrics.forEach((element,index)=>{
			if(element.time == nowTime){
				list.innerHTML = ``;
				let a = index;
				if(index < 3){
					index = 0;
				}else{
					index -= 3;
				}
				for(let j = index; j < database[i].lyrics.length;j ++){
					list.innerHTML += `<li class="listLi${j}">${database[i].lyrics[j].lyric}</li>`;
				}
				let obj = document.querySelector(`.listLi${a}`);
				obj.style.color = "orange";
				obj.style.fontSize = "18px";
			}
		})
	}
	vball.onmousedown = function(e){
		let sx = e.clientX;
		let le = vball.offsetLeft;
		let widths = voiceBox.offsetWidth;
		let bw = vball.offsetWidth;
		vball.onmousemove = function(e){
			let ex = e.clientX;
			let lefts = ex-sx + le;
			if(lefts<=0){
				lefts = 0;
			}
			if(lefts>=widths-bw){
				lefts = widths-bw;
			}
			vball.style.left = `${lefts}px`
			voice.style.width = `${lefts+2}px`;
			audio.volume = (lefts/widths);
		}
		vball.onmouseup = function(){
			vball.onmousemove = null;
			vball.onmouseup = null;
		}
	}
}
