
var Tapper = cc.Layer.extend({
	winSize:null,
	_player:null,
	ctor:function(){
		this._super();
		this.init();
	},
	init:function(){
		winSize = cc.director.getWinSize();
		var sp = new cc.Sprite(res.universe_png);
		sp.x = winSize.width/2;
		sp.y = winSize.height/2;
		this.addChild(sp, 0, 1);

		var newPlayer = new cc.Sprite(res.hero_png);
		//var newPlayer = new Hero();
		var npWidth = newPlayer.width;
		var npHeight = newPlayer.height;
		var npScale = 1.0;
		this._player = newPlayer
		//this._player.x = npWidth*npScale/2;
		this._player.x = winSize.width/2;
		this._player.y = npHeight*npScale/2;
		this._player.scale = npScale;

		this.addChild(this._player, 1, 2);

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
		this._player.y = winSize.height/2;
	},
	processEventEnded:function (event) {
		this._player.y = this._player.height*this._player.scale/2;
	}
});

Tapper.scene = function () {
	var scene = new cc.Scene();
	var layer = new Tapper();
	scene.addChild(layer);
	return scene;
};