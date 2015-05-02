
/**
 * The Sprite File Used here is from 
 * http://opengameart.org/content/platformer-animations
 * by Clint Bellanger
**/

var Hero = cc.Sprite.extend({
	standFrame:null,
	walkFrames:[],
	walkAction:null,
	runningFrames:[],
	runningAction:null,
	ctor:function() {
		this._super("#h91.png");
		//this.x = this.appearPosition.x;
		//this.y = this.appearPosition.y;
		
		//Standing Frame
		this.standFrame = cc.spriteFrameCache.getSpriteFrame("h91.png");
		
		//Walking Frames and Walking Animation
		for (var i = 1; i < 9; i++) {
			var str = "h5" + i + ".png";
			var frame = cc.spriteFrameCache.getSpriteFrame(str);
			this.walkFrames.push(frame);
		}
		
		
		//Running Frames and Running Animation
		for (var i=6;i<9;i++) {
			var str = "h1"+i+".png";
			var frame = cc.spriteFrameCache.getSpriteFrame(str);
			this.runningFrames.push(frame);
		}
		for (var i=1;i<5;i++) {
			var str = "h2"+i+".png";
			var frame = cc.spriteFrameCache.getSpriteFrame(str);
			this.runningFrames.push(frame);
		}
		this.runningFrames.push(cc.spriteFrameCache.getSpriteFrame("h15.png"));
		
	},
	doWalk:function(){
		var walkingAnimation = new cc.Animation(this.walkFrames, 0.1);
		var walk = cc.animate(walkingAnimation);
		this.walkAction = walk.repeatForever();
		this.runAction(this.walkAction);
	},
	stopWalk:function() {
		this.stopAction(this.walkAction)
	},
	doRunning:function(){
		var runningAnimation = new cc.Animation(this.runningFrames, 0.1);
		var running = cc.animate(runningAnimation);
		this.runningAction = running.repeatForever();
		this.runAction(this.runningAction);
	},
	stopRunning:function() {
		this.stopAction(this.runningAction)
	}
	
});