export class Timeline {
	constructor(){
		this.animations = [];
		this.requestId = null;
		this.state = 'inited';
		this.tick = () => {
			let t = Date.now() - this.startTime;
			let animations = this.animations.filter(item => !item.finished);
			let index = 0;
			for(let animation of animations){

				let {object, property, start, end,duration, timingFun, delay, addTime, template} = animation;
				if(t > duration + delay + addTime){
					t = duration + delay + addTime;
					animation.finished = true;
				}
				// let val = timingFun(start,end)(t-delay);
				let progression = timingFun((t- delay - addTime)/duration) // 0 -> 1;
				let val = animation.valueFromProgression(progression);
				object[property] = template(val);
			}
			if(animations.length){
				this.requestId = requestAnimationFrame(this.tick)
			}
		}
	}
	start(){
		if(this.state !== 'inited'){
			return;
		}
		this.state = 'playing';
		this.startTime = Date.now();
		this.tick();
	}
	pause(){
		if(this.state !== 'playing'){
			return;
		}
		this.state = 'paused';
		this.pauseTime = Date.now();
		cancelAnimationFrame(this.requestId);
	}
	resume() {
		if(this.state !== 'paused'){
			return;
		}
		this.state = 'playing';
		this.startTime += Date.now() - this.pauseTime;
		this.tick();
	}
	restart() {
		if(this.state !== 'inited'){
			return;
		}
		// this.animations = [];
		this.state = 'playing';
		this.requestId = null;
		this.startTime = Date.now();
		this.pauseTime = null;
		this.tick();
	}
	add(animation, addTime){
		this.animations.push(animation);
		animation.finished = false;
		if(this.state === 'playing'){
			animation.addTime = addTime || Date.now() - this.startTime;
		} else {
			animation.addTime = addTime || 0;
		}
		
	}
}
export class Animation{
	constructor(object, property, start, end, duration, delay, timingFun, template){
		this.object = object;
		this.property = property;
		this.template = template;
		this.start = start;
		this.end = end;
		this.duration = duration;
		this.delay = delay || 0;
		this.timingFun = timingFun
		// || ((start, end) => {
		// 	return (t) => start + (t / duration) * (end -start)
		// })
	}
	valueFromProgression(progression){
		return this.start + progression * (this.end -this.start);
	}
}

export class ColorAnimation{
	constructor(object, property, start, end, duration, delay, timingFun, template){
		this.object = object;
		this.property = property;
		this.template = template || (v => `rgba(${v.r},${v.g},${v.b},${v.a})`);
		this.start = start;
		this.end = end;
		this.duration = duration;
		this.delay = delay || 0;
		this.timingFun = timingFun
	}
	valueFromProgression(progression){
		return {
			r: this.start.r + progression *  (this.end.r -this.start.r),
			g: this.start.g + progression *  (this.end.g -this.start.g),
			b: this.start.b + progression *  (this.end.b -this.start.g),
			a: this.start.a + progression *  (this.end.a -this.start.a),
		}
	}
}