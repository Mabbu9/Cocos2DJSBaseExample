
var Slider = cc.Layer.extend({
	_player:null,
	ctor:function(){
		this._super();
		this.init();
	},
	init:function(){
		winSize = cc.director.getWinSize();
		var sp = new cc.Sprite(res.universe_png);
		sp.anchorX = 0;
		sp.anchorY = 0;
		this.addChild(sp, 0, 1);
		
		var newPlayer = new cc.Sprite(res.mb9_png);
		var npWidth = newPlayer.width;
		var npHeight = newPlayer.height;
		var npScale = 0.3
		this._player = newPlayer
		this._player.x = npWidth*npScale/2;
		this._player.y = npHeight*npScale/2;
		this._player.scale = npScale;
			
		this.addChild(this._player, 1, 2);
		
		if ('mouse' in cc.sys.capabilities)
			cc.eventManager.addListener({
				event: cc.EventListener.MOUSE,
				onMouseMove: function(event){
					if(event.getButton() == cc.EventMouse.BUTTON_LEFT)
						event.getCurrentTarget().processEvent(event);
				}
			}, this);

		if (cc.sys.capabilities.hasOwnProperty('touches')){
			cc.eventManager.addListener({
				prevTouchId: -1,
				event: cc.EventListener.TOUCH_ALL_AT_ONCE,
				onTouchesMoved:function (touches, event) {
					var touch = touches[0];
					//cc.log(JSON.stringify(touch));
					if (this.prevTouchId != touch.getID())
						this.prevTouchId = touch.getID();
					else event.getCurrentTarget().processEvent(touches[0]);
				}
			}, this);
		}
	},
	processEvent:function (event) {
		var delta = event.getDelta();
		//cc.log("delta = "+delta);
		var curPos = cc.p(this._player.x, this._player.y)
		curPos = cc.pAdd(curPos, delta);
		curPos = cc.pClamp(curPos, cc.p(0, 0), cc.p(winSize.width, winSize.height));
		this._player.x = curPos.x;
		this._player.y = curPos.y;
		curPos = null;
	}
});

Slider.scene = function () {
	var scene = new cc.Scene();
	var layer = new Slider();
	scene.addChild(layer);
	return scene;
};