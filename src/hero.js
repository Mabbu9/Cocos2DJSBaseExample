
/**
 * The Sprite File Used here is from 
 * http://opengameart.org/content/platformer-animations
 * by Clint Bellanger
**/

var Hero = cc.PhysicsSprite.extend({
	hero_shape:null,
	hero_body:null,
	world_space:null,
	standFrame:null,
	walkFrames:[],
	walkAction:null,
	runningFrames:[],
	runningAction:null,
	direction:1,    ////// direction is 1 for right, -1 for left....
	hero_current_impulse:0.0,
	ctor:function(space) {
		this._super("#h91.png");
		this.world_space = space;
		this.doPhysics()
		
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
	doStand:function() {
		this.stopAllActions();
		this.setSpriteFrame(this.standFrame);
		this.hero_current_impulse = -1 * this.hero_current_impulse;
		this.hero_body.applyImpulse(cp.v(this.hero_current_impulse, 0), cp.v(0, 0));//run speed
		
	},
	doWalk:function(){
		var walkingAnimation = new cc.Animation(this.walkFrames, 0.1);
		var walk = cc.animate(walkingAnimation);
		this.walkAction = walk.repeatForever();
		this.runAction(this.walkAction);
		//apply impulse to the body
		this.hero_body.applyImpulse(cp.v(this.direction*50, 0), cp.v(0, 0));//run speed
	},
	stopWalk:function() {
		this.stopAction(this.walkAction)
		//apply impulse to the body
		this.hero_body.applyImpulse(cp.v(-(this.direction*50), 0), cp.v(0, 0));//run speed
	},
	doRunning:function(){
		var runningAnimation = new cc.Animation(this.runningFrames, 0.1);
		var running = cc.animate(runningAnimation);
		this.runningAction = running.repeatForever();
		this.runAction(this.runningAction);
		//apply impulse to the body
		this.hero_current_impulse = this.direction*150;
		this.hero_body.applyImpulse(cp.v(this.hero_current_impulse, 0), cp.v(0, 0));//run speed
	},
	stopRunning:function() {
		this.hero_isRunning = false;
		this.stopAction(this.runningAction)
		//apply impulse to the body
		this.hero_body.applyImpulse(cp.v(-(this.direction*150), 0), cp.v(0, 0));//run speed
	},
	changeDirection:function(directionInt) {
		if(directionInt >= 0) {
			this.direction = 1;
			if(this.scaleX <0 ){
				this.scaleX = -1 * this.scaleX;
			}
		} else {
			this.direction = -1;
			if(this.scaleX >=0 ){
				this.scaleX = -1 * this.scaleX;
			}
		}
	},
	doPhysics:function() {
		var contentSize = this.getContentSize();
		//init the physic body
		this.hero_body = new cp.Body(1, cp.momentForBox(1, contentSize.width, contentSize.height));
		//set the position
		this.hero_body.p = cc.p(g_runnerStartX, g_groundHeight + contentSize.height / 2);
		//add the created body to space
		this.world_space.addBody(this.hero_body);
		//create the shape for the body
		this.hero_shape = new cp.BoxShape(this.hero_body, contentSize.width - 14, contentSize.height);
		//add shape to space
		this.world_space.addShape(this.hero_shape);
		//set body to the physic sprite
		this.setBody(this.hero_body);
	}
	
});