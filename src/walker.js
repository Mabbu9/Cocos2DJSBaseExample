
var Walker = cc.Layer.extend({
	winSize:null,
	hero:null,
	space:null,
	ctor:function(){
		this._super();
		this.winSize = cc.director.getWinSize();
		this.initPhysics();
		this.init();
		
	},
	init:function(){
		this._super();
		var sp = new cc.Sprite(res.universe_png);
		sp.x = this.winSize.width/2;
		sp.y = this.winSize.height/2;
		this.addChild(sp, 0, 1);

		this.hero = new Hero(this.space);
		//this.hero.doWalk();
		this.addChild(this.hero, 1, 2);
		
		var infoLabel = cc.LabelTTF("Tap and Hold to Run");
		infoLabel.x = this.winSize.width/2;
		infoLabel.y = this.winSize.height/2;
		this.addChild(infoLabel, 3, 3);
		
		
		if ('mouse' in cc.sys.capabilities)
			cc.eventManager.addListener({
				event: cc.EventListener.MOUSE,
				onMouseUp: function(event){
					event.getCurrentTarget().processEventEnded(event);
				},
				onMouseDown: function(event){
					event.getCurrentTarget().processEventBegan(event);
				}
			}, this);

		if (cc.sys.capabilities.hasOwnProperty('touches')){
			cc.eventManager.addListener({
				event: cc.EventListener.TOUCH_ALL_AT_ONCE,
				onTouchesBegan:function (touches, event) {
					var touch = touches[0];
					event.getCurrentTarget().processEventBegan(touch);
				},
				onTouchesEnded:function (touches, event) {
					var touch = touches[0];
					event.getCurrentTarget().processEventEnded(touch);
				}
			}, this);
		}
		
	},
	processEventBegan:function (event) {
		//this.hero.y = this.winSize.height/2;
		var eventX = event.getLocation().x
		cc.log(eventX + "   "+ this.winSize.width/2);
		if(eventX < this.winSize.width/2) {
			this.hero.changeDirection(-1);
		} else {
			this.hero.changeDirection(1);
		}
		//this.hero.stopWalk();
		this.hero.doRunning();
		
	},
	processEventEnded:function (event) {
		//this.hero.y = this.hero.height*this.hero.scale/2;
		//this.hero.stopRunning();
		this.hero.doStand();
		
		//this.hero.doWalk();
	},
	initPhysics:function() {
		//1. new space object 
		this.space = new cp.Space();
		//2. setup the  Gravity
		this.space.gravity = cp.v(0, -350);

		// 3. set up Walls
		var wallBottom = new cp.SegmentShape(this.space.staticBody,
				cp.v(0, g_groundHeight),// start point
				//cp.v(4294967295, g_groundHeight),// MAX INT:4294967295
				cp.v(this.winSize.width, g_groundHeight),// MAX INT:4294967295
				0);// thickness of wall
		this.space.addStaticShape(wallBottom);
		var wallLeft = new cp.SegmentShape(this.space.staticBody,
				cp.v(0, g_groundHeight),// start point
				cp.v(0, this.winSize.height - g_groundHeight),        // MAX INT:4294967295
				0);// thickness of wall
		this.space.addStaticShape(wallLeft);
		var wallRight = new cp.SegmentShape(this.space.staticBody,
				cp.v(this.winSize.width, g_groundHeight),// start point
				cp.v(this.winSize.width, this.winSize.height - g_groundHeight),       // MAX INT:4294967295
				0);// thickness of wall
		this.space.addStaticShape(wallRight);
	},
	update:function (dt) {
		//cc.log("update in walker called "+dt)
		this.space.step(dt);
	}
});

Walker.scene = function () {
	var scene = new cc.Scene();
	var layer = new Walker();
	layer.scheduleUpdate(); ///THIS IS needed for updating the physics space in the layer...
	scene.addChild(layer);
	return scene;
};